import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField, List, ListItem,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import styled from '@emotion/styled';
import {
  useCallback, useEffect, useRef, useState,
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import {
  all,
  always,
  applySpec,
  assoc,
  clone,
  curry,
  F,
  filter,
  find,
  head,
  identity,
  ifElse,
  last,
  lt,
  map,
  path,
  pipe,
  prop,
  propEq,
  propOr,
  split,
  tail,
  take,
  trim,
  uniq,
} from 'ramda';

import { deletePartnerById, updatePartnerById } from 'modules/partners';
import {
  deletePartnerById as deletePartnerFromState,
  updateOnePartner as updatePartnerInState,
} from 'modules/store/partners';
import { setGlobalError, setGlobalSuccess } from 'modules/store/alerts';
import { H1, H3 } from 'components/headers';
import Card from 'components/Card';
import ConfirmationDialog from 'components/ConfirmationDialog';
import {
  CancelButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from 'components/buttons';
import colors from 'styles/colors';
import { getBreakpoint } from 'styles/theme';
import useWindowSize from 'modules/useWindowSize';
import useSearch from 'modules/useSearch';

const MONTHS = [
  { name: 'January', number: '01' },
  { name: 'February', number: '02' },
  { name: 'March', number: '03' },
  { name: 'April', number: '04' },
  { name: 'May', number: '05' },
  { name: 'June', number: '06' },
  { name: 'July', number: '07' },
  { name: 'August', number: '08' },
  { name: 'September', number: '09' },
  { name: 'October', number: '10' },
  { name: 'November', number: '11' },
  { name: 'December', number: '12' },
];

const searchOptions = {
  threshold: 0.15,
  includeMatches: true,
  includeScore: true,
  keys: ['aliases'],
};

const getMaxDaysInMonth = (month) => new Date(2020, month, 0).getDate();
const daysInMonth = (month) => {
  const maxDays = getMaxDaysInMonth(month);
  return Array(maxDays).fill(0).map((_, i) => String(i + 1).padStart(2, '0'));
};
const getDayOfBirth = pipe(
  propOr('/', 'birthday'),
  split('/'),
  last,
);
const getMonthOfBirth = pipe(
  propOr('/', 'birthday'),
  split('/'),
  head,
);

const CloseButton = styled(CloseIcon)({
  color: colors.red,
  position: 'absolute',
  top: 5,
  right: 0,
  borderRadius: '50%',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: colors.grayLight,
  },
});

const AddressLine = styled.p({
  margin: 0,
});

const SearchResultsList = styled((props) => (
  <List dense {...props} />
))({
  backgroundColor: colors.white,
  margin: 0,
  padding: '5px 15px',
  border: `1px solid ${colors.grayLight}`,
  boxShadow: '1px 1px 4px 0px rgb(0 0 0 / 50%)',
});

const onPhoneChange = (e) => {
  if (!/[\d]/.test(e.target.value)) {
    e.target.value = '';
    return e;
  }
  const phone = e.target.value
    .replace(/[^\d]/g, '')
    .replace(/(?:1?)/, '')
    .substring(0, 10);
  const convert = (match, p1 = '', p2 = '', p3 = '') => `${p1}${p2 && p2.length ? '-' : ''}${p2}${p3 && p3.length ? '-' : ''}${p3}`;
  e.target.value = phone.replace(
    /([0-9]{1,3})([0-9]{1,3})?([0-9]{1,4}$)?/,
    convert,
  );
  return e;
};

const setPrimaryAlias = curry((index, aliases) => {
  const tempAliases = clone(aliases);
  if (index) {
    const primary = tempAliases.splice(index, 1)[0];
    tempAliases.unshift(primary);
  }
  return tempAliases;
});

const removeEmptyAliases = filter(identity);

const formatAliases = (primaryNameIndex, aliases) => pipe(
  setPrimaryAlias(primaryNameIndex),
  map(trim),
  removeEmptyAliases,
  uniq,
)(aliases);

const formatNamesList = map((name) => <div key={name}>{name}</div>);

const getInitialFormValues = applySpec({
  id: prop('id'),
  email: propOr('', 'email'),
  phone: propOr('', 'phone'),
  preferred_contact_method: propOr('', 'preferred_contact_method'),
  address_line_1: propOr('', 'address_line_1'),
  address_line_2: propOr('', 'address_line_2'),
  city: propOr('', 'city'),
  state: propOr('', 'state'),
  zip_code: propOr('', 'zip_code'),
  spouse: propOr('', 'spouse'),
  spouse_id: prop('spouse_id'),
  aliases: prop('aliases'),
  connected_ministers: propOr([], 'connected_ministers'),
  primaryNameIndex: always(0),
  monthOfBirth: getMonthOfBirth,
  dayOfBirth: getDayOfBirth,
});

const validBirthday = ifElse(
  identity,
  pipe(
    split('/'),
    map(Number),
    all(lt(0)),
  ),
  F,
);

const getPartner = (id, partners) => find(propEq('id', id), partners);
const getPartnerName = pipe(
  getPartner,
  ifElse(
    identity,
    pipe(
      prop('aliases'),
      head,
    ),
    always(null),
  ),
);

const getSpouse = curry((spouseId, partners) => pipe(
  find(propEq('id', spouseId)),
  clone,
)(partners));

export default function PartnerCard({ id, isOpen, close }) {
  const partners = useSelector(path(['partners', 'list']));
  const partner = useCallback(
    find(propEq('id', id), partners),
    [id, partners],
  );

  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isNameAdded, setIsNameAdded] = useState(false);
  const [isMobile, setIsMobile] = useState(true);
  const dispatch = useDispatch();

  const modalRef = useRef();
  const windowSize = useWindowSize();

  const {
    performSearch,
    searchResults,
  } = useSearch({
    indexKeys: searchOptions.keys,
    collection: partners,
    searchOptions,
  });

  useEffect(() => {
    setIsMobile(windowSize.width <= getBreakpoint('sm'));
  }, [windowSize]);

  const handleSubmit = async (values) => {
    setIsUpdating(true);
    const payload = clone(values);
    payload.aliases = formatAliases(payload.primaryNameIndex, payload.aliases);
    if (!validBirthday(payload.birthday)) {
      payload.birthday = null;
    }

    try {
      if (payload.spouse_id !== partner.spouse_id) {
        if (partner.spouse_id) {
          const oldSpouse = pipe(
            getSpouse(partner.spouse_id),
            assoc('spouse_id', null),
          )(partners);
          await updatePartnerById(oldSpouse.id, oldSpouse);
          dispatch(updatePartnerInState(oldSpouse));
        }

        if (payload.spouse_id) {
          const newSpouse = pipe(
            getSpouse(payload.spouse_id),
            assoc('spouse_id', payload.id),
          )(partners);
          await updatePartnerById(newSpouse.id, newSpouse);
          dispatch(updatePartnerInState(newSpouse));
        }
      }
      await updatePartnerById(payload.id, payload);
      dispatch(updatePartnerInState(payload));
      dispatch(setGlobalSuccess('Successfully updated partner!'));
    } catch (err) {
      dispatch(setGlobalError(err.message));
    }
    setIsEditing(false);
    setIsUpdating(false);
  };

  if (!partner) {
    return null;
  }

  return (
    <>
      <Card
        isOpen={isOpen}
        close={() => {
          setIsEditing(false);
          setIsNameAdded(false);
          performSearch('');
          close();
        }}
        innerRef={modalRef}
      >
        {isEditing ? (
          <Formik
            enableReinitialize
            initialValues={getInitialFormValues(partner)}
            onSubmit={handleSubmit}
          >
            {({
              values, handleChange, touched, errors, setFieldValue,
            }) => (
              <Form autoComplete="off">
                <H1 style={{ textAlign: 'center' }}>
                  <FormControl fullWidth>
                    <InputLabel id="primaryNameIndex">Primary Name</InputLabel>
                    <Select
                      id="primaryNameIndex"
                      name="primaryNameIndex"
                      labelId="primaryNameIndex"
                      value={values.primaryNameIndex}
                      onChange={handleChange}
                      error={touched.primaryNameIndex && Boolean(errors.primaryNameIndex)}
                      style={{ fontSize: 28, fontWeight: 'bold', maxWidth: '85vw' }}
                    >
                      {values.aliases.map((alias, index) => (
                        <MenuItem defaultValue={0} key={alias} value={index}>
                          {alias}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </H1>

                <Grid container direction="row" justifyContent="space-between" spacing={isMobile ? 0 : 3}>
                  <Grid item xs={12} sm={6}>
                    <H3>Contact</H3>
                    <Grid container direction="column">
                      <TextField
                        autoFocus
                        id="email"
                        name="email"
                        label="Email"
                        value={values.email}
                        onChange={handleChange}
                        error={touched.email && Boolean(errors.email)}
                      />

                      <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        type="tel"
                        value={values.phone}
                        onChange={(e) => {
                          handleChange(onPhoneChange(e));
                        }}
                        error={touched.phone && Boolean(errors.phone)}
                      />

                      <FormControl>
                        <InputLabel id="preferred_contact_method">Preferred Contact</InputLabel>
                        <Select
                          id="preferred_contact_method"
                          name="preferred_contact_method"
                          labelId="preferred_contact_method"
                          value={values.preferred_contact_method}
                          onChange={handleChange}
                          error={touched.preferred_contact_method
                            && Boolean(errors.preferred_contact_method)}
                        >
                          <MenuItem value="phone">phone</MenuItem>
                          <MenuItem value="text">text</MenuItem>
                          <MenuItem value="email">email</MenuItem>
                        </Select>
                      </FormControl>

                      <div>
                        <H3>Address</H3>
                        <TextField
                          fullWidth
                          id="address_line_1"
                          name="address_line_1"
                          label="Street Address"
                          value={values.address_line_1}
                          onChange={handleChange}
                          error={touched.address_line_1 && Boolean(errors.address_line_1)}
                        />
                        <TextField
                          fullWidth
                          id="address_line_2"
                          name="address_line_2"
                          label="Suite/Apt Number"
                          value={values.address_line_2}
                          onChange={handleChange}
                          error={touched.address_line_2 && Boolean(errors.address_line_2)}
                        />
                        <TextField
                          fullWidth
                          id="city"
                          name="city"
                          label="City"
                          value={values.city}
                          onChange={handleChange}
                          error={touched.city && Boolean(errors.city)}
                        />
                        <Grid container direction="row" justifyContent="space-between">
                          <TextField
                            id="state"
                            name="state"
                            label="State"
                            value={values.state}
                            onChange={handleChange}
                            error={touched.state && Boolean(errors.state)}
                            style={{ width: '45%' }}
                          />
                          <TextField
                            id="zip_code"
                            name="zip_code"
                            label="Zip Code"
                            value={values.zip_code}
                            onChange={handleChange}
                            error={touched.zip_code && Boolean(errors.zip_code)}
                            style={{ width: '45%' }}
                          />
                        </Grid>
                      </div>
                    </Grid>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <H3>Personal</H3>
                    <InputLabel id="monthOfBirthLabel" shrink>
                      Birthday
                    </InputLabel>
                    <Grid container direction="row" justifyContent="space-between">
                      <Select
                        id="monthOfBirth"
                        name="monthOfBirth"
                        labelId="monthOfBirthLabel"
                        value={values.monthOfBirth}
                        displayEmpty
                        onChange={(e) => {
                          handleChange(e);
                          const month = e.target.value;
                          const day = getDayOfBirth(values);
                          setFieldValue('birthday', `${month}/${day}`);
                        }}
                        error={touched.monthOfBirth && Boolean(errors.monthOfBirth)}
                        style={{ width: '45%' }}
                      >
                        <MenuItem value="">Month</MenuItem>
                        {MONTHS.map((month) => (
                          <MenuItem key={month.number} value={month.number}>
                            {month.name}
                          </MenuItem>
                        ))}
                      </Select>
                      <Select
                        id="dayOfBirth"
                        name="dayOfBirth"
                        value={values.dayOfBirth}
                        displayEmpty
                        onChange={(e) => {
                          handleChange(e);
                          const day = e.target.value;
                          const month = getMonthOfBirth(values);
                          setFieldValue('birthday', `${month}/${day}`);
                        }}
                        error={touched.dayOfBirth && Boolean(errors.dayOfBirth)}
                        style={{ width: '45%' }}
                      >
                        <MenuItem value="">Day</MenuItem>
                        {daysInMonth(Number(values.monthOfBirth)).map((day) => (
                          <MenuItem defaultValue="01" key={day} value={day}>{day}</MenuItem>
                        ))}
                      </Select>
                    </Grid>

                    <div style={{ position: 'relative' }}>
                      <TextField
                        fullWidth
                        id="spouse"
                        name="spouse"
                        label="Spouse"
                        value={values.spouse_id
                          ? getPartnerName(values.spouse_id, partners)
                          : values.spouseQuery}
                        onChange={(e) => {
                          handleChange(e);
                          const query = e.target.value;
                          performSearch(query);
                          if (query === '') {
                            setFieldValue('spouse_id', null);
                          }
                          setFieldValue('spouseQuery', query);
                        }}
                        disabled={Boolean(values.spouse_id)}
                        error={touched.spouse && Boolean(errors.spouse)}
                      />
                      {values.spouse_id && (
                        <CloseButton
                          onClick={() => {
                            setFieldValue('spouse_id', null);
                            setFieldValue('spouseQuery', '');
                          }}
                          style={{ top: 20 }}
                        />
                      )}
                      <div style={{ position: 'fixed', width: 'initial', zIndex: 100 }}>
                        {searchResults.length > 0 && (
                          <SearchResultsList>
                            {take(10, searchResults).map((r) => (
                              <ListItem
                                button
                                key={r.item.id}
                                onClick={() => {
                                  setFieldValue('spouse_id', r.item.id);
                                  performSearch('');
                                  setFieldValue('spouseQuery', '');
                                }}
                              >
                                {r.item.aliases[0]}
                              </ListItem>
                            ))}
                          </SearchResultsList>
                        )}
                      </div>
                    </div>

                    <FieldArray
                      name="aliases"
                      render={(arrayHelpers) => (
                        <>
                          <H3>Add/Remove Names</H3>
                          {values.aliases.map((alias, index) => (
                            <div key={alias} style={{ position: 'relative' }}>
                              <TextField
                                fullWidth
                                name={`aliases.${index}`}
                                value={values.aliases[index]}
                                onChange={handleChange}
                                autoFocus={isNameAdded && index === values.aliases.length - 1}
                              />
                              {values.aliases.length > 1
                                && (
                                  <CloseButton
                                    onClick={() => {
                                      if (index === values.aliases.length - 1) {
                                        setFieldValue('primaryNameIndex', 0);
                                      }
                                      arrayHelpers.remove(index);
                                    }}
                                  />
                                )}
                            </div>
                          ))}
                          <Button
                            color="primary"
                            size="small"
                            style={{ marginTop: 5 }}
                            onClick={() => {
                              arrayHelpers.push('');
                              setIsNameAdded(true);
                            }}
                          >
                            Add a name
                          </Button>
                        </>
                      )}
                    />

                    {/* <H3>Connected Ministers</H3>
                    {formatNamesList(partner.connected_ministers) || 'n/a'} */}
                  </Grid>
                </Grid>
                <Grid container direction="row" justifyContent="space-evenly" spacing={5} style={{ marginTop: 15 }}>
                  <Grid item>
                    <CancelButton onClick={() => setIsEditing(false)} />
                  </Grid>
                  <Grid item>
                    <SaveButton type="submit" loading={isUpdating} />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <H1 style={{ textAlign: 'center' }}>{partner.aliases[0]}</H1>
            <Grid container direction="row" justifyContent="space-between" spacing={isMobile ? 0 : 6}>
              <Grid item xs={12} sm={6}>
                <H3>Email</H3>
                {partner.email || 'n/a'}

                <H3>Phone</H3>
                {partner.phone || 'n/a'}

                <H3>Preferred Contact</H3>
                {partner.preferred_contact_method || 'n/a'}

                <H3>Address</H3>
                {partner.address_line_1 ? (
                  <>
                    <AddressLine>{partner.address_line_1}</AddressLine>
                    {partner.address_line_2 && <AddressLine>{partner.address_line_2}</AddressLine>}
                    <AddressLine>
                      {`${partner.city}, ${partner.state} ${partner.zip_code}`}
                    </AddressLine>
                  </>
                ) : 'n/a'}
              </Grid>

              <Grid item xs={12} sm={6}>
                <H3>Birthday</H3>
                {partner.birthday || 'n/a'}

                <H3>Spouse</H3>
                {partner.spouse_id ? getPartnerName(partner.spouse_id, partners) : 'n/a'}

                {partner.aliases.length > 1 && (
                  <>
                    <H3>Also Known As</H3>
                    {formatNamesList(tail(partner.aliases))}
                  </>
                )}

                <H3>Connected Ministers</H3>
                {partner.connected_ministers.length > 1
                  ? formatNamesList(partner.connected_ministers)
                  : 'n/a'}
              </Grid>
            </Grid>
            <Grid container direction="row" justifyContent="space-evenly" spacing={5} style={{ marginTop: 15 }}>
              <Grid item>
                <EditButton
                  onClick={() => {
                    setIsEditing(true);
                    setIsNameAdded(false);
                    modalRef.current.scrollTo({
                      top: 0,
                      behavior: 'smooth',
                    });
                  }}
                />
              </Grid>
              <Grid item>
                <DeleteButton
                  onClick={() => setIsDeleteConfirmationOpen(true)}
                  loading={isDeleting}
                />
                <ConfirmationDialog
                  title="Are you sure?"
                  open={isDeleteConfirmationOpen}
                  handleClose={() => setIsDeleteConfirmationOpen(false)}
                  handleConfirm={async () => {
                    setIsDeleting(true);
                    try {
                      await deletePartnerById(partner.id);
                      dispatch(setGlobalSuccess('Successfully deleted partner!'));
                      dispatch(deletePartnerFromState(partner.id));
                      close();
                    } catch (err) {
                      dispatch(setGlobalError(err.message));
                    }
                    setIsDeleting(false);
                  }}
                >
                  Clicking confirm will delete {head(partner.aliases)}.
                </ConfirmationDialog>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
    </>
  );
}

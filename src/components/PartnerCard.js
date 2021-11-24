import {
  Button, FormControl, Grid, InputLabel, MenuItem, Select, TextField,
} from '@material-ui/core';
import { Close as CloseIcon } from '@material-ui/icons';
import styled from '@emotion/styled';
import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, FieldArray } from 'formik';
import {
  clone, curry, filter, find, head, identity, last, map, path, pipe, propEq, tail, trim, uniq,
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

const GridItem = styled((props) => <Grid item {...props} />)({
  minWidth: 250,
});

const AddressLine = styled.p({
  margin: 0,
});

const onBirthdateChange = (e) => {
  if (!/[\d]/.test(e.target.value)) {
    e.target.value = '';
    return e;
  }
  const birthdate = e.target.value
    .replace(/[\D+]/g, '')
    .substring(0, 4);
  const convert = (match, month = '', day = '') => {
    if (Number(month[0]) > 1) {
      return `0${month}/`;
    }
    if (Number(month) > 12 || month.length === 1) {
      return month[0];
    }
    const maxDaysInMonth = new Date(2020, month, 0).getDate();
    const maxDaysInMonthFirstDigit = Number(String(maxDaysInMonth)[0]);
    if (Number(day[0]) > maxDaysInMonthFirstDigit) {
      return `${month}/0${day}`;
    }
    if (Number(day) > maxDaysInMonth || day.length === 1) {
      return `${month}/${day[0]}`;
    }
    return `${month}/${day}`;
  };
  e.target.value = birthdate.replace(
    /([0-9]{1,2})([0-9]{1,2})?/,
    convert,
  );
  return e;
};

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

export default function PartnerCard({ id, isOpen, close }) {
  const [isEditing, setIsEditing] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false);
  const [isNameAdded, setIsNameAdded] = useState(false);
  const dispatch = useDispatch();

  const modalRef = useRef();

  const partner = useSelector(pipe(
    path(['partners', 'list']),
    find(propEq('id', id)),
  ));

  const handleSubmit = async (values) => {
    setIsUpdating(true);
    const payload = clone(values);
    payload.aliases = formatAliases(payload.primaryNameIndex, payload.aliases);
    delete payload.primaryNameIndex;
    try {
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
          close();
        }}
        innerRef={modalRef}
      >
        {isEditing ? (
          <Formik
            initialValues={{
              ...partner,
              primaryNameIndex: 0,
            }}
            onSubmit={handleSubmit}
          >
            {({
              values, handleChange, touched, errors, setFieldValue,
            }) => (
              <Form>
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
                      helperText={touched.primaryNameIndex && errors.primaryNameIndex}
                      style={{ fontSize: 30, fontWeight: 'bold' }}
                    >
                      {values.aliases.map((alias, index) => (
                        <MenuItem key={alias} value={index}>
                          {alias}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </H1>

                <Grid container direction="row" spacing={10}>
                  <GridItem xs="auto" sm={6}>
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
                        helperText={touched.email && errors.email}
                      />

                      <TextField
                        id="phone"
                        name="phone"
                        label="Phone"
                        value={values.phone}
                        onChange={(e) => {
                          handleChange(onPhoneChange(e));
                        }}
                        error={touched.phone && Boolean(errors.phone)}
                        helperText={touched.phone && errors.phone}
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
                          helperText={touched.preferred_contact_method
                            && errors.preferred_contact_method}
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
                          helperText={touched.address_line_1 && errors.address_line_1}
                        />
                        <TextField
                          fullWidth
                          id="address_line_2"
                          name="address_line_2"
                          label="Suite/Apt Number"
                          value={values.address_line_2}
                          onChange={handleChange}
                          error={touched.address_line_2 && Boolean(errors.address_line_2)}
                          helperText={touched.address_line_2 && errors.address_line_2}
                        />
                        <TextField
                          fullWidth
                          id="city"
                          name="city"
                          label="City"
                          value={values.city}
                          onChange={handleChange}
                          error={touched.city && Boolean(errors.city)}
                          helperText={touched.city && errors.city}
                        />
                        <Grid container direction="row" justifyContent="space-between">
                          <TextField
                            id="state"
                            name="state"
                            label="State"
                            value={values.state}
                            onChange={handleChange}
                            error={touched.state && Boolean(errors.state)}
                            helperText={touched.state && errors.state}
                            style={{ width: '45%' }}
                          />
                          <TextField
                            id="zip_code"
                            name="zip_code"
                            label="Zip Code"
                            value={values.zip_code}
                            onChange={handleChange}
                            error={touched.zip_code && Boolean(errors.zip_code)}
                            helperText={touched.zip_code && errors.zip_code}
                            style={{ width: '45%' }}
                          />
                        </Grid>
                      </div>
                    </Grid>
                  </GridItem>

                  <GridItem xs="auto" sm={6}>
                    <H3>Personal</H3>
                    <TextField
                      fullWidth
                      id="birthday"
                      name="birthday"
                      label="Birthday (mm/dd)"
                      value={values.birthday}
                      onKeyDown={(e) => {
                        if (e.key === 'Backspace' && last(values.birthday) === '/') {
                          setFieldValue('birthday', values.birthday.slice(0, 2));
                        }
                      }}
                      onChange={(e) => {
                        handleChange(onBirthdateChange(e));
                      }}
                      error={touched.birthday && Boolean(errors.birthday)}
                      helperText={touched.birthday && errors.birthday}
                    />

                    <TextField
                      fullWidth
                      id="spouse"
                      name="spouse"
                      label="Spouse"
                      value={values.spouse}
                      onChange={handleChange}
                      error={touched.spouse && Boolean(errors.spouse)}
                      helperText={touched.spouse && errors.spouse}
                    />

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
                  </GridItem>
                </Grid>
                <Grid container direction="row" justifyContent="space-evenly" spacing={5}>
                  <Grid item>
                    <SaveButton type="submit" loading={isUpdating} />
                  </Grid>
                  <Grid item>
                    <CancelButton onClick={() => setIsEditing(false)} />
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        ) : (
          <>
            <H1 style={{ textAlign: 'center' }}>{partner.aliases[0]}</H1>
            <Grid container direction="row" spacing={10}>
              <GridItem xs={6}>
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
              </GridItem>

              <GridItem xs={6}>
                <H3>Birthday</H3>
                {partner.birthday || 'n/a'}

                <H3>Spouse</H3>
                {partner.spouse || 'n/a'}

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
              </GridItem>
            </Grid>
            <Grid container direction="row" justifyContent="space-evenly" spacing={5}>
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

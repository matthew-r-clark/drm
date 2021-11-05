import { Button, Grid } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  Formik, Form, Field as FormikField, FieldArray,
} from 'formik';
import {
  clone,
  find, map, path, pipe, propEq, tail,
} from 'ramda';

import { deletePartnerById, updatePartnerById } from 'modules/partners';
import {
  deletePartnerById as deletePartnerFromState,
  updateOnePartner as updatePartnerInState,
} from 'modules/store/partners';
import { H1, H3 } from 'components/headers';
import Card from 'components/Card';
import {
  CancelButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from 'components/buttons';
import colors from 'styles/colors';

const CloseButton = styled(CloseIcon)({
  color: colors.red,
  '&:hover': {
    cursor: 'pointer',
  },
});

const Field = styled(FormikField)({
  border: 'none',
  borderRadius: 5,
  backgroundColor: colors.grayLight,
  fontSize: 16,
  paddingLeft: 5,
  paddingRight: 5,
  marginBottom: 2,
  display: 'block',
  // width: '100%',
});

const GridItem = styled((props) => <Grid item {...props} />)({
  minWidth: 250,
});

const AddressLine = styled.p({
  margin: 0,
});

const setPrimaryAlias = (aliases, index) => {
  const tempAliases = clone(aliases);
  if (index) {
    const primary = tempAliases.splice(index, 1)[0];
    tempAliases.unshift(primary);
  }
  return tempAliases;
};

const formatNamesList = map((name) => <>{name}<br /></>);

export default function PartnerCard({ id, isOpen, close }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const partner = useSelector(pipe(
    path(['partners', 'list']),
    find(propEq('id', id)),
  ));

  const handleSubmit = (values) => {
    setIsEditing(false);
    const payload = clone(values);
    payload.aliases = setPrimaryAlias(payload.aliases, payload.primaryName);
    delete payload.primaryName;
    updatePartnerById(payload.id, payload);
    dispatch(updatePartnerInState(payload));
  };

  if (!partner) {
    return null;
  }

  return (
    <Card
      isOpen={isOpen}
      close={() => {
        setIsEditing(false);
        close();
      }}
    >
      <H1 style={{ textAlign: 'center' }}>{partner.aliases[0]}</H1>
      {isEditing ? (
        <Formik
          initialValues={{
            ...partner,
            primaryName: 0,
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <Grid container direction="row" spacing={10}>
                <GridItem xs={6}>
                  <H3>Email</H3>
                  <Field type="text" name="email" />

                  <H3>Phone</H3>
                  <Field type="phone" name="phone" />

                  <H3>Preferred Contact</H3>
                  <Field as="select" name="preferred_contact_method">
                    <option value="phone">phone</option>
                    <option value="text">text</option>
                    <option value="email">email</option>
                  </Field>

                  <H3>Address</H3>
                  <Field type="text" name="address_line_1" placeholder="Street Address" />
                  <Field type="text" name="address_line_2" placeholder="Suite/Apt Number" />
                  <Field type="text" name="city" placeholder="city" />
                  <Field type="text" name="state" placeholder="state" />
                  <Field type="text" name="zip_code" placeholder="zip_code" />
                </GridItem>

                <GridItem xs={6}>
                  <H3>Birthday</H3>
                  <Field type="text" name="birthday" />

                  <H3>Spouse</H3>
                  {partner.spouse || 'n/a'}

                  <H3>Add/Remove Names</H3>
                  <FieldArray
                    name="aliases"
                    render={(arrayHelpers) => (
                      <>
                        {values.aliases.map((alias, index) => (
                          <Grid container direction="row">
                            <Field name={`aliases.${index}`} style={{ width: '85%' }} />
                            <CloseButton onClick={() => arrayHelpers.remove(index)} />
                          </Grid>
                        ))}
                        <Grid container direction="row">
                          <Button
                            type="button"
                            onClick={() => arrayHelpers.push('')}
                          >
                            Add
                          </Button>
                        </Grid>
                      </>
                    )}
                  />

                  <H3>Primary Name</H3>
                  <Field
                    as="select"
                    name="primaryName"
                  >
                    {values.aliases.map((alias, index) => (
                      <option key={alias} value={index}>
                        {alias}
                      </option>
                    ))}
                  </Field>

                  {/* <H3>Connected Ministers</H3>
                  {formatNamesList(partner.connected_ministers) || 'n/a'} */}
                </GridItem>
              </Grid>
              <Grid container direction="row" justify="space-evenly" spacing={5}>
                <Grid item>
                  <SaveButton type="submit" />
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

              <H3>Also Known As</H3>
              {partner.aliases.length > 1
                ? formatNamesList(tail(partner.aliases))
                : 'n/a'}

              <H3>Connected Ministers</H3>
              {formatNamesList(partner.connected_ministers) || 'n/a'}
            </GridItem>
          </Grid>
          <Grid container direction="row" justify="space-evenly" spacing={5}>
            <Grid item>
              <EditButton onClick={() => setIsEditing(true)} />
            </Grid>
            <Grid item>
              <DeleteButton
                onClick={() => {
                  deletePartnerById(partner.id);
                  dispatch(deletePartnerFromState(partner.id));
                  close();
                }}
              />
            </Grid>
          </Grid>
        </>
      )}
    </Card>
  );
}

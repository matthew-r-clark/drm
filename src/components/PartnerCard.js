import { Button, Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Formik, Form, Field as FormikField } from 'formik';
import {
  find, map, path, pipe, propEq, tail,
} from 'ramda';

import { deletePartnerById } from 'modules/partners';
import { deletePartner as deletePartnerFromState } from 'modules/store/partners';
import { H1, H3 } from 'components/headers';
import Card from 'components/Card';
import {
  CancelButton,
  DeleteButton,
  EditButton,
  SaveButton,
} from 'components/buttons';
import colors from 'styles/colors';

const Field = styled(FormikField)({
  border: 'none',
  borderRadius: 5,
  backgroundColor: colors.grayLight,
  fontSize: 16,
  paddingLeft: 5,
  paddingRight: 5,
  marginBottom: 2,
  display: 'block',
  width: '100%',
});

const GridItem = styled((props) => <Grid item {...props} />)({
  minWidth: 250,
});

const AddressLine = styled.p({
  margin: 0,
});

const formatNamesList = map((name) => <>{name}<br /></>);

export default function PartnerCard({ id, isOpen, close }) {
  const [isEditing, setIsEditing] = useState(false);
  const dispatch = useDispatch();
  const partner = useSelector(pipe(
    path(['partners', 'list']),
    find(propEq('id', id)),
  ));

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
          initialValues={partner}
        >
          {() => (
            <Form>
              <Grid container direction="row" spacing={10}>
                <GridItem xs={6}>
                  <H3>Email</H3>
                  <Field type="text" name="email" />

                  <H3>Phone</H3>
                  <Field type="phone" name="phone" />

                  <H3>Preferred Contact</H3>
                  <Field type="text" name="preferred_contact_method" />

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
                  {partner.aliases.map((alias, index) => (
                    <Field key={alias} name={`aliases.${index}`} />
                  ))}
                  <Button>Add</Button>

                  <H3>Primary Name</H3>
                  {/* select primary name from list */}

                  <H3>Connected Ministers</H3>
                  {formatNamesList(partner.connected_ministers) || 'n/a'}
                </GridItem>
              </Grid>
            </Form>
          )}
        </Formik>
      ) : (
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
      )}

      <Grid container direction="row" justify="space-evenly" spacing={5}>
        {isEditing ? (
          <>
            <Grid item>
              <SaveButton onClick={() => setIsEditing(false)} />
            </Grid>
            <Grid item>
              <CancelButton onClick={() => setIsEditing(false)} />
            </Grid>
          </>
        ) : (
          <>
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
          </>
        )}
      </Grid>
    </Card>
  );
}

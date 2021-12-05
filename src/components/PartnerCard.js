import { Grid } from '@material-ui/core';
import styled from '@emotion/styled';
import { useSelector } from 'react-redux';
import {
  find, map, path, pipe, propEq, tail,
} from 'ramda';

import { H1, H3 } from 'components/headers';
import Card from 'components/Card';

const GridItem = styled((props) => <Grid item {...props} />)({
  minWidth: 250,
});

const AddressLine = styled.p({
  margin: 0,
});

const formatNamesList = map((name) => <>{name}<br /></>);

export default function PartnerCard({ id, isOpen, close }) {
  const partner = useSelector(pipe(
    path(['partners', 'list']),
    find(propEq('id', id)),
  ));

  return (
    <Card
      isOpen={isOpen}
      close={close}
    >
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

          <H3>Also Known As</H3>
          {partner.aliases.length > 1
            ? formatNamesList(tail(partner.aliases))
            : 'n/a'}

          <H3>Connected Ministers</H3>
          {formatNamesList(partner.connected_ministers) || 'n/a'}
        </GridItem>
      </Grid>
    </Card>
  );
}

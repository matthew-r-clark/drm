import {
  always, concat, find, ifElse, join, length, lt, path, pipe, prop, propEq, tail,
} from 'ramda';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';
import styled from '@emotion/styled';

import { LineSeparatedList } from 'components/elements';
import Search from 'components/Search';
import Card from 'components/Card';

const searchOptions = {
  threshold: 0.5,
  includeMatches: true,
  keys: ['aliases'],
};

const TIMEOUT_DELAY = 500;

const GridHeaders = () => (
  <Grid container direction="row" justifyContent="space-evenly" alignItems="center" style={{ fontWeight: 'bold' }}>
    <Grid item xs={4} style={{ paddingLeft: 10 }}>Name</Grid>
    <Grid item xs={4}>Email</Grid>
    <Grid item xs={4}>Ministers</Grid>
  </Grid>
);

const generateAkaString = pipe(
  prop('aliases'),
  ifElse(
    pipe(
      length,
      lt(1),
    ),
    pipe(
      tail,
      join(', '),
      concat('aka: '),
    ),
    always(''),
  ),
);

const GridItem = (props) => <Grid item {...props} />;

const AddressLine = styled.p({
  margin: 0,
});

const FullPartner = ({ id }) => {
  const partner = useSelector(pipe(
    path(['partners', 'list']),
    find(propEq('id', id)),
  ));

  return (
    <>
      <h1 style={{ textAlign: 'center' }}>{partner.aliases[0]}</h1>
      <Grid container direction="row" spacing={3}>
        <GridItem xs={6}>
          <h3>Other Names</h3>
          {tail(partner.aliases).join(', ') || 'n/a'}
        </GridItem>

        <GridItem xs={6}>
          <h3>Connected Ministers</h3>
          {tail(partner.connected_ministers).join(', ') || 'n/a'}
        </GridItem>

        <GridItem xs={3}>
          <h3>Preferred Contact Method</h3>
          {partner.preferred_contact_method || 'n/a'}
        </GridItem>

        <GridItem xs={3}>
          <h3>Email</h3>
          {partner.email || 'n/a'}
        </GridItem>

        <GridItem xs={2}>
          <h3>Phone</h3>
          {partner.phone || 'n/a'}
        </GridItem>

        <GridItem xs={2}>
          <h3>Birthday</h3>
          {partner.birthday || 'n/a'}
        </GridItem>

        <GridItem xs={6}>
          <h3>Spouse</h3>
          {partner.spouse || 'n/a'}
        </GridItem>

        <GridItem xs={6}>
          <h3>Address</h3>
          {partner.address_line_1 ? (
            <>
              <AddressLine>{partner.address_line_1}</AddressLine>
              {partner.address_line_2 && <AddressLine>{partner.address_line_2}</AddressLine>}
              <AddressLine>
                {`${partner.city}, ${partner.state} ${partner.zipCode}`}
              </AddressLine>
            </>
          ) : 'n/a'}
        </GridItem>
      </Grid>
    </>
  );
};

const Partner = ({ partner, setIsModalOpen, setSelectedPartner }) => (
  <Grid
    container
    component="li"
    direction="row"
    justifyContent="space-evenly"
    alignItems="center"
    style={{
      padding: '3px 0',
      borderRadius: 5,
    }}
    onClick={() => {
      setIsModalOpen(true);
      setSelectedPartner(partner);
    }}
  >
    <Grid item xs={4} style={{ paddingLeft: 10 }} title={generateAkaString(partner)}>
      {partner.aliases[0]}
    </Grid>
    <Grid item xs={4}>
      {partner.email}
    </Grid>
    <Grid item xs={4}>
      {partner.connected_ministers.join(', ')}
    </Grid>
  </Grid>
);

export default function MinistryPartners() {
  const partners = useSelector(path(['partners', 'list']));
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState(undefined);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartner, setSelectedPartner] = useState();
  const fuse = new Fuse(partners, searchOptions);

  const handleSearch = ({ query }) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(async () => {
      const result = fuse.search(query);
      setSearchResults(result);
      setSearchQuery(query);
    }, TIMEOUT_DELAY);
    setTimeoutId(id);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        <h1 style={{ marginLeft: '1rem' }}>Ministry Partners</h1>
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            alignItems: 'center',
            marginRight: '1rem',
          }}
        >
          <Formik
            onSubmit={handleSearch}
            initialValues={{ query: '' }}
          >
            {({ handleChange, submitForm }) => (
              <Form>
                <Search
                  name="query"
                  placeholder="Search..."
                  onChange={(e) => {
                    handleChange(e);
                    submitForm();
                  }}
                />
              </Form>
            )}
          </Formik>
        </div>
      </div>

      <div style={{ margin: 15 }}>
        <GridHeaders />
        <LineSeparatedList>
          {searchResults.length ? (
            <>
              {searchResults.map((r) => (
                <Partner
                  key={r.item.id}
                  partner={r.item}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedPartner={setSelectedPartner}
                />
              ))}
            </>
          ) : (
            <>
              {searchQuery ? (
                <p>
                  {`No partners match "${searchQuery}"`}
                </p>
              ) : (
                <>
                  {partners.map((p) => (
                    <Partner
                      key={p.id}
                      partner={p}
                      setIsModalOpen={setIsModalOpen}
                      setSelectedPartner={setSelectedPartner}
                    />
                  ))}
                </>
              )}
            </>
          )}
        </LineSeparatedList>
      </div>

      <Card
        isOpen={isModalOpen}
        close={() => setIsModalOpen(false)}
      >
        <FullPartner id={selectedPartner.id} />
      </Card>
    </>
  );
}

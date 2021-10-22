import {
  always, concat, ifElse, join, length, lt, path, pipe, prop, tail, keys, find, propEq,
} from 'ramda';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';

import { LineSeparatedList } from 'components/elements';
import Search from 'components/Search';
import createCard from 'modules/card';

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

const FullPartner = ({ partner }) => (
  <>
    <h1 style={{ textAlign: 'center' }}>{partner.aliases[0]}</h1>
    <Grid container direction="row">
      <Grid item xs={6}>
        <Grid container direction="column">
          <Grid item><h3>Other Names</h3></Grid>
          <Grid item>{tail(partner.aliases).join(', ') || 'n/a'}</Grid>
        </Grid>
      </Grid>
      <Grid item xs={6}>
        <Grid container direction="column">
          <Grid item><h3>Connected Ministers</h3></Grid>
          <Grid item>{tail(partner.connected_ministers).join(', ') || 'n/a'}</Grid>
        </Grid>
      </Grid>
    </Grid>

    {partner.spouse && (
      <Grid container direction="column">
        <Grid item><h3>Spouse</h3></Grid>
        <Grid item>{partner.spouse}</Grid>
      </Grid>
    )}

    {/* WIP! Still figuring out layout. */}
    <br /><br /><br />
    {keys(partner).map((key) => (
      <Grid container direction="row">
        <Grid item xs={2}>{key}: </Grid>
        <Grid item xs={2}>{JSON.stringify(partner[key])}</Grid>
      </Grid>
    ))}
  </>
);

const Partner = ({ partner }) => (
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
      createCard(<FullPartner partner={partner} />);
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
              {searchResults.map((r) => <Partner partner={r.item} />)}
            </>
          ) : (
            <>
              {searchQuery ? (
                <p>
                  {`No partners match "${searchQuery}"`}
                </p>
              ) : (
                <>
                  {partners.map((p) => <Partner key={p.id} partner={p} />)}
                </>
              )}
            </>
          )}
        </LineSeparatedList>
      </div>
    </>
  );
}

import { always, concat, ifElse, join, length, lt, path, pipe, prop, tail } from 'ramda';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { Grid } from '@material-ui/core';
import { Formik, Form } from 'formik';

import { LineSeparatedList } from 'components/elements';
import Search from 'components/Search';

const searchOptions = {
  threshold: 0.5,
  includeMatches: true,
  keys: ['aliases'],
};

const TIMEOUT_DELAY = 500;

const GridHeaders = () => (
  <Grid container direction="row" justifyContent="space-evenly" alignItems="center" style={{fontWeight: 'bold'}}>
    <Grid item xs={4} style={{paddingLeft: 10}}>Name</Grid>
    <Grid item xs={4}>Email</Grid>
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

const Partner = ({ partner }) => (
  <Grid
    container
    component="li"
    direction="row"
    justifyContent="space-evenly"
    alignItems="center"
    style={{
      padding: '3px 0',
      borderRadius: 5
    }}
    title={generateAkaString(partner)}
    onClick={() => {
      alert(JSON.stringify(partner, null, 2));
    }}
  >
    <Grid item xs={4} style={{paddingLeft: 10}}>
      {partner.aliases[0]}
    </Grid>
    <Grid item xs={4}>
      {partner.email}
    </Grid>
  </Grid>
);

export default function MinistryPartners() {
  const partners = useSelector(path(['partners', 'list']));
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState(undefined);
  const fuse = new Fuse(partners, searchOptions);

  const handleSearch = ({query}) => {
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
        <h1 style={{ marginLeft: '1rem' }}>Ministry Partner List</h1>
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
            initialValues={{query: ''}}
          >
            {({handleChange, submitForm}) => (
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

      <div style={{margin: 15}}>
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
                  {partners.map((p) => <Partner partner={p} />)}
                </>
              )}
            </>
          )}
        </LineSeparatedList>
      </div>
    </>
  );
}

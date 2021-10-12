import { path } from 'ramda';
import { useSelector } from 'react-redux';
import { useState } from 'react';
import Fuse from 'fuse.js';
import { Grid } from '@material-ui/core';

import { StripedList } from 'components/elements';
import colors from 'styles/colors';

const searchOptions = {
  threshold: 0.5,
  includeMatches: true,
  keys: ['aliases'],
};

const TIMEOUT_DELAY = 300;

const GridHeaders = () => (
  <li>
    <Grid container>
      <Grid item xs={4}>Name</Grid>
      <Grid item xs={4}>Aliases</Grid>
      <Grid item xs={4}>Email</Grid>
    </Grid>
  </li>
);

const Partner = ({ partner }) => (
  <li>
    <Grid container>
      <Grid item xs={4}>
        {partner.aliases[0]}
      </Grid>
      <Grid item xs={4}>
        {JSON.stringify(partner.aliases)}
      </Grid>
      <Grid item xs={4}>
        {partner.email}
      </Grid>
    </Grid>
  </li>
);

export default function MinistryPartners() {
  const partners = useSelector(path(['partners', 'list']));
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState(undefined);
  const fuse = new Fuse(partners, searchOptions);

  const handleSearchChange = (e) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const id = setTimeout(() => {
      const result = fuse.search(e.target.value);
      setSearchResults(result);
      setSearchQuery(e.target.value);
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
          <input
            name="search"
            type="text"
            placeholder="Search..."
            onChange={handleSearchChange}
            style={{
              padding: 7,
              backgroundColor: colors.grayVeryLight,
              border: 'none',
              borderRadius: 5,
            }}
          />
        </div>
      </div>

      <StripedList>
        {searchResults.length ? (
          <>
            <GridHeaders />
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
                <GridHeaders />
                {partners.map((p) => <Partner partner={p} />)}
              </>
            )}
          </>
        )}
      </StripedList>
    </>
  );
}

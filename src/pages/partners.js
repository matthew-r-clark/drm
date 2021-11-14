import {
  assoc,
  assocPath,
  map,
  path,
  pipe,
  prop,
} from 'ramda';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { Formik, Form } from 'formik';
import styled from '@emotion/styled';

import { DesktopOnly } from 'components/MediaQuery';
import { H1 } from 'components/headers';
import { LineSeparatedList } from 'components/lists';
import EnhancedTable from 'components/EnhancedTable';
import PartnerCard from 'components/PartnerCard';
import Search from 'components/Search';
import debounce from 'modules/debounce';
import { getBreakpoint } from 'styles/theme';

const searchOptions = {
  threshold: 0.5,
  includeMatches: true,
  includeScore: true,
  keys: ['aliases'],
};

const setPrimaryName = (partner) => {
  const name = path(['aliases', '0'], partner);
  return assoc('name', name, partner);
};
const mapPrimaryName = map(setPrimaryName);
const mapSearchScoreToItem = (searchItem) => {
  const score = prop('score', searchItem);
  return assocPath(['item', 'score'], score, searchItem.item);
};

const tableHeaders = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'email', numeric: false, label: 'Email' },
  { id: 'phone', numeric: false, label: 'Phone' },
  { id: 'connected_ministers', numeric: false, label: 'Connected Ministers' },
];

const tableHeadersMobile = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'connected_ministers', numeric: false, label: 'Ministers' },
];

const Heading = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  margin: '0 1rem',
  [`@media (max-width: ${getBreakpoint('sm')}px)`]: {
    justifyContent: 'center',
    marginTop: 25,
  },
});

const SearchContainer = styled.div({
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'center',
  alignItems: 'center',
});

export default function MinistryPartners() {
  const partners = useSelector(path(['partners', 'list']));
  const [searchResults, setSearchResults] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedPartnerId, setSelectedPartnerId] = useState();
  const searchIndex = Fuse.createIndex(searchOptions.keys, partners);
  const fuse = new Fuse(partners, searchOptions, searchIndex);

  useEffect(() => {
    const result = fuse.search(searchQuery);
    setSearchResults(result);
  }, [partners]);

  const handleSearch = ({ query }) => {
    debounce(() => {
      const result = fuse.search(query);
      setSearchResults(result);
      setSearchQuery(query);
    }, 500);
  };

  return (
    <>
      <Heading>
        <DesktopOnly>
          <H1>Ministry Partners</H1>
        </DesktopOnly>
        <SearchContainer>
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
        </SearchContainer>
      </Heading>

      <div style={{ margin: 15 }}>
        <LineSeparatedList>
          {searchResults.length ? (
            <EnhancedTable
              headers={tableHeaders}
              mobileHeaders={tableHeadersMobile}
              rows={map(pipe(
                mapSearchScoreToItem,
                prop('item'),
                setPrimaryName,
              ), searchResults)}
              setIsModalOpen={setIsModalOpen}
              setSelectedPartnerId={setSelectedPartnerId}
              defaultOrder="desc"
              defaultOrderBy="score"
            />
          ) : (
            <>
              {searchQuery ? (
                <p>
                  {`No partners match "${searchQuery}"`}
                </p>
              ) : (
                <EnhancedTable
                  headers={tableHeaders}
                  mobileHeaders={tableHeadersMobile}
                  rows={mapPrimaryName(partners)}
                  setIsModalOpen={setIsModalOpen}
                  setSelectedPartnerId={setSelectedPartnerId}
                  defaultOrderBy="name"
                />
              )}
            </>
          )}
        </LineSeparatedList>
      </div>

      {selectedPartnerId && (
        <PartnerCard
          id={selectedPartnerId}
          isOpen={isModalOpen && selectedPartnerId}
          close={() => setIsModalOpen(false)}
        />
      )}
    </>
  );
}

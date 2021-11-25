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
import CloseIcon from '@material-ui/icons/Close';

import { DesktopOnly } from 'components/MediaQuery';
import { H1 } from 'components/headers';
import EnhancedTable from 'components/EnhancedTable';
import PartnerCard from 'components/PartnerCard';
import Search from 'components/Search';
import debounce from 'modules/debounce';
import { getBreakpoint } from 'styles/theme';
import colors from 'styles/colors';

const searchOptions = {
  threshold: 0.15,
  includeMatches: true,
  includeScore: true,
  keys: ['aliases'],
};

const setPrimaryName = (partner) => {
  const name = path(['aliases', '0'], partner);
  return assoc('name', name, partner);
};
const mapPrimaryName = map(setPrimaryName);
const addScoreToSearchItem = (searchItem) => {
  const score = prop('score', searchItem);
  return assocPath(['item', 'score'], score, searchItem);
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

const ClearSearchButton = styled((props) => <CloseIcon fontSize="small" {...props} />)({
  position: 'absolute',
  right: 0,
  top: 4,
  color: colors.gray,
  borderRadius: '50%',
  '&:hover': {
    cursor: 'pointer',
    backgroundColor: colors.grayLight,
  },
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
            {({ handleChange, submitForm, setFieldValue }) => (
              <Form style={{ position: 'relative' }}>
                <Search
                  name="query"
                  onChange={(e) => {
                    handleChange(e);
                    submitForm();
                  }}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') {
                      setFieldValue('query', '');
                      submitForm();
                    }
                  }}
                />
                <ClearSearchButton
                  onClick={() => {
                    setFieldValue('query', '');
                    submitForm();
                  }}
                />
              </Form>
            )}
          </Formik>
        </SearchContainer>
      </Heading>

      <div style={{ margin: 15 }}>
        {searchResults.length ? (
          <EnhancedTable
            headers={tableHeaders}
            mobileHeaders={tableHeadersMobile}
            rows={map(pipe(
              addScoreToSearchItem,
              prop('item'),
              setPrimaryName,
            ), searchResults)}
            setIsModalOpen={setIsModalOpen}
            setSelectedPartnerId={setSelectedPartnerId}
            defaultOrder="asc"
            defaultOrderBy="score"
            sortDisabled
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

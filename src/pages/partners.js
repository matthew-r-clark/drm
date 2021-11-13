import {
  assoc,
  map,
  path,
  pipe,
  prop,
} from 'ramda';
import { useSelector } from 'react-redux';
import { useEffect, useState } from 'react';
import Fuse from 'fuse.js';
import { Formik, Form } from 'formik';

import { LineSeparatedList } from 'components/lists';
import EnhancedTable from 'components/EnhancedTable';
import PartnerCard from 'components/PartnerCard';
import Search from 'components/Search';
import debounce from 'modules/debounce';

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
  searchItem.item = assoc('score', score, searchItem.item);
  return searchItem;
};

const tableHeaders = [
  { id: 'name', numeric: false, label: 'Name' },
  { id: 'email', numeric: false, label: 'Email' },
  { id: 'connected_ministers', numeric: false, label: 'Connected Ministers' },
  { id: 'score', numeric: true, label: 'Score' },
];

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
        <LineSeparatedList>
          {searchResults.length ? (
            <EnhancedTable
              headers={tableHeaders}
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

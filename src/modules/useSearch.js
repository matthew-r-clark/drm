import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import { equals, prop } from 'ramda';

// eslint-disable-next-line consistent-return
const createIndex = (indexKeys, collection) => {
  if (indexKeys && collection) {
    return Fuse.createIndex(indexKeys, collection);
  }
};

const useSearch = ({
  indexKeys,
  collection,
  searchOptions,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const fuse = new Fuse(collection, searchOptions, createIndex(indexKeys, collection));

  const performSearch = (newQuery) => {
    if (newQuery !== undefined) {
      setSearchQuery(newQuery);
      const results = fuse.search(newQuery);
      setSearchResults(results);
    }
  };

  useEffect(() => {
    if (equals(collection, prop('_docs', fuse))) {
      return;
    }
    fuse.setCollection(collection, createIndex(indexKeys, collection));
    performSearch(searchQuery);
  }, [collection]);

  return {
    searchQuery,
    searchResults,
    performSearch,
  };
};

export default useSearch;

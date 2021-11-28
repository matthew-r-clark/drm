import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';

const createIndex = (indexKeys, collection) => Fuse.createIndex(indexKeys, collection);

const createFuseInstance = (collection, searchOptions, indexKeys) => {
  if (indexKeys) {
    return new Fuse(collection, searchOptions, createIndex(indexKeys, collection));
  }
  return new Fuse(collection, searchOptions);
};

const useSearch = ({
  indexKeys,
  collection,
  searchOptions,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [fuse] = useState(createFuseInstance(collection, searchOptions, indexKeys));

  const performSearch = (newQuery) => {
    if (newQuery !== undefined) {
      setSearchQuery(newQuery);
      const results = fuse.search(newQuery);
      setSearchResults(results);
    }
  };

  useEffect(() => {
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

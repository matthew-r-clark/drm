import { useState, useEffect } from 'react';
import Fuse from 'fuse.js';
import debounce from 'modules/debounce';

const useSearch = ({
  indexKeys,
  sourceList: initialSourceList,
  searchOptions,
}) => {
  const [query, setQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [searchIndex, setSearchIndex] = useState();
  const [fuse, setFuse] = useState(new Fuse(initialSourceList, searchOptions, searchIndex));
  const [sourceList, setSourceList] = useState(initialSourceList);

  useEffect(() => {
    if (indexKeys && sourceList) {
      const index = Fuse.createIndex(indexKeys, sourceList);
      setSearchIndex(index);
    }
  }, []);

  useEffect(() => {
    if (sourceList) {
      const fuseInstance = new Fuse(sourceList, searchOptions, searchIndex);
      setFuse(fuseInstance);
    }
  }, [sourceList]);

  const performSearch = (newQuery) => debounce(() => {
    setQuery(newQuery);
    const results = fuse.search(newQuery);
    setSearchResults(results);
  }, 500);

  const updateSourceList = (list) => {
    setSourceList(list);
    performSearch(query);
  };

  return {
    query,
    performSearch,
    searchResults,
    updateSourceList,
  };
};

export default useSearch;

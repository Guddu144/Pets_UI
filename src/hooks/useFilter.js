import { useCallback, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

const useInitializeFilter = initialState => {
  const [searchParams] = useSearchParams();
  const keys = Object.keys(initialState);
  return () => {
    const filter = {};
    for (const key of keys) {
      filter[key] = searchParams.get(key) || initialState[key];
    }
    return filter;
  };
};

const useFilter = initialState => {
  const initialize = useInitializeFilter(initialState);
  const [filter, setFilter] = useState(initialize());

  const handleChange = useCallback((field, value) => {
    const fields = new Set(Object.keys(filter));
    if (!fields.has(field)) {
      return;
    }
    setFilter({
      ...filter,
      [field]: value,
    });
  }, [filter]);

  return [filter, handleChange];
};

export default useFilter;

import { useEffect, useMemo } from 'react';
import debounce from 'lodash/debounce';

const useDebounced = (fn, delay = 200) => {
  const debounced = useMemo(() => debounce(fn, delay), []);

  useEffect(() => {
    return () => {
      debounced.cancel();
    };
  }, []);
  return debounced;
};

export default useDebounced;

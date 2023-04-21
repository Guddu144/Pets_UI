import React, { useState, useEffect } from 'react';

import SearchBox from './SearchBox';
import { useHandleError } from '../../hooks';

const AsyncSearchBox = ({ onChange, adder, fetcher, value, ...props }, ref) => {
  const handleError = useHandleError();
  const [key, setKey] = useState(0);
  const [options, setOptions] = useState([]);

  useEffect(() => {
    handleQuery('', value)
      .then(() => setKey(key + 1));
  }, [value]);

  const handleQuery = (query, value) => {
    return fetcher(query, value)
      .then(data => {
        setOptions(data.data)
      })
      .catch(handleError);
  };

  const handleAddOption = option => {
    adder(option)
      .then(opt => {
        setOptions([opt]);
        onChange(opt.id);
      })
      .catch(handleError);
  };

  return (
    <SearchBox
      key={key}
      ref={ref}
      options={options}
      onQuery={handleQuery}
      onChange={onChange}
      onAddOption={adder ? handleAddOption : undefined}
      value={value}
      {...props}
    />
  );
};

export default React.forwardRef(AsyncSearchBox);

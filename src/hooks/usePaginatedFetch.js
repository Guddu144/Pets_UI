import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useSearchParams } from 'react-router-dom';
import useHandleError from './useHandleError';

const DEFAULT_LIMIT = 10;

/**
 * @param {(page: number, query : string)=> Promise<{data : Array<T>, metaData: {}}>} apiRequest
 */
const usePaginatedFetch = (apiRequest, filter) => {
  const { t } = useTranslation();
  const [records, setRecords] = useState([]);
  const handleError = useHandleError(t('unable to load data'));
  const [searchParams, setSearchParams] = useSearchParams();
  const [isFetching, setFetching] = useState(false);

  const limit = searchParams.has('l') ? Number(searchParams.get('l')) : DEFAULT_LIMIT;
  const [pagination, setPagination] = useState({
    query: searchParams.get('q'),
    totalResults: 0,
    limit: limit,
    offset: searchParams.has('p') ? (Number(searchParams.get('p')) - 1) * limit : 0,
    from: 1,
    to: 1,
  });

  useEffect(() => {
    refetch();
  }, [pagination.offset, pagination.query, pagination.limit, filter]);

  useEffect(() => {
    if (!filter) {
      return;
    }
    handleSetSearchParams(filter);
    onPageChange(0);
  }, [filter]);

  const handleSetSearchParams = params => {
    for (const [key, value] of Object.entries(params)) {
      if (value) {
        searchParams.set(key, value);
      } else {
        searchParams.delete(key);
      }
    }
    setSearchParams(searchParams);
  };

  const refetch = () => {
    setFetching(true);
    apiRequest({
      offset: pagination.offset,
      limit: pagination.limit,
      ...pagination.query && { query: pagination.query },
      ...filter,
    })
      .then(({ data, meta }) => {
        setRecords(data);
        setPagination({
          ...pagination,
          totalResults: meta.total,
          offset: meta.offset,
          from: data.length === 0 ? 0 : meta.offset + 1,
          to: meta.offset + data.length,
        });
      })
      .catch(handleError)
      .finally(() => setFetching(false));
  };

  const onPageChange = page => {
    setPagination({
      ...pagination,
      offset: page * limit,
    });
    handleSetSearchParams({ p: page + 1 });
  };

  const onQueryChange = query => {
    setPagination({
      ...pagination,
      query,
    });
    handleSetSearchParams({ q: query });
  };

  const onLimitChange = limit => {
    setPagination({
      ...pagination,
      offset: 0,
      limit,
    });

    handleSetSearchParams({
      p: 1,
      l: limit,
    });
  };

  return {
    page: (Number(searchParams.get('p')) || 1) - 1,
    totalPages: Math.ceil(pagination.totalResults / pagination.limit),
    isFetching,
    records,
    pagination,
    onQueryChange,
    onPageChange,
    onLimitChange,
  };
};

export default usePaginatedFetch;

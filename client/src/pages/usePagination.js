import React from 'react';
import { useQuery } from 'urql';
import usePreviousValue from './usePreviousValue';

const usePagination = (query, limit = 20) => {
  const [result, setResult] = React.useState([]);
  const [from, setFrom] = React.useState(0);

  const [{ fetching, data, error }] = useQuery({
    query,
    variables: { limit, from },
  });

  const prevFetching = usePreviousValue(fetching);

  React.useEffect(() => {
    if (prevFetching === true && fetching === false && !error) {
      setResult(d => [...d, ...data.launches.launches]);
    }
  }, [fetching, prevFetching, data, error]);

  const fetchMore = React.useCallback(() => {
    setFrom(s => s + limit);
  }, [limit]);

  return [{ data: result, error }, fetchMore, data && data.launches && data.launches.hasMore];
}

export default usePagination;

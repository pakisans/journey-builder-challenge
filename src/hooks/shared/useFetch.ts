import { useEffect, useState } from 'react';

export const useFetch = <T>(fn: () => Promise<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    fn()
      .then((res) => active && setData(res))
      .catch((e) => active && setError(e instanceof Error ? e.message : 'Error'))
      .finally(() => active && setLoading(false));

    return () => {
      active = false;
    };
  }, [fn]);

  return { data, loading, error };
};

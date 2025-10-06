import { useState, useCallback } from "react";

interface UseApiOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: any) => void;
}

export const useApi = <T = any>(options?: UseApiOptions<T>) => {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  /**
   * run(apiFn, ...args)
   * apiFn → function that returns a Promise (like an API call)
   * args → arguments passed to apiFn
   */
  const run = useCallback(
    async <A extends any[]>(apiFn: (...args: A) => Promise<T>, ...args: A) => {
      setLoading(true);
      setError(null);

      try {
        const result = await apiFn(...args);
        setData(result);
        options?.onSuccess?.(result);
        return result;
      } catch (err) {
        setError(err);
        options?.onError?.(err);
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [options]
  );

  return { data, error, loading, run };
};

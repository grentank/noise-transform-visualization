import { useEffect, useState } from 'react';

type UseAsyncReturn<T> = {
  pending: boolean;
  success: boolean;
  data?: T;
  error?: Error;
};

export default function useAsync<ReturnT, ArgumentT = void>(
  fn: (arg: ArgumentT) => Promise<ReturnT>,
  arg: ArgumentT,
): UseAsyncReturn<ReturnT> {
  const [data, setData] = useState<ReturnT>();
  const [error, setError] = useState<Error>();

  useEffect(() => {
    fn(arg).then(setData).catch(setError);
  }, []);

  if (!error && !data) return { pending: true, success: false };

  if (!error)
    return {
      pending: false,
      success: true,
      data,
    };

  return {
    pending: false,
    success: false,
    error,
  };
}

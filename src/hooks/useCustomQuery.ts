import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';

import axiosInstance from '#/api/axios';

const fetchData = async (url: string) => {
  const response = await axiosInstance.get(url, {});

  return response.data;
};

export const useCustomQuery = <
  TQueryFnData = unknown,
  TError = unknown,
  TData = TQueryFnData,
>(
  queryKey: QueryKey,
  url: string,
  options?: UseQueryOptions<TQueryFnData, TError, TData>,
): UseQueryResult<TData, TError> => {
  return useQuery<TQueryFnData, TError, TData>({
    queryKey,
    queryFn: () => fetchData(url),
    ...options,
  });
};

import axiosInstance from '#/api/axios';
import {
  useQuery,
  UseQueryOptions,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import { cookies } from 'next/headers';

const fetchData = async (url: string) => {
  // const cookieStore = cookies();
  // const token = cookieStore.get('token')?.value;

  const response = await axiosInstance.get(url, {
    // headers: {
    //   Authorization: `Bearer ${token}`,
    // },
  });

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

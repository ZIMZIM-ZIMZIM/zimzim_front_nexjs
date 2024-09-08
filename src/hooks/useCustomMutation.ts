import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import axiosInstance from '#/api/axios';

const mutateData = async <TData, TVariables>(
  url: string,
  method: 'post' | 'put' | 'delete' | 'patch',
  data?: TVariables,
) => {
  const response = await axiosInstance({
    url,
    method,
    data,
  });

  return response.data as TData;
};

export const useCustomMutation = <
  TData = unknown,
  TError = unknown,
  TVariables = void,
  TContext = unknown,
>(
  url: string,
  method: 'post' | 'put' | 'delete' | 'patch',
  options?: UseMutationOptions<TData, TError, TVariables, TContext>,
): UseMutationResult<TData, TError, TVariables, TContext> => {
  return useMutation({
    mutationFn: (variables: TVariables) =>
      mutateData<TData, TVariables>(url, method, variables),
    onSuccess: (data, variables, context) => {
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

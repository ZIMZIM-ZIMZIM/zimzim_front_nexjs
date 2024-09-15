import {
  useMutation,
  UseMutationOptions,
  UseMutationResult,
} from '@tanstack/react-query';

import axiosInstance from '#/api/axios';

const mutateData = async <TData, TVariables>(
  url: string | ((variables: TVariables) => string),
  method: 'post' | 'put' | 'delete' | 'patch',
  data?: TVariables,
) => {
  const finalUrl = typeof url === 'function' ? url(data as TVariables) : url;
  const response = await axiosInstance({
    url: finalUrl,
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
  url: string | ((variables: TVariables) => string),
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

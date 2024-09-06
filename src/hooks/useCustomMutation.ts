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
  return response.data;
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
      console.log('Mutation successful', data);
      if (options?.onSuccess) {
        options.onSuccess(data, variables, context);
      }
    },
    onError: (error, variables, context) => {
      console.error('Mutation failed', error);
      if (options?.onError) {
        options.onError(error, variables, context);
      }
    },
    ...options,
  });
};

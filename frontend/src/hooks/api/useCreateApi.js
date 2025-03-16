import { useMutation, useQueryClient } from "react-query";
import api from "@/lib/axios";

export const useCreateApi = (
  endpoint,
  queryKey,
  {
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
    ...mutationOptions
  } = {}
) => {
  const queryClient = useQueryClient();

  const createData = async (data) => {
    const response = await api.post(endpoint, data);
    return response.data;
  };

  return useMutation(createData, {
    onSuccess: (data, variables) => {
      // Invalidate and refetch the query
      queryClient.invalidateQueries(queryKey);

      // Update the cache immediately
      queryClient.setQueryData(queryKey, (oldData) => {
        if (Array.isArray(oldData)) {
          return [...oldData, data];
        }
        return oldData;
      });

      // Call the success callback if provided
      if (onSuccessCallback) {
        onSuccessCallback(data, variables);
      }
    },
    onError: (error, variables) => {
      // Call the error callback if provided
      if (onErrorCallback) {
        onErrorCallback(error, variables);
      }
    },
    ...mutationOptions,
  });
};

export default useCreateApi;

import { useMutation, useQueryClient } from "react-query";
import api from "@/lib/axios";

export const useEditApi = (
  endpoint,
  queryKey,
  {
    onSuccess: onSuccessCallback,
    onError: onErrorCallback,
    ...mutationOptions
  } = {}
) => {
  const queryClient = useQueryClient();

  const editData = async ({ id, ...updateData }) => {
    const response = await api.put(`${endpoint}/${id}`, updateData);
    return response.data;
  };

  return useMutation(editData, {
    onSuccess: (data, variables) => {
      // Invalidate and refetch the query
      queryClient.invalidateQueries(queryKey);

      // Update the cache immediately
      queryClient.setQueryData(queryKey, (oldData) => {
        if (Array.isArray(oldData)) {
          return oldData.map((item) =>
            item.id === variables.id ? { ...item, ...variables } : item
          );
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

export default useEditApi;

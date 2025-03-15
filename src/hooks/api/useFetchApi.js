import { useQuery } from "react-query";
import api from "@/lib/axios";

export const useFetchApi = (
  endpoint,
  queryKey,
  {
    enabled = true,
    staleTime = 5 * 60 * 1000, // 5 minutes
    cacheTime = 30 * 60 * 1000, // 30 minutes
    ...queryOptions
  } = {}
) => {
  const fetchData = async () => {
    const { data } = await api.get(endpoint);
    return data;
  };

  return useQuery(queryKey, fetchData, {
    enabled,
    staleTime,
    cacheTime,
    ...queryOptions,
  });
};

export default useFetchApi;

import { useFetchApi, useCreateApi, useEditApi } from "./api";

export const useProducts = () => {
  const {
    data: products,
    isLoading,
    error,
  } = useFetchApi("/products", "products");

  const createProduct = useCreateApi("/products", "products");
  const editProduct = useEditApi("/products", "products");

  return {
    products,
    isLoading,
    error,
    createProduct: createProduct.mutate,
    editProduct: editProduct.mutate,
    isCreating: createProduct.isLoading,
    isEditing: editProduct.isLoading,
  };
};

export default useProducts;

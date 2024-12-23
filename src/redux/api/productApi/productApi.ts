import { baseApi } from "../baseApi";

const addProductApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    addProduct: builder.mutation({
      query: (data) => ({
        url: "/product/create",
        method: "POST",
        body: data,
      }),
    }),
    getAllProduct: builder.query({
      query: () => ({
        url: "/product/all",
        method: "GET",
      }),
    }),

    getProductByAvarageRating: builder.query({
      query: () => ({
        url: "/product/top-rated",
        method: "GET",
      }),
    }),

    getSellerProduct: builder.query({
      query: () => ({
        url: "/product/seller-product",
        method: "GET",
      }),
    }),

    getProductById: builder.query({
      query: (id: string) => ({
        url: `/product/${id}`,
        method: "GET",
      }),
    }),

    updateProduct: builder.mutation({
      query: (data) => ({
        url: `/product/update/${data.id}`,
        method: "PATCH",
        body: data,
      }),
    }),
    useUpdateProductMutation: builder.mutation({
      query: (data) => ({
        url: `/product/update/${data.id}`,
        method: "PATCH",
        body: data.data,
      }),
    }),

    deleteProduct: builder.mutation({
      query: (id: string) => ({
        url: `/product/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const {
  useAddProductMutation,
  useDeleteProductMutation,
  useGetAllProductQuery,
  useGetProductByIdQuery,
  useGetProductByAvarageRatingQuery,
  useGetSellerProductQuery,
  useUpdateProductMutation,
} = addProductApi;

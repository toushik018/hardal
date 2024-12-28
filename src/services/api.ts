import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '@/redux/store';

export const api = createApi({
    baseQuery: fetchBaseQuery({
        baseUrl: '/api',
        credentials: 'include',
        prepareHeaders: (headers, { getState }) => {
            const token = (getState() as RootState).session.apiToken;
            if (token) {
                headers.set('authorization', `Bearer ${token}`);
            }
            return headers;
        },
    }),
    tagTypes: ['Cart', 'Products', 'Packages'],
    endpoints: (builder) => ({
        getCart: builder.query<any, void>({
            query: () => 'get-cart',
            providesTags: ['Cart'],
        }),
        getProductsByCategory: builder.query<any, string>({
            query: (categoryId) => ({
                url: 'get-products-by-category',
                method: 'POST',
                body: { categoryId },
            }),
            providesTags: ['Products'],
        }),
        addToCart: builder.mutation<any, { id: string; quantity: number }>({
            query: (body) => ({
                url: 'add-main-product',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Cart'],
        }),
        editProduct: builder.mutation<any, { id: string; quantity: number }>({
            query: (body) => {
                return {
                    url: 'edit-product',
                    method: 'POST',
                    body: {
                        id: body.id,
                        quantity: body.quantity,
                    },
                };
            },
            invalidatesTags: ['Cart'],
        }),

        removeProduct: builder.mutation<any, { id: string; quantity: number }>({
            query: (body) => ({
                url: 'remove-product',
                method: 'POST',
                body: {
                    id: body.id,
                    quantity: body.quantity.toString(),
                },
            }),
            invalidatesTags: ['Cart'],
        }),
        getPackages: builder.query<any, void>({
            query: () => 'get-packages',
            providesTags: ['Packages'],
        }),
        getMenuContent: builder.query<any, number>({
            query: (menuId) => ({
                url: 'get-menu-content',
                method: 'POST',
                body: { menu: menuId },
            }),
            providesTags: ['Cart'],
        }),
        getProductById: builder.query<any, string>({
            query: (productId) => ({
                url: 'get-product-by-id',
                method: 'POST',
                body: { productId },
            }),
        }),
        getPaymentMethods: builder.query<any, void>({
            query: () => 'get-payment-methods',
        }),
        setPaymentMethod: builder.mutation<any, { payment_method: string }>({
            query: (body) => ({
                url: 'set-payment-method',
                method: 'POST',
                body,
            }),
        }),
        setShippingAddress: builder.mutation<any, {
            firstname: string;
            lastname: string;
            address_1: string;
            city: string;
            country_id: string;
            zone_id: string;
            shipping_address_id: string;
        }>({
            query: (body) => ({
                url: 'set-shipping-address',
                method: 'POST',
                body,
            }),
        }),

        setPaymentAddress: builder.mutation<any, {
            firstname: string;
            lastname: string;
            address_1: string;
            city: string;
            country_id: string;
            zone_id: string;
            payment_address_id: string;
        }>({
            query: (body) => ({
                url: 'set-payment-address',
                method: 'POST',
                body,
            }),
        }),
        getShippingMethod: builder.query<any, void>({
            query: () => 'get-shipping-method',
        }),
        setShippingMethod: builder.mutation<any, { shipping_method: string }>({
            query: (body) => ({
                url: 'set-shipping-method',
                method: 'POST',
                body,
            }),
        }),
        getCategories: builder.query<any, void>({
            query: () => 'get-categories',
        }),
        clearCart: builder.mutation<any, void>({
            query: () => ({
                url: 'clear-cart',
                method: 'POST',
            }),
            invalidatesTags: ['Cart'],
        }),
        addPackage: builder.mutation<any, { guests: number }>({
            query: (body) => ({
                url: 'add-package',
                method: 'POST',
                body
            }),
            invalidatesTags: ['Cart'],
        }),
        deletePackage: builder.mutation<any, { id?: string }>({
            query: (body) => ({
                url: 'delete-package',
                method: 'POST',
                body: body.id ? { id: body.id.toString() } : {}
            }),
            invalidatesTags: ['Cart'],
        }),
        login: builder.mutation<any, { email: string; password: string }>({
            query: (credentials) => ({
                url: 'login',
                method: 'POST',
                body: credentials,
            }),
        }),
        register: builder.mutation<
            any,
            {
                firstname: string;
                lastname: string;
                email: string;
                telephone: string;
                password: string;
                company?: string;
                department?: string;
            }>
            ({
                query: (credentials) => ({
                    url: 'register',
                    method: 'POST',
                    body: credentials,
                }),
            }),
        forgotPassword: builder.mutation<any, { email: string }>({
            query: (data) => ({
                url: 'forgot-password',
                method: 'POST',
                body: data,
            }),
        }),
        addExtra: builder.mutation<any, { product_id: string }>({
            query: (body) => ({
                url: 'add-extra',
                method: 'POST',
                body: {
                    product_id: body.product_id.toString()
                }
            }),
            invalidatesTags: ['Cart'],
        }),
    }),
});

export const {
    useGetCartQuery,
    useGetProductsByCategoryQuery,
    useAddToCartMutation,
    useEditProductMutation,
    useRemoveProductMutation,
    useGetPackagesQuery,
    useGetMenuContentQuery,
    useGetProductByIdQuery,
    useGetPaymentMethodsQuery,
    useSetPaymentMethodMutation,
    useSetShippingAddressMutation,
    useSetPaymentAddressMutation,
    useGetShippingMethodQuery,
    useSetShippingMethodMutation,
    useGetCategoriesQuery,
    useClearCartMutation,
    useAddPackageMutation,
    useDeletePackageMutation,
    useLoginMutation,
    useRegisterMutation,
    useForgotPasswordMutation,
    useAddExtraMutation,
} = api;

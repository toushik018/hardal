// redux/actions/index.ts

// Action Types
export const ADD_TO_CART = "ADD_TO_CART";
export const SUBTRACT_FROM_CART = "SUBTRACT_FROM_CART";
export const GET_CART_SUCCESS = "GET_CART_SUCCESS";
export const DELETE_FROM_CART = "DELETE_FROM_CART";
export const UPDATE_CART_DATA = "UPDATE_CART_DATA";
export const ADD_QUANTITY = "ADD_QUANTITY";
export const ADD_MAIN_PRODUCT = "ADD_MAIN_PRODUCT";
export const EDIT_PRODUCT = "EDIT_PRODUCT";
export const SET_SELECTED_CITY = "SET_SELECTED_CITY";
export const SET_SELECTED_DELIVERY_METHOD = "SET_SELECTED_DELIVERY_METHOD";
export const SET_SELECTED_RESTAURANT = "SET_SELECTED_RESTAURANT";

export const GET_PACKAGES_SUCCESS = "GET_PACKAGES_SUCCESS";
export const GET_PRODUCTS_BY_CATEGORY_SUCCESS = "GET_PRODUCTS_BY_CATEGORY_SUCCESS";
export const GET_PRODUCT_BY_ID_SUCCESS = "GET_PRODUCT_BY_ID_SUCCESS";
export const SET_LOADING = "SET_LOADING";
export const RESET_PRODUCTS = "RESET_PRODUCTS";
export const SET_ACTIVE_CATEGORY_NAME = "SET_ACTIVE_CATEGORY_NAME";
export const UPDATE_PRODUCTS = "UPDATE_PRODUCTS";

export interface CartItem {
    product_id: number;
    quantity: number;
    category_id?: string;
    addedExtras?: any;
}

interface Restaurant {
    id: number;
    name: string;
}


export const addToCart = (item: CartItem) => ({
    type: ADD_TO_CART as typeof ADD_TO_CART,
    payload: item,
});

export const addToMainProduct = (item: CartItem) => ({
    type: ADD_MAIN_PRODUCT as typeof ADD_MAIN_PRODUCT,
    payload: item,
});

export const editProductAsync = (item: CartItem) => ({
    type: EDIT_PRODUCT as typeof EDIT_PRODUCT,
    payload: item,
});

export const addToQuantity = (item: CartItem) => ({
    type: ADD_QUANTITY as typeof ADD_QUANTITY,
    payload: item,
});

export const subtractFromCart = (item: CartItem) => ({
    type: SUBTRACT_FROM_CART as typeof SUBTRACT_FROM_CART,
    payload: item,
});

export const getCartSuccess = (cartData: any) => ({
    type: GET_CART_SUCCESS,
    payload: cartData,
});

export const deleteFromCart = (item: CartItem) => ({
    type: DELETE_FROM_CART as typeof DELETE_FROM_CART,
    payload: item,
});

export const updateCartData = (updatedCartData: CartItem[]) => ({
    type: UPDATE_CART_DATA as typeof UPDATE_CART_DATA,
    payload: updatedCartData,
});

export const setSelectedCity = (selectedCity: string) => ({
    type: SET_SELECTED_CITY as typeof SET_SELECTED_CITY,
    payload: selectedCity,
});

export const setSelectedDeliveryMethod = (selectedDeliveryMethod: string) => ({
    type: SET_SELECTED_DELIVERY_METHOD as typeof SET_SELECTED_DELIVERY_METHOD,
    payload: selectedDeliveryMethod,
});

export const setSelectedRestaurant = (selectedRestaurant: Restaurant) => ({
    type: SET_SELECTED_RESTAURANT as typeof SET_SELECTED_RESTAURANT,
    payload: selectedRestaurant,
});

// Add these new action creators
export const getPackagesSuccess = (packages: any[]) => ({
    type: GET_PACKAGES_SUCCESS as typeof GET_PACKAGES_SUCCESS,
    payload: packages,
});

export const getProductsByCategorySuccess = (products: any[]) => ({
    type: GET_PRODUCTS_BY_CATEGORY_SUCCESS as typeof GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    payload: products,
});

export const getProductByIdSuccess = (product: any) => ({
    type: GET_PRODUCT_BY_ID_SUCCESS as typeof GET_PRODUCT_BY_ID_SUCCESS,
    payload: product,
});

export const setLoading = (isLoading: boolean) => ({
    type: SET_LOADING as typeof SET_LOADING,
    payload: isLoading,
});

export const resetProducts = () => ({
    type: 'RESET_PRODUCTS' as const,
});

export const setActiveCategoryName = (name: string) => ({
    type: SET_ACTIVE_CATEGORY_NAME,
    payload: name
});

export const updateProducts = (products: any[]) => ({
    type: UPDATE_PRODUCTS as typeof UPDATE_PRODUCTS,
    payload: products,
});

// Update the CartActionTypes union type
export type CartActionTypes =
    | ReturnType<typeof addToCart>
    | ReturnType<typeof addToMainProduct>
    | ReturnType<typeof editProductAsync>
    | ReturnType<typeof addToQuantity>
    | ReturnType<typeof subtractFromCart>
    | ReturnType<typeof getCartSuccess>
    | ReturnType<typeof deleteFromCart>
    | ReturnType<typeof updateCartData>
    | ReturnType<typeof setSelectedCity>
    | ReturnType<typeof setSelectedDeliveryMethod>
    | ReturnType<typeof setSelectedRestaurant>
    | ReturnType<typeof getPackagesSuccess>
    | ReturnType<typeof getProductsByCategorySuccess>
    | ReturnType<typeof getProductByIdSuccess>
    | ReturnType<typeof setLoading>
    | ReturnType<typeof resetProducts>
    | ReturnType<typeof setActiveCategoryName>
    | ReturnType<typeof updateProducts>;
export interface CartData {
    products: CartItem[];
    cart: {
        [x: string]: any;
        menu: {
            name: string;
            id: number;
            contents: Array<{
                name: string;
                ids: number[];
                count: number;
            }>;
        };
        category: {
            id: string;
            title: string;
        };
        selectedProduct: any | null;
    };
    vouchers: any[];
    totals: Array<{
        title: string;
        text: string;
    }>;
    shipping_required: boolean;
}

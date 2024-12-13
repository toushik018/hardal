import {
    ADD_TO_CART,
    SUBTRACT_FROM_CART,
    GET_CART_SUCCESS,
    UPDATE_CART_DATA,
    ADD_QUANTITY,
    DELETE_FROM_CART,
    ADD_MAIN_PRODUCT,
    EDIT_PRODUCT,
    SET_SELECTED_CITY,
    SET_SELECTED_DELIVERY_METHOD,
    SET_SELECTED_RESTAURANT,
    GET_PACKAGES_SUCCESS,
    GET_PRODUCTS_BY_CATEGORY_SUCCESS,
    CartActionTypes,
    GET_PRODUCT_BY_ID_SUCCESS,
    SET_LOADING,
    RESET_PRODUCTS,
    SET_ACTIVE_CATEGORY_NAME,
    UPDATE_PRODUCTS
} from "../actions";
import { CartData } from '../actions';

interface CartItem {
    product_id: number;
    quantity: number;
    price: string;
}

interface Restaurant {
    id: number;
    name: string;
}

interface CartState extends CartData {
    loading: any;
    selectedRestaurant: Restaurant | null;
    selectedCity: string | null;
    selectedDeliveryMethod: string | null;
    packages: any[];
    categories: any[];
    activeCategoryName: string;
}

const initialState: CartState = {
    products: [],
    cart: {
        menu: {
            name: '',
            id: 0,
            contents: [],
        },
        category: {
            id: '',
            title: '',
        },
        selectedProduct: null,
    },
    vouchers: [],
    totals: [],
    shipping_required: false,
    selectedRestaurant: null,
    selectedCity: null,
    selectedDeliveryMethod: null,
    packages: [],
    categories: [],
    loading: false,
    activeCategoryName: '',
};

const reducer = (state = initialState, action: CartActionTypes): CartState => {
    switch (action.type) {
        case ADD_TO_CART:
        case ADD_MAIN_PRODUCT:
        case ADD_QUANTITY:
        case UPDATE_CART_DATA:
        case DELETE_FROM_CART:
            console.log(`Reducer: Handling ${action.type}`, action.payload);
            return {
                ...state,
                products: Array.isArray(action.payload)
                    ? action.payload as unknown as CartItem[]
                    : action.payload ? [...state.products, action.payload as unknown as CartItem]
                        : state.products,
            };
        case EDIT_PRODUCT:
            console.log("Reducer: Handling EDIT_PRODUCT", action.payload);
            return {
                ...state,
                products: state.products.map(product =>
                    product.product_id === action.payload.product_id
                        ? { ...product, quantity: action.payload.quantity }
                        : product
                )
            };
        case SET_SELECTED_CITY:
            return {
                ...state,
                selectedCity: action.payload,
            };
        case SET_SELECTED_DELIVERY_METHOD:
            return {
                ...state,
                selectedDeliveryMethod: action.payload,
            };
        case SET_SELECTED_RESTAURANT:
            return {
                ...state,
                selectedRestaurant: action.payload,
            };

        case SUBTRACT_FROM_CART:
            return {
                ...state,
                products: state.products.map(item =>
                    item.product_id === action.payload.product_id && item.quantity > 1
                        ? { ...item, quantity: item.quantity - 1 }
                        : item
                ),
            };

        case GET_CART_SUCCESS:
            console.log("Reducer: Handling GET_CART_SUCCESS", action.payload);
            return {
                ...state,
                cart: action.payload,
            };

        case GET_PACKAGES_SUCCESS:
            return { ...state, packages: action.payload };

        case GET_PRODUCTS_BY_CATEGORY_SUCCESS:
            return { ...state, products: action.payload };

        case GET_PRODUCT_BY_ID_SUCCESS:
            return { ...state, cart: { ...state.cart, selectedProduct: action.payload } };

        case SET_LOADING:
            return {
                ...state,
                loading: action.payload,
            };
        case RESET_PRODUCTS:
            return {
                ...state,
                products: [],
            };
        case SET_ACTIVE_CATEGORY_NAME:
            return {
                ...state,
                activeCategoryName: action.payload
            };

        case UPDATE_PRODUCTS:
            return {
                ...state,
                products: action.payload
            };

        default:
            return state;
    }
};

export default reducer;

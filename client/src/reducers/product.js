import {
    FETCH_PRODUCTS_REQUESTED,
    FETCH_PRODUCTS_SUCCEEDED,
    SAVE_PRODUCT_SUCCEEDED
} from '../actions/product';

export default function product(state = {
    loading: false,
    size: 0,
    total: 0,
    result: null
}, action) {
    switch (action.type) {
        case FETCH_PRODUCTS_REQUESTED:
            return {
                ...state, result: null, loading: true, size: null, total: null, update: false
            };
        case FETCH_PRODUCTS_SUCCEEDED:
            return {
                ...state, result: action.result, loading: false, size: action.size, total: action.total
            };
        case SAVE_PRODUCT_SUCCEEDED:
            return {
                ...state, update: false
            };
        default:
            return state;
    }
}
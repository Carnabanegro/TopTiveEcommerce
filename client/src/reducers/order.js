import {
    FETCH_ORDERS_REQUESTED,
    FETCH_ORDERS_SUCCEEDED,
    FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED,
    FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED,
    SAVE_ORDER_SUCCEEDED
} from '../actions/order';

export default function order(state = {
    loading: false,
    size: 0,
    total: 0,
    result: null,
    update:false
}, action) {
    switch (action.type) {
        case FETCH_ORDERS_REQUESTED:
            return {
                ...state, result: null, loading: true, size: null, total: null, update: false
            };
        case FETCH_ORDERS_SUCCEEDED:
            return {
                ...state, result: action.result, loading: false, size: action.size, total: action.total
            };
        case FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED:
            return {
                ...state, result: null, loading: true, size: null, total: null, liquidation: null , update: false
            };
        case FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED:
            return {
                ...state, result: action.result, loading: false, size: action.size, total: action.total, liquidation: action.liquidation
            };
        case SAVE_ORDER_SUCCEEDED:
            return {
                ...state, update: true
            };
        default:
            return state;
    }
}
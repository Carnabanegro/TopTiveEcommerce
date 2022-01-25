import {
    FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED,
    FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED,
} from '../actions/statistics';
import {AN_ERROR_OCCURRED} from "../actions";

export default function orderStatistics(state = {
    loading: false,
    size: 0,
    total: 0,
    result: null,
    update:false
}, action) {
    switch (action.type) {
        case FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED:
            return {
                ...state, result: null, loading: true, size: null, total: null, liquidation: null , update: false
            };
        case FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED:
            return {
                ...state, result: action.result, loading: false, size: action.size, total: action.total, liquidation: action.liquidation
            };
        case AN_ERROR_OCCURRED:
            return {
                ...state, loading: false
            };
        default:
            return state;
    }
}
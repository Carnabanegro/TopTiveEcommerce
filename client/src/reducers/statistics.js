import {
    FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED,
    FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED,
} from '../actions/statistics';

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
        default:
            return state;
    }
}
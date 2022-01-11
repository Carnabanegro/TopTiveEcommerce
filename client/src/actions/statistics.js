export const FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED = 'FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED';
export function requestOrdersWithLiquidation(fname,fvalue,current,userId,actionType,token) {
    return {type: FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED,fname,fvalue,current,userId,actionType,token};
}

export const FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED = 'FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED';
export function requestOrdersWithLiquidationSucceeded(result, size, total, current,liquidation) {
    return {type: FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED,result, size, total, current,liquidation};
}
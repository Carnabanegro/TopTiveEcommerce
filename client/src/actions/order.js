export const FETCH_ORDERS_REQUESTED = 'FETCH_ORDERS_REQUESTED';
export function requestOrders(fname,fvalue,current,userId) {
    return {type: FETCH_ORDERS_REQUESTED,fname,fvalue,current,userId};
}

export const FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED = 'FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED';
export function requestOrdersWithLiquidation(fname,fvalue,current,userId,actionType,token) {
    return {type: FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED,fname,fvalue,current,userId,actionType,token};
}

export const FETCH_ORDERS_SUCCEEDED = 'FETCH_ORDERS_SUCCEEDED';
export function requestOrdersSucceeded(result, size, total, current) {
    return {type: FETCH_ORDERS_SUCCEEDED,result, size, total, current};
}

export const FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED = 'FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED';
export function requestOrdersWithLiquidationSucceeded(result, size, total, current,liquidation) {
    return {type: FETCH_ORDERS_WITH_LIQUIDATION_SUCCEEDED,result, size, total, current,liquidation};
}

export const SAVE_ORDER_REQUEST = 'SAVE_ORDER_REQUEST';
export function  saveOrderRequest(id, username, actionType){
    return {type: SAVE_ORDER_REQUEST,id, username, actionType};
}
export  const SAVE_ORDER_SUCCEEDED = 'SAVE_ORDER_SUCCEEDED';
export function saveOrderSucceeded() {
    return {type: SAVE_ORDER_SUCCEEDED};
}
export const FETCH_ORDERS_REQUESTED = 'FETCH_ORDERS_REQUESTED';
export function requestOrders(fname,fvalue,current,userId) {
    return {type: FETCH_ORDERS_REQUESTED,fname,fvalue,current,userId};
}

export const FETCH_ORDERS_SUCCEEDED = 'FETCH_ORDERS_SUCCEEDED';
export function requestOrdersSucceeded(result, size, total, current) {
    return {type: FETCH_ORDERS_SUCCEEDED,result, size, total, current};
}

export const SAVE_ORDER_REQUEST = 'SAVE_ORDER_REQUEST';
export function  saveOrderRequest(currency,value,username,productName,actionType){
    return {type: SAVE_ORDER_REQUEST,currency,value,username,productName,actionType};
}
export  const SAVE_ORDER_SUCCEEDED = 'SAVE_ORDER_SUCCEEDED';
export function saveOrderSucceeded() {
    return {type: SAVE_ORDER_SUCCEEDED};
}
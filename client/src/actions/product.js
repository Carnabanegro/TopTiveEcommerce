export const FETCH_PRODUCTS_REQUESTED = 'FETCH_PRODUCTS_REQUESTED';
export function requestProducts(fname,fvalue,current,userId,myProducts) {
    return {type: FETCH_PRODUCTS_REQUESTED,fname,fvalue,current,userId,myProducts};
}

export const FETCH_PRODUCTS_SUCCEEDED = 'FETCH_PRODUCTS_SUCCEEDED';
export function requestProductsSucceeded(result, size, total, current) {
    return {type: FETCH_PRODUCTS_SUCCEEDED,result, size, total, current};
}

export const SAVE_PRODUCT_REQUEST = 'SAVE_PRODUCT_REQUEST';
export function  saveProductRequest(name,currency,value,descrip,username,actionType){
    return {type: SAVE_PRODUCT_REQUEST,name,currency,value,descrip,username,actionType};
}
export  const SAVE_PRODUCT_SUCCEEDED = 'SAVE_PRODUCT_SUCCEEDED';
export function saveProductSucceeded() {
    return {type: SAVE_PRODUCT_SUCCEEDED};
}
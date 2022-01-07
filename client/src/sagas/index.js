import {all, takeEvery} from 'redux-saga/effects';
import {FETCH_LOGIN_REQUESTED} from '../actions/login';
import {fetchLoginRequested} from './login';
import {FETCH_PRODUCTS_REQUESTED, SAVE_PRODUCT_REQUEST} from "../actions/product";
import {fetchProducts, saveProductRequested} from "./product";
import {FETCH_ORDERS_REQUESTED, SAVE_ORDER_REQUEST} from "../actions/order";
import {fetchOrders, saveOrderRequested} from "./order";
import {FETCH_REGISTER_REQUESTED} from "../actions/user";
import {fetchRegisterRequested} from "./user";


export default function* root() {
    yield all([

        //login
        takeEvery(FETCH_LOGIN_REQUESTED, fetchLoginRequested),
        takeEvery(FETCH_REGISTER_REQUESTED, fetchRegisterRequested),

        //products
        takeEvery(FETCH_PRODUCTS_REQUESTED, fetchProducts),
        takeEvery(SAVE_PRODUCT_REQUEST, saveProductRequested),

        //orders
        takeEvery(FETCH_ORDERS_REQUESTED, fetchOrders),
        takeEvery(SAVE_ORDER_REQUEST, saveOrderRequested)
    ]);
}
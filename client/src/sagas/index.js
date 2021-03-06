import {all, takeEvery} from 'redux-saga/effects';
import {FETCH_LOGIN_REQUESTED} from '../actions/login';
import {fetchLoginRequested} from './login';
import {FETCH_PRODUCTS_REQUESTED, SAVE_PRODUCT_REQUEST} from "../actions/product";
import {fetchProducts, saveProductRequested} from "./product";
import {FETCH_ORDERS_REQUESTED, SAVE_ORDER_REQUEST} from "../actions/order";
import {fetchOrders, saveOrderRequested,fetchOrdersWithLiquidation} from "./order";
import {ACTIVATE_ACCOUNT_REQUESTED, FETCH_REGISTER_REQUESTED, RESEND_MAIL_REQUESTED} from "../actions/user";
import {activateAccountRequested, fetchRegisterRequested, resendMailRequested} from "./user";
import {FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED} from "../actions/statistics";


export default function* root() {
    yield all([

        //login
        takeEvery(FETCH_LOGIN_REQUESTED, fetchLoginRequested),
        takeEvery(FETCH_REGISTER_REQUESTED, fetchRegisterRequested),
        takeEvery(ACTIVATE_ACCOUNT_REQUESTED, activateAccountRequested),
        takeEvery(RESEND_MAIL_REQUESTED, resendMailRequested),

        //products
        takeEvery(FETCH_PRODUCTS_REQUESTED, fetchProducts),
        takeEvery(SAVE_PRODUCT_REQUEST, saveProductRequested),

        //orders
        takeEvery(FETCH_ORDERS_REQUESTED, fetchOrders),
        takeEvery(FETCH_ORDERS_WITH_LIQUIDATION_REQUESTED, fetchOrdersWithLiquidation),
        takeEvery(SAVE_ORDER_REQUEST, saveOrderRequested)
    ]);
}
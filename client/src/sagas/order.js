import {call, put, select} from "redux-saga/effects";
import {anErrorOccurred, clearError} from "../actions";
import OrderService from "../services/order";
import {requestOrdersSucceeded, saveOrderSucceeded} from "../actions/order";
import {addSucceeded, requestAdd} from "../actions/abmStatus";
import {requestOrdersWithLiquidationSucceeded} from "../actions/statistics";

export function* fetchOrders({fname,fvalue,current,userId}){
    yield put(clearError());
    try {
        const token = yield select(state => state.session.token);
        console.log(token)
        const {result, size, total,page, error} = yield call(OrderService.fetch,fname,fvalue, current,userId,token);
        if (error){
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "order"}));
        }else{
            yield put(requestOrdersSucceeded(result,size,total,page));
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err, sagaName: "order"}));
    }
}

export function* fetchOrdersWithLiquidation({fname,fvalue,current,userId,token,actionType}){
    yield put(clearError());
    try {
        const {result, size, total,page,liquidation, error} = yield call(OrderService.fetch,fname,fvalue, current,userId,token,actionType);
        if (error){
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "order"}));
        }else{
            yield put(requestOrdersWithLiquidationSucceeded(result,size,total,page,liquidation));
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err, sagaName: "order"}));
    }
}

export function* saveOrderRequested({id, username, actionType}){
    yield put(clearError());
    try {
        yield put(requestAdd());
        const token = yield select(state => state.session.token);
        if (actionType === "save"){
            const {result,error} = yield  call(OrderService.save,id,username,token)
            if (error){
                yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "order"}))
            }else{
                yield put(saveOrderSucceeded(result))
                yield put(addSucceeded());
            }
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de add de orden de compra', sagaName: "order"}));
    }

}
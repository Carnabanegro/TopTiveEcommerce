import {call, put} from "redux-saga/effects";
import {anErrorOccurred, clearError} from "../actions";
import OrderService from "../services/order";
import {requestOrdersSucceeded,saveOrderSucceeded} from "../actions/order";
import {addSucceeded, requestAdd} from "../actions/abmStatus";

export function* fetchOrders({fname,fvalue,current,userId}){
    yield put(clearError());
    try {
        const {result, size, total, page} = yield call(OrderService.fetch,fname,fvalue, current,userId);
        if (result) {
            yield put(requestOrdersSucceeded(result,size,total,page));
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de fetch de ordenes', sagaName: "order"}));
    }
}

export function* saveOrderRequested({currency,value,username,productName,actionType}){
    yield put(clearError());
    try {
        yield put(requestAdd());
        if (actionType === "save"){
            const order = yield  call(OrderService.save,currency,value,username,productName)
            if (order){
                yield put(saveOrderSucceeded())
                yield put(addSucceeded());
            }
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de add de orden de compra', sagaName: "order"}));
    }

}
import {call, put, select} from "redux-saga/effects";
import {anErrorOccurred, clearError} from "../actions";
import OrderService from "../services/order";
import {requestOrdersSucceeded,saveOrderSucceeded} from "../actions/order";
import {addSucceeded, requestAdd} from "../actions/abmStatus";

export function* fetchOrders({fname,fvalue,current,userId}){
    yield put(clearError());
    try {
        const {result, size, total,page, error} = yield call(OrderService.fetch,fname,fvalue, current,userId);
        if (error){
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "order"}));
        }else{
            yield put(requestOrdersSucceeded(result,size,total,page));
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: err, sagaName: "order"}));
    }
}

export function* saveOrderRequested({currency,value,username,productName,actionType}){
    yield put(clearError());
    try {
        yield put(requestAdd());
        const token = yield select(state => state.session.token);
        if (actionType === "save"){
            const {result,error} = yield  call(OrderService.save,currency,value,username,productName,token)
            if (error){
                anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "order"})
            }else{
                yield put(saveOrderSucceeded(result))
                yield put(addSucceeded());
            }
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de add de orden de compra', sagaName: "order"}));
    }

}
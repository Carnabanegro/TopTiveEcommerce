import {call, put,select} from "redux-saga/effects";
import {anErrorOccurred, clearError} from "../actions";
import ProductService from "../services/product";
import {requestProductsSucceeded, saveProductSucceeded} from "../actions/product";
import {addSucceeded, requestAdd} from "../actions/abmStatus";

export function* fetchProducts({fname,fvalue,current,userId,myProducts}){
    yield put(clearError());
    try {
        const {result, size, total, page, error} = yield call(ProductService.fetch,fname,fvalue, current,userId,myProducts)
        if (error){
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "order"}));
        }else{
            yield put(requestProductsSucceeded(result,size,total,page));
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de fetch de productos', sagaName: "product"}));
    }
}

export function* saveProductRequested({name,currency,value,descrip,username,actionType}){
    yield put(clearError());
    try {
        yield put(requestAdd());
        const token = yield select(state => state.session.token);
        if (actionType === "save"){
            const {product,error} = yield  call(ProductService.save,name,currency,value,descrip,username,token)
            console.log(error)
            if (error){
                yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "product"}))
            }else{
                yield put(saveProductSucceeded())
                yield put(addSucceeded());
            }
        }
    }catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de add de producto', sagaName: "product"}));
    }

}
import {call, put} from "redux-saga/effects";
import {anErrorOccurred, clearError} from "../actions";
import UserService from "../services/user";
import {requestActivateAccountSucceeded, requestRegisterSucceeded, resendMailActivateSucceeded} from "../actions/user";
import {addSucceeded} from "../actions/abmStatus";

export function* fetchRegisterRequested({username, password, firstName,lastName, email, tel}) {
    yield put(clearError())
    try {
        const {message, error} = yield call(UserService.saveUser, username, password, firstName,lastName, email, tel);
        if (error) {
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "user"}))
        }else{
            yield put(requestRegisterSucceeded());
            yield put(addSucceeded(message));
        }
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de Registro', sagaName: "user"}));

    }
}

export function* activateAccountRequested({token}) {
    yield put(clearError())
    try {
        const{message, errorMsg} = yield call(UserService.activateAccount,token);
        if(errorMsg){
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: errorMsg, sagaName: "user"}))
        }else{
            yield put(requestActivateAccountSucceeded())
            yield put(addSucceeded(message))
        }
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Activation error', sagaName: "user"}));
    }
}

export function* resendMailRequested({username,password,mail}) {
    yield put(clearError())
    try{
        const{message, error} = yield call(UserService.resendMailActivate,username,password,mail);
        if (error) {
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "user"}))
        }else{
            yield put(resendMailActivateSucceeded())
            yield put(addSucceeded(message))
        }
    } catch (err){
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Resend Activation error', sagaName: "user"}));
    }
}
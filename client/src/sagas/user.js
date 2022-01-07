import {call, put} from "redux-saga/effects";
import {anErrorOccurred, clearError} from "../actions";
import UserService from "../services/user";
import {requestRegisterSucceeded} from "../actions/user";
import {addSucceeded} from "../actions/abmStatus";

export function* fetchRegisterRequested({username, password, firstName,lastName, email, tel}) {
    yield put(clearError())
    try {
        const {user, error} = yield call(UserService.saveUser, username, password, firstName,lastName, email, tel);
        if (error) {
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "register"}))
        }else{
            yield put(requestRegisterSucceeded());
            yield put(addSucceeded());
        }
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de Registro', sagaName: "register"}));

    }
}
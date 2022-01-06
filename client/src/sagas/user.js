import {call, put} from "redux-saga/effects";
import {anErrorOccurred, clearError} from "../actions";
import UserService from "../services/user";
import {requestRegisterSucceeded} from "../actions/user";
import {addSucceeded} from "../actions/abmStatus";

export function* fetchRegisterRequested({username, password, fullName, email, tel}) {
    yield put(clearError())
    try {
        const user = yield call(UserService.saveUser, username, password, fullName, email, tel);
        if (user) {
            yield put(requestRegisterSucceeded());
            yield put(addSucceeded());
        }
    } catch (err) {
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de Registro', sagaName: "register"}));

    }
}
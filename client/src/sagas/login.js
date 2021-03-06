import {call, put} from 'redux-saga/effects';
import UserService from '../services/user';
import {requestLoginSucceeded} from '../actions/login';
import {anErrorOccurred, clearError, receiveSession} from '../actions';
import User from "../models/user";

export function* fetchLoginRequested({user, password}) {
    yield put(clearError())
    try {
        const {token,error} = yield call(UserService.login, user, password);
        if (error) {
            yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: error, sagaName: "login"}));
        }else{
            const profile = yield call(UserService.decodeToken, token);
            yield put(receiveSession(new User(profile), token));
            yield put(requestLoginSucceeded());
        }
    } catch (err) {
        console.log(err)
        yield put(anErrorOccurred({anErrorOccurred: true, errorMsg: 'Error de inicio de sesion', sagaName: "login"}));
        yield put(receiveSession(new User()));
    }
}


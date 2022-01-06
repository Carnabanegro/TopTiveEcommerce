export const REQUEST_VERIFY_TOKEN = 'REQUEST_VERIFY_TOKEN';
export function requestVerifyToken(token) {
    return {type: REQUEST_VERIFY_TOKEN, token};
}

export const VALID_RECOVER_PASS_TOKEN = 'VALID_RECOVER_PASS_TOKEN';
export function receiveVerifyToken(token, user, role) {
    return {
        type: VALID_RECOVER_PASS_TOKEN, token, user, role
    };
}

export const FETCH_LOGIN_REQUESTED = 'FETCH_LOGIN_REQUESTED';
export function requestLogin(user, password) {
    return {type: FETCH_LOGIN_REQUESTED, user, password};
}

export const FETCH_LOGIN_SUCCEEDED = 'FETCH_LOGIN_SUCCEEDED';
export function requestLoginSucceeded(user, email) {
    return {type: FETCH_LOGIN_SUCCEEDED, user, email};
}
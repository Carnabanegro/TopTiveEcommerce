export const FETCH_REGISTER_REQUESTED = 'FETCH_REGISTER_REQUESTED';

export function requestRegister(username, password, fullName, email, tel) {
    return {type: FETCH_REGISTER_REQUESTED, username, password, fullName, email, tel};
}

export const FETCH_REGISTER_SUCCEEDED = 'FETCH_REGISTER_SUCCEEDED';

export function requestRegisterSucceeded() {
    return {type: FETCH_REGISTER_SUCCEEDED};
}
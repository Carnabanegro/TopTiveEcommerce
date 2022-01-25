export const FETCH_REGISTER_REQUESTED = 'FETCH_REGISTER_REQUESTED';

export function requestRegister(username, password, firstName,lastName, email, tel) {
    return {type: FETCH_REGISTER_REQUESTED, username, password, firstName,lastName, email, tel};
}

export const FETCH_REGISTER_SUCCEEDED = 'FETCH_REGISTER_SUCCEEDED';

export function requestRegisterSucceeded() {
    return {type: FETCH_REGISTER_SUCCEEDED};
}

export const ACTIVATE_ACCOUNT_REQUESTED = 'ACTIVATE_ACCOUNT_REQUESTED';

export function activateAccountRequest(token){
    return {type:ACTIVATE_ACCOUNT_REQUESTED, token}
}

export const ACTIVATE_ACCOUNT_SUCCEEDED = 'ACTIVATE_ACCOUNT_SUCCEEDED';

export  function requestActivateAccountSucceeded(){
    return {type: ACTIVATE_ACCOUNT_SUCCEEDED}
}

export const RESEND_MAIL_REQUESTED = 'RESEND_MAIL_REQUESTED';

export function  resendEmailConfirmationRequest(username,password,mail){
    return {type: RESEND_MAIL_REQUESTED, username,password,mail}
}

export const RESEND_MAIL_SUCCEEDED = 'RESEND_MAIL_SUCCEEDED';

export function resendMailActivateSucceeded(){
    return {type: RESEND_MAIL_SUCCEEDED}
}
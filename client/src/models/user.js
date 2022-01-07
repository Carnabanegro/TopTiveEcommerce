import {isEmpty} from 'lodash';

export default class User {
    jti = '';
    sub = '';
    email = '';
    constructor(obj) {
        Object.assign(this, obj);
    }

    isValid() {
        return !isEmpty(this.jti);
    }

    areValidPassword() {
        return this.password === this.cPassword;
    }

    isValidNewUser() {
        return !isEmpty(this.sub)
            && !isEmpty(this.email)
            && !isEmpty(this.password)
            && !isEmpty(this.tel)
            && !isEmpty(this.ROLE)
            && this.password === this.cPassword;
    }
}

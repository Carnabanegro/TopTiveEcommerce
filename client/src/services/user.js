import decode from 'jwt-decode';
import Http from './http';

const ENDPOINT = '/users';

export default class UserService {

    static login(username, password) {
        let data = {username, password}
        return Http.login(`${ENDPOINT}/login`, data);
    }

    static decodeToken(token) {
        if (token) {
            return decode(token);
        }
        return null;
    }

    static fetch(token) {

        if (token) {
            return Http.get(`${ENDPOINT}/`, token);
        }
        return {
            result: null,
            size: null,
            total: null
        };
    }


    static saveUser(username, password, firstName,lastName, email, tel) {
        const user = {
            username, password, firstName,lastName, email, tel
        };
        return Http.register(`${ENDPOINT}/add`, user);
    }

    static updateUser(token, id, jsUser) {
        return Http.post(`${ENDPOINT}/update/${id}`, jsUser, token);
    }
}
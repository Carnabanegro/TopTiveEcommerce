import decode from 'jwt-decode';
import Http from './http';

const ENDPOINT = '/users';

export default class UserService {
    /* static validate(email, username) {
         return Http.get(`${ENDPOINT}/validate/${email}/${username}`);
     }*/

    static login(username, password) {
        console.log(username)
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
            return Http.getAuth(`${ENDPOINT}/`, token);
        }
        return {
            result: null,
            size: null,
            total: null
        };
    }


    static saveUser(username, password, fullName, email, tel) {
        const user = {
            username, password, fullName, email, tel
        };
        return Http.register(`${ENDPOINT}/add`, user);
    }

    static updateUser(token, id, jsUser) {
        return Http.post(`${ENDPOINT}/update/${id}`, jsUser, token);
    }
}
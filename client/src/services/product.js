import Http from './http';

const ENDPOINT = '/products';

export default class ProductService {

    static fetch(fname, fvalue, current,userId,myProducts) {
        let parameters = '';

        if (fvalue) {
            parameters = `/?fvalue=${fvalue}`;
            if (!fname) {
                parameters += '&fname=name';
            } else {
                parameters += `&fname=${fname}`;
            }
        }
        if (current != null) {
            if (parameters) {
                parameters += `&current=${current}`;
            } else {
                parameters += `/?current=${current}`;
            }
        }
        if (userId != null){
            if (parameters) {
                parameters += `&userId=${userId}`;
            } else {
                parameters += `/?userId=${userId}`;
            }
        }
        if (!myProducts){
            return (Http.get(`${ENDPOINT}${parameters}`));
        }else{
            return (Http.get(`${ENDPOINT}/myProducts${parameters}`));
        }
    }

    static save(name, currency, value, descrip, username,token) {
        const data = {name, currency, value, descrip, username}
        return (Http.post(`${ENDPOINT}/add`, data, token));
    }

}
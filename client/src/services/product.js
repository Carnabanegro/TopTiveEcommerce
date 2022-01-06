import Http from './http';

const ENDPOINT = '/products';

export default class ProductService {

    static fetch(fname, fvalue, current) {
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
        return (Http.get(`${ENDPOINT}${parameters}`));
    }

    static save(name, currency, value, descrip, username) {
        const data = {name, currency, value, descrip, username}
        return (Http.post(`${ENDPOINT}/add`, data));
    }

}
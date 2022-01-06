import Http from './http';

const ENDPOINT = '/orders';

export default class OrderService{

    static fetch(fname,fvalue,current,userId){
        let parameters = '';

        if (fvalue) {
            parameters = `/?fvalue=${fvalue}`;
            if (!fname) {
                parameters += '&fname=name';
            } else {
                parameters += `&fname=${fname}`;
            }
        }
        if (userId != null){
            if (parameters) {
                parameters += `&userId=${userId}`;
            } else {
                parameters += `/?userId=${userId}`;
            }
        }
        if (current != null) {
            if (parameters) {
                parameters += `&current=${current}`;
            } else {
                parameters += `/?current=${current}`;
            }
        }
        console.log(parameters)
        return(Http.get(`${ENDPOINT}${parameters}`));
    }

    static save(currency,value,username,productName){
        const data = {currency,value,username,productName}
        return(Http.post(`${ENDPOINT}/add`,data));
    }

}
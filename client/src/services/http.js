import axios from 'axios';
// Where you would set stuff like your 'Authorization' header, etc ...
//instance.defaults.headers.common['Authorization'] = 'AUTH TOKEN FROM INSTANCE';
export default class Http {
    static async get(url,parameters) {
        return await axios({
            method: "GET",
            url: `http://localhost:8080${url}`,
            query: parameters
        }).then(response => {
            return response.data;
        }).catch(err => {
            console.log(err)
        });
    };

    static async getOne(url,id) {
        return await axios({
            method: "GET",
            url: `http://localhost:8080${url}/${id}`
        }).then(response =>{
            return response.data;
        }).catch(err => {
            console.log(err)
        });
    };

    static async post(url,data,token) {
        return await axios({
                method: 'post',
                url: `http://localhost:8080${url}`,
                data,
                headers: {
                    accessToken: token
                }
            }).then((response) =>{
                return response.data
            }).catch((err) => {
                console.log(err);
            });
    }

    static async login(url,data){
        return await axios({
            method: 'post',
            url: `http://localhost:8080${url}`,
            data
        }).then((response) =>{
            return response.data
        }).catch((err) => {
            console.log(err);
        });
    }

    static async register(url,data) {
        return await axios({
            method: 'post',
            url: `http://localhost:8080${url}`,
            data
        }).then((response) =>{
            return response.data
        }).catch((err) => {
            console.log(err);
        });
    }
}
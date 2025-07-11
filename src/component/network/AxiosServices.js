import axios from 'axios';
import {api_base_url, social_api_base_url} from "../../config/config.js";


let user_data = JSON.parse(localStorage.getItem('userData'));
// console.log(user_data?.idToken)
let requestHeader = {
    'Content-Type': 'application/json',
    'Accept-Language': 'en',
    'Authorization': `Bearer ${user_data?.idToken}`
}

const get = (url, parameter, useSocialApi = false) =>{
    let apiUrl = useSocialApi ? social_api_base_url : api_base_url;
    return axios.get(apiUrl + url, {
        params: parameter,
        headers: requestHeader
    })
}

const post = (url, body) =>{
    let apiUrl = api_base_url;
    return axios.post(apiUrl + url, body, {
        headers: requestHeader
    })
}

const put = (url,body) =>{
    let apiUrl = api_base_url;
    return axios.post(apiUrl + url, body, {
        // body: body,
        headers: requestHeader
    })
}

const remove = (url,body) =>{
    let apiUrl = api_base_url;
    return axios.delete(apiUrl + url, {
        data: body,
        headers: requestHeader
    })
}

const AxiosServices = {
    get,
    post,
    put,
    remove,
};
export default AxiosServices;
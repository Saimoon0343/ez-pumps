import axios from "axios";
import { getItem } from "../persist-storage";

export const BASE_URL = "http://ezpump.webdesignpreviews.com";

export const getToken = async () => {
    return await getItem("token");
}

export const getUser = async () => {
    return await getItem("user").then(user => JSON.parse(user));
}

export const fetchAPI = async (method, api, data, token = null, params = null) => {
    let config = {
        url: `${BASE_URL}/api/${api}`,
        method: method,
        headers:{
            'Content-Type': 'multipart/form-data',
        },
        data,
        params
    }

    if(token) config.headers.Authorization = 'Bearer '+ (await getToken());
    return await axios(config);
}

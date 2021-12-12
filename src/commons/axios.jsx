import _axios from 'axios';

const axios = baseURL => {
    const instance = _axios.create({
        withCredentials: true,
        baseURL: process.env.REACT_APP_SERVER_URL || "http://localhost:3300" ,
        timeout: 10000
    });

    //  baseURL: "http://localhost:3300"
    // || "https://onboardapi.herokuapp.com"

    instance.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    return instance
}

export { axios }

export default axios();
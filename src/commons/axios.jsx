import _axios from 'axios';

const axios = baseURL => {
    const instance = _axios.create({
        withCredentials: true,
        baseURL: "https://onboardapi.herokuapp.com",
        timeout: 10000
    });

    //  baseURL: "http://localhost:3300"

    instance.interceptors.request.use((config) => {
        return config;
    }, (error) => {
        return Promise.reject(error);
    });
    return instance
}

export { axios }

export default axios();
import axios from 'axios'
import store from "../store";

const HttpClient = axios.create();

HttpClient.interceptors.request.use(
    (config: any) => {

        const state = store.getState();
        const token = state.Auth.user.access_token;

        if(token) {
            config.headers['Authorization'] = `Bearer ${token}`;
        }

        return config;
    },
    (error: Error) => {

        return Promise.reject(error);
    }
);

HttpClient.interceptors.response.use(
    (response: any) => {

        return response;
    },
    (error: Error) => {
        const variant = 'error';

        return Promise.reject(error);
    }
);

export default HttpClient;
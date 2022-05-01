import axios from "axios";
import { api_data } from "../secret";

export const api = {

    get: (endpoint) => {
        return new Promise((resolve, reject) => {
            axios.get(api_data.url + endpoint, {
                headers: {
                    Authorization: api_data.token
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    post: (endpoint, params = {}) => {
        return new Promise((resolve, reject) => {
            axios.post(api_data.url + endpoint, {
                params: params,
                headers: {
                    Authorization: api_data.token
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    put: (endpoint, params = {}) => {
        return new Promise((resolve, reject) => {
            axios.put(api_data.url + endpoint, {
                params: params,
                headers: {
                    Authorization: api_data.token
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    patch: (endpoint, params = {}) => {
        return new Promise((resolve, reject) => {
            axios.patch(api_data.url + endpoint, {
                params: params,
                headers: {
                    Authorization: api_data.token
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    },

    delete: (endpoint) => {
        return new Promise((resolve, reject) => {
            axios.delete(api_data.url + endpoint, {
                headers: {
                    Authorization: api_data.token
                }
            })
            .then(response => {
                resolve(response.data);
            })
            .catch(error => {
                reject(error);
            });
        });
    }

}
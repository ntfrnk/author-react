import axios from "axios";
import { api_data } from "../secret";

export const api = {

    setApiData: (data) => {
        const newdata = {
            ...api_data,
            ...data
        }
        return newdata;
    },

    get: (connectData) => {
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            axios.get(apiData.url + apiData.endpoint, {
                headers: {
                    Authorization: apiData.getToken()
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

    post: (connectData, params = {}) => {
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            axios.post(apiData.url + apiData.endpoint, params, {
                headers: {
                    Authorization: apiData.getToken()
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

    put: (connectData, params = {}) => {
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            axios.put(apiData.url + apiData.endpoint, params, {
                headers: {
                    Authorization: apiData.getToken()
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

    patch: (connectData, params = {}) => {
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            axios.patch(apiData.url + apiData.endpoint, params, {
                headers: {
                    Authorization: apiData.getToken()
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

    delete: (connectData) => {
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            axios.delete(apiData.url + apiData.endpoint, {
                headers: {
                    Authorization: apiData.getToken()
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
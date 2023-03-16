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
            try {
                axios.get(apiData.url + apiData.endpoint, {
                    headers: {
                        Authorization: apiData.getToken()
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(() => {
                    reject({status: 401});
                });
            } catch (error) {
                reject({ status: 401 });
            }
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
                if(error.response.code === 401){
                    reject({status: 401})
                }
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
                if (error.response.code === 401) {
                    reject({ status: 401 })
                }
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
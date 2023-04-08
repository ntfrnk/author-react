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
        console.clear();

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
                .catch(error => {
                    reject({status: error.response.status});
                });
            } catch (error) {
                reject({ status: 401 });
            }
        });
    },

    post: (connectData, params = {}) => {
        ////console.clear();
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            try {
                axios.post(apiData.url + apiData.endpoint, params, {
                    headers: {
                        Authorization: apiData.getToken()
                    }
                })
                .then(response => {
                    if(response.data.code !== 422){
                        resolve(response.data);
                    } else {
                        throw response.data;
                    }
                })
                .catch(error => {
                    if(error.code === 422){
                        reject(error);
                    } else {
                        reject({status: error.response.status});
                    }
                });
            } catch (error) {
                reject({status: 401});
            };
        });
    },

    put: (connectData, params = {}) => {
        //console.clear();
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            try {
                axios.put(apiData.url + apiData.endpoint, params, {
                    headers: {
                        Authorization: apiData.getToken()
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject({status: error.response.status});
                });
            } catch (error) {
                reject({ status: 401 });
            }
        });
    },

    patch: (connectData, params = {}) => {
        //console.clear();
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            try {
                axios.patch(apiData.url + apiData.endpoint, params, {
                    headers: {
                        Authorization: apiData.getToken()
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject({status: error.response.status});
                });
            } catch (error) {
                reject({ status: 401 });
            }
        });
    },

    delete: (connectData) => {
        //console.clear();
        const apiData = api.setApiData(connectData);
        return new Promise((resolve, reject) => {
            try {
                axios.delete(apiData.url + apiData.endpoint, {
                    headers: {
                        Authorization: apiData.getToken()
                    }
                })
                .then(response => {
                    resolve(response.data);
                })
                .catch(error => {
                    reject({status: error.response.status});
                });
            } catch (error) {
                reject({ status: 401 });
            }
        });
    }

}
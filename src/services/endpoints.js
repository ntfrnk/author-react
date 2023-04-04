
const endpoints = {

    login: {
        signin: 'login'
    },

    session: {
        check: 'session/check',
        extend: 'session/extend',
    },

    user: {
        index: 'users',
        show: 'users/{id}',
        store: 'users/',
        update: 'users/{id}',
        destroy: 'users/{id}'
    },

    project: {
        index: 'projects/{id}',
        show: 'projects/show/{id}',
        store: 'projects/',
        update: 'projects/{id}',
        destroy: 'projects/{id}'
    },
    
    article: {
        index: 'articles/{id}',
        show: 'articles/show/{id}',
        store: 'articles',
        update: 'articles/{id}',
        destroy: 'articles/{id}'
    }

};

export const setEndpoint = (module, action, id = '', options = {}) => {
    let endpoint = endpoints[module][action];
    if(id.length !== 0){
        endpoint = endpoint.replace('{id}', id);
    }
    if(JSON.stringify(options) !== '{}'){
        let params = [];
        let keys = Object.keys(options);
        for (let i = 0; i < keys.length; i++){
            params.push(`${keys[i]}=${options[keys[i]]}`)
        }
        endpoint += '?' + params.join('&');
    }
    return endpoint;
};

export default setEndpoint;
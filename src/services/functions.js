
const f = {

    getParams: (query) => {
        query = query.replace('?', '');
        let params = query.split('&');
        let newParam = {};
        for(let param of params){
            let [ key, value ] = param.split('=');
            newParam[key] = value;
        }
        return newParam;
    },

    getParam: (query, name) => {
        let params = f.getParams(query);
        return params[name];
    }

};

export default f;
import { api } from "./api.service";

const LoginService = {
    
    userIsLogged: () => {
        return !!localStorage.getItem('token');
    },

    checkToken: () => {
        return api.get({endpoint: 'login/check'});
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

};

export default LoginService;
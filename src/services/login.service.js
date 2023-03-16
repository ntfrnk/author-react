import { api } from "./api.service";

const LoginService = {
    
    userIsLogged: () => {
        return !!localStorage.getItem('token');
    },

    logout: () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }

};

export default LoginService;
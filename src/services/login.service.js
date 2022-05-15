
const LoginService = {
    
    userIsLogged() {
        return !!localStorage.getItem('token');
    },

};

export default LoginService;
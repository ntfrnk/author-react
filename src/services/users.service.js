
export const User = {

    getUser: () => {
        return JSON.parse(localStorage.getItem('user'));
    },

    getId: () => {
        return User.getUser().id;
    },

    getName: () => {
        return User.getUser().name;
    },

    getLastname: () => {
        return User.getUser().lastname;
    },

    getEmail: () => {
        return User.getUser().email;
    },

    getRole: () => {
        return User.getUser().role;
    }

}


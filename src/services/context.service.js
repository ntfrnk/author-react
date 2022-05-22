import { createContext, useState } from 'react';

export const LoginContext = createContext();
export const LoadingContext = createContext();

export const LoginProvider = ({ children }) => {
    
    const [login, setLogin] = useState(Boolean(localStorage.getItem('token')));

    const logout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
    }
    
    return (
        <LoginContext.Provider value={{ login, setLogin, logout }}>
            { children }
        </LoginContext.Provider>
    );

}

export const LoadingProvider = ({ children }) => {

    const [loading, setLoading] = useState(true);

    return (
        <LoadingContext.Provider value={{ loading, setLoading }}>
            { children }
        </LoadingContext.Provider>
    );
}
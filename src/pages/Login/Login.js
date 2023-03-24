import { useRef, useContext, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { api } from '../../services/api.service';
import { setEndpoint } from '../../services/endpoints';
import { LoginContext } from '../../services/context.service';
import f from '../../services/functions';
import './Login.scss';

const Login = () => {

    const { login, setLogin, logout } = useContext(LoginContext);
    const navigate = useNavigate();
    const email = useRef(null);
    const password = useRef(null);
    const { search } = useLocation();

    const process = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        api.post({ endpoint: setEndpoint('login', 'signin') }, {
            email: emailValue,
            password: passwordValue
        }).then(
            response => {
                if(response.code === 200){
                    let user = {
                        id: response.data.id,
                        name: response.data.name,
                        lastname: response.data.lastname,
                        email: response.data.email,
                        role: response.data.role,
                    };
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('user', JSON.stringify(user));
                    setLogin(true);
                    navigate('/');
                }
            }
        );
    }

    const doLogout = () => {
        setLogin(false);
        logout();
    }

    const reason = () => {
        let { reason } = f.getParams(search);
        if(reason !== undefined){
            return reason;
        }
        return false;
    }

    useEffect(() => {
        if(login){
            doLogout();
        }
    }, []);

    return (
        <div className="App form login">
            <div className="box shadow w30">
                { reason() === 'expired' ?
                <div className="form-group error">
                    Tu sesión se expiró por inactividad
                </div>
                : '' }
                <div className="form-group">
                    <label>Correo electrónico:</label>
                    <input type="text" name="email" placeholder="Tu correo electrónico" ref={email} autoComplete="email" />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input type="password" name="password" placeholder="Tu contraseña" ref={password} autoComplete="password" />
                </div>
                <div className="form-group">
                    <button className="btn main solid" onClick={process}>Iniciar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
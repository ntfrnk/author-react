import { useRef, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api.service';
import { LoginContext } from '../../services/context.service';
import './Login.scss';

const Login = () => {

    const { setLogin } = useContext(LoginContext);
    const navigate = useNavigate();
    const email = useRef(null);
    const password = useRef(null);

    const process = () => {
        const emailValue = email.current.value;
        const passwordValue = password.current.value;

        api.post({endpoint: 'login'}, {
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

    return (
        <div className="App form w30">
            <div className="box shadow">
                <div className="form-group">
                    <label>Correo electrónico:</label>
                    <input type="text" name="email" placeholder="Tu correo electrónico" ref={email} />
                </div>
                <div className="form-group">
                    <label>Contraseña:</label>
                    <input type="password" name="password" placeholder="Tu contraseña" ref={password} />
                </div>
                <div className="form-group">
                    <button className="btn main solid" onClick={process}>Iniciar sesión</button>
                </div>
            </div>
        </div>
    );
};

export default Login;
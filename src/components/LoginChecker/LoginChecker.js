import { useEffect } from 'react';
import LoginService from '../../services/login.service';
import { useNavigate } from 'react-router-dom';
import './LoginChecker.scss';

const LoginChecker = () => {

	const navigate = useNavigate();
	const userIsLogged = LoginService.userIsLogged();

	let ruta = window.location.href;
	let segments = ruta.split('/');
	
	const comprobar = () => {
		if(!userIsLogged && !segments.includes('login')) {
			navigate('/login');
		}
	}

	useEffect(() => {
		comprobar();
	}, []);

	return (
		<></>
	);
}

export default LoginChecker;
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api.service';
import { LoadingContext } from '../../services/context.service';

import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';
import Icon from '../../components/Icon/Icon';

import './Users.scss';
import setEndpoint from '../../services/endpoints';

const UserNew = () => {

	const { loading, setLoading } = useContext(LoadingContext);
	const [user, setUser] = useState({name: '', lastname: '', email: '', password: ''});
	const [errors, setErrors] = useState({name: '', lastname: '', email: '', password: ''});

	const navigate = useNavigate();

	const saveUser = () => {
		setLoading(true);
		api.post({ endpoint: setEndpoint('user', 'store') }, user).then(
			response => {
				setLoading(false);
				navigate('/users', { replace: true });
			},
			error => {
				if(error.status === 401){
					navigate('/login?reason=expired');
				}
				setLoading(false);
			}
		);
	}

	const setData = (event) => {
        setUser({
            ...user,
            [event.target.name] : event.target.value
        });
    }

	useEffect(() => {
		setLoading(false);
	}, []);

	return (
		<div className='App'>
			<Heading title="Generar nuevo usuario" back={{ text: 'Volver al listado', url: '/users' }} />
			{ loading ? <Spinner /> : 
            <div className="form content row px15" style={{ justifyContent: 'flex-start' }}>
				<div className="form-group col col-7">
					<label>Nombre:</label>
					<input type="text" name="name" onChange={setData} placeholder="Escribe el/los nombre/s" />
					{ errors.name ? <span className="error">{ errors.name }</span> : '' }
				</div>
				<div className="form-group col col-7">
					<label>Apellido:</label>
					<input type="text" name="lastname" onChange={setData} placeholder="Escribe el/los apellido/s" />
					{ errors.lastname ? <span className="error">{ errors.lastname }</span> : '' }
				</div>
				<div className="form-group col col-7">
					<label>Correo electrónico:</label>
					<input type="email" name="email" onChange={setData} placeholder="Escribe el correo electrónico" />
					{ errors.email ? <span className="error">{ errors.email }</span> : '' }
				</div>
				<div className="form-group col col-7">
					<label>Contraseña:</label>
					<input type="password" name="password" onChange={setData} placeholder="Escribe la contraseña" />
					{ errors.password ? <span className="error">{ errors.password }</span> : '' }
				</div>
				<div className="form-group col col-7">
					<label>Confirmar contraseña:</label>
					<input type="password" name="password_confirmation" onChange={setData} placeholder="Vuelve a escribir la contraseña" />
				</div>
				<div className="form-group col col-7">
					<button onClick={() => saveUser()} className="btn pill solid main">
						Guardar nuevo usuario
						<Icon name="right" size={16} color="#FFF" style={{ marginBottom: '-2px', marginLeft: '5px' }} />
					</button>
				</div>
			</div>
			}
		</div>
	);
}

export default UserNew;
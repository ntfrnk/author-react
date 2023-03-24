import { useContext, useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { api } from '../../services/api.service';
import { LoadingContext } from '../../services/context.service';

import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';
import Icon from '../../components/Icon/Icon';

import './Users.scss';
import setEndpoint from '../../services/endpoints';

const UserEdit = () => {

	const { user_id } = useParams();
	const navigate = useNavigate();

	const { loading, setLoading } = useContext(LoadingContext);
	const [user, setUser] = useState({name: '', lastname: '', email: '', password: ''});
	const [errors, setErrors] = useState({name: '', lastname: '', email: '', password: ''});

	const getUser = () => {
		setLoading(true);
		api.get({ endpoint: setEndpoint('user', 'show', user_id) }).then(
			response => {
				setUser(response.data);
				setLoading(false);
			},
			error => {
				if(error.status === 401){
					navigate('/login?reason=expired');
				}
				setLoading(false);
			}
		);
	}

	const saveUser = () => {
		setLoading(true);
		api.put({ endpoint: setEndpoint('user', 'update', user_id) }, user ).then(
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
		getUser();
	}, []);

	return (
		<div className='App'>
			<Heading title="Editar un usuario" back={{ text: 'Volver al listado', url: '/users' }} />
			{ loading ? <Spinner /> : 
				<div className="form content row px15" style={{ justifyContent: 'flex-start' }}>
					<div className="form-group col col-7">
						<label>Nombre:</label>
						<input type="text" value={ user.name } name="name" onChange={setData} placeholder="Escribe el/los nombre/s" />
						{ errors.name ? <span className="error">{ errors.name }</span> : '' }
					</div>
					<div className="form-group col col-7">
						<label>Apellido:</label>
						<input type="text" value={ user.lastname } name="lastname" onChange={setData} placeholder="Escribe el/los apellido/s" />
						{ errors.lastname ? <span className="error">{ errors.lastname }</span> : '' }
					</div>
					<div className="form-group col col-7">
						<label>Correo electrónico:</label>
						<input type="email" value={ user.email } name="email" onChange={setData} placeholder="Escribe el correo electrónico" />
						{ errors.email ? <span className="error">{ errors.email }</span> : '' }
					</div>
					<div className="form-group col col-7">
						<label>Contraseña:</label>
						<input type="password" name="password" onChange={setData} placeholder="Escribe la contraseña" />
						{ errors.password 
						? <span className="error">{ errors.password }</span> 
						: <span className="help-text">Ingresa una contraseña sólo si deseas cambiar la actual.</span> 
						}
					</div>
					<div className="form-group col col-7">
						<label>Confirmar contraseña:</label>
						<input type="password" name="password_confirmation" onChange={setData} placeholder="Vuelve a escribir la contraseña" />
						<span className="help-text">Repite la contraseña sólo si estás cambiando la actual.</span>
					</div>
					<div className="form-group col col-7">
						<button onClick={() => saveUser()} className="btn pill solid main">
							Guardar cambios
							<Icon name="right" size={16} color="#FFF" style={{ marginBottom: '-2px', marginLeft: '5px' }} />
						</button>
					</div>
				</div>
			}
		</div>
	);
}

export default UserEdit;
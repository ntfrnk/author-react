import { useContext, useState, useEffect } from 'react';
import { LoadingContext } from '../../services/context.service';
import { api } from '../../services/api.service';

import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';
import CardUser from '../../components/CardUser/CardUser';
import Empty from '../../components/Empty/Empty';
import Alert from '../../components/Alert/Alert';

import './Users.scss';

const Users = () => {

	const [users, setUsers] = useState([]);
	const [deleted, setDeleted] = useState(false);
	const { loading, setLoading } = useContext(LoadingContext);

	const getUsers = () => {
		setLoading(true);
		api.get({endpoint: 'users'}).then(
			response => {
				setUsers(response.data);
				setLoading(false);
			}
		);
	}

	const deleteUser = (id) => {
		setLoading(true);
		api.delete({endpoint: 'user/' + id}).then(
			response => {
				getUsers();
				setDeleted(true);
				setTimeout(() => {
					setDeleted(false);
				}, 5000);
			}
		);
	}

	useEffect(() => {
		getUsers();
	}, []);

	return (
		<div className='App'>
			<Heading title="Usuarios en el sistema" new={{ text: 'Nuevo usuario', url: '/user/new' }} />
			{ deleted ? <Alert text="El usuario fue eliminado correctamente." type="success" callback={setDeleted} /> : '' }
			{ 
			loading 
			? <Spinner /> 
			: <div className="row contr content">
				{ 
				users.length > 0 ?
				users.map(
					user => (
						<div className="col col-3 stretch-parent" key={user.id}>
							<CardUser item={user} deleteItem={deleteUser} />
						</div>
					)
				) :
				<Empty 
					text="Aún no hay usuarios en el sistema" 
					feedback="¿Te parece si empezamos con uno?" 
					link={'/user/new'} 
				/>
				}
			</div>
			}
		</div>
	);
}

export default Users;
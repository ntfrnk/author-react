import { useContext, useState, useEffect } from 'react';
import { LoadingContext } from '../../services/context.service';
import { api } from '../../services/api.service';
import { setEndpoint } from '../../services/endpoints';
import { useNavigate } from 'react-router-dom';

import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';
import CardUser from '../../components/CardUser/CardUser';
import Empty from '../../components/Empty/Empty';
import Alert from '../../components/Alert/Alert';

import Swal from 'sweetalert2';

import './Users.scss';

const Users = () => {

	const navigate = useNavigate();
	const [ users, setUsers ] = useState([]);
	const [ deleted, setDeleted ] = useState(false);
	const { loading, setLoading } = useContext(LoadingContext);

	const getUsers = () => {
		setLoading(true);
		api.get({endpoint: setEndpoint('user', 'index')}).then(
			response => {
				setUsers(response.data);
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

	const deleteUser = (id) => {

		const MySwal = Swal.mixin({
			customClass: {
				confirmButton: 'btn second solid',
				cancelButton: 'btn main outline'
			},
			buttonsStyling: true
		});

		MySwal.fire({
			title: '¿Estás seguro?',
			html: 'Al eliminar este usuario también se borrarán sus proyectos y escritos.',
			confirmButtonText: 'Ok, eliminar igual.',
			showCancelButton: true,
			cancelButtonText: 'No, entonces no',
		}).then((result) => {
			if (result.isConfirmed) {
				setLoading(true);
				api.delete({ endpoint: setEndpoint('user', 'destroy', id) }).then(
					response => {
						getUsers();
						setDeleted(true);
						setTimeout(() => {
							setDeleted(false);
						}, 5000);
					},
					error => {
						if(error.status === 401){
							navigate('/login?reason=expired');
						}
						setLoading(false);
					}
				);
			}
		});

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
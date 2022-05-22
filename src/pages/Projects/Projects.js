import { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { api } from '../../services/api.service';
import { LoadingContext } from '../../services/context.service';
import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import Card from '../../components/Card/Card';
import './Projects.scss';

import Swal from 'sweetalert2';

const Projects = () => {

	const [projects, setProjects] = useState([]);
	const [deleted, setDeleted] = useState(false);
	const { loading, setLoading } = useContext(LoadingContext);

	const navigate = useNavigate();

	const getProjects = () => {
		setLoading(true);
		let options = {
			'ordering': 'name,asc'
		}
		api.get({ endpoint: 'projects/3?params=' + JSON.stringify(options) }).then(
			response => {
				if(response.code === 200){
					setProjects(response.data);
					setLoading(false);
				} else {
					navigate('/login');
				}
			},
			error => {
				navigate('/login');
			}
		);
	}

	const deleteProject = (id) => {

		const MySwal = Swal.mixin({
			customClass: {
				confirmButton: 'btn second solid',
				cancelButton: 'btn main outline'
			},
			buttonsStyling: true
		});

		MySwal.fire({
			title: '¿Estás seguro?',
			html: 'Si eliminas este proyecto, se eliminarán todos los artículos asociados.',
			confirmButtonText: 'Ok, eliminar igual.',
			showCancelButton: true,
			cancelButtonText: 'No, entonces no',
		}).then((result) => {
			if (result.isConfirmed) {
				setLoading(true);
				api.delete({ endpoint: 'project/' + id }).then(
					response => {
						getProjects();
						setDeleted(true);
					}
				);
			}
		});

	}

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className="App">
			<Heading title="Mis proyectos literarios" new={{ text: 'Nuevo proyecto', url: '/project/new' }} />
			{deleted ? <Alert text="El proyecto fue eliminado correctamente." type="success" callback={setDeleted} /> : ''}
			{loading ? <Spinner /> : null}
			{!loading ? <div className="row contr content">
				{projects.map(
					project => (
						<div className="col col-3 stretch-parent" key={project.id}>
							<Card item={project} type="project" deleteItem={deleteProject} />
						</div>
					)
				)}
			</div> : null}
		</div>
	);
};

export default Projects;
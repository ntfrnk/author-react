import { useState, useEffect, useContext } from 'react';
import { api } from '../../services/api.service';
import { LoadingContext } from '../../services/context.service';
import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';
import Alert from '../../components/Alert/Alert';
import Card from '../../components/Card/Card';
import './Projects.scss';

const Projects = () => {

	const [projects, setProjects] = useState([]);
	const [deleted, setDeleted] = useState(false);
	const { loading, setLoading } = useContext(LoadingContext);

	const getProjects = () => {
		setLoading(true);
		api.get({endpoint: 'projects/3'}).then(
			response => {
				setProjects(response.projects);
				setLoading(false);
			}
		);
	}

	const deleteProject = (id) => {
		setLoading(true);
		api.delete({endpoint: 'project/' + id}).then(
			response => {
				getProjects();
				setDeleted(true);
			}
		);
	}

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className="App">
			<Heading title="Mis proyectos literarios" new={{ text: 'Nuevo proyecto', url: '/projects/new' }} />
			{ deleted ? <Alert text="El proyecto fue eliminado correctamente." type="success" callback={setDeleted} /> : '' }
			{ loading ? <Spinner /> : null }
			<div className="row contr content">
				{ projects.map(
					project => (
						<div className="col col-3 stretch-parent" key={project.id}>
							<Card item={project} type="project" deleteProject={deleteProject} />
						</div>
					)
				) }
			</div>
		</div>
	);
};

export default Projects;
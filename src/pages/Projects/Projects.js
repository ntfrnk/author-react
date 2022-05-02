import { useState, useEffect, useContext } from 'react';
import { api } from '../../services/api.service';
import { LoadingContext } from '../../services/context.service';
import Heading from '../../components/Heading/Heading';
import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Card/Card';
import './Projects.scss';

const Projects = () => {

	const [projects, setProjects] = useState([]);
	const { loading, setLoading } = useContext(LoadingContext);

	const getProjects = () => {
		setLoading(true);
		api.get('projects/3').then(
			response => {
				setProjects(response.projects);
				setLoading(false);
			}
		);
	}

	useEffect(() => {
		getProjects();
	}, []);

	return (
		<div className="App">
			<Heading title="Mis proyectos literarios" new={{ text: 'Nuevo proyecto', url: '/projects/new' }} />
			{ loading ? <Spinner /> : null }
			<div className="row contr">
				{ projects.map(
					project => (
						<div className="col col-3 stretch-parent" key={project.id}>
							<Card item={project} type="project" />
						</div>
					)
				) }
			</div>
		</div>
	);
};

export default Projects;
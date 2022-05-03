import { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { LoadingContext } from '../../services/context.service';
import { api } from '../../services/api.service';
import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import Empty from '../../components/Empty/Empty';
import './Articles.scss';

const Articles = () => {

    const { project_id } = useParams();

    const [articles, setArticles] = useState([]);
    const [project, setProject] = useState({name: '...'});

	const { loading, setLoading } = useContext(LoadingContext);

    const getProject = () => {
        api.get({endpoint: 'project/' + project_id}).then(
            response => {
                setProject(response.project);
            }
        );
    }

	const getArticles = () => {
		setLoading(true);
		api.get({endpoint: 'articles/' + project_id}).then(
			response => {
				setArticles(response.articles);
				setLoading(false);
			}
		);
	}

	useEffect(() => {
        getProject();
		getArticles();
	}, []);

    return (
        <div className="App">
            <Heading 
                title={ project.name } 
                back={{ text: 'Volver a proyectos', url: '/' }} 
                new={{ text: 'Nueva nota', url: '/articles/new/' + project.id }} 
            />
			{ 
			loading 
			? <Spinner /> 
			: <div className="row contr content">
				{ 
				articles.length > 0 ?
				articles.map(
					article => (
						<div className="col col-3 stretch-parent" key={article.id}>
							<Card item={article} type="article" />
						</div>
					)
				) :
				<Empty text="Aún no hay notas cargadas en este proyecto" feedback="¿Qué te parece si empezamos con una?" link={'/articles/new/' + project.id} />
				}
			</div>
			}
		</div>
    );
};

export default Articles;
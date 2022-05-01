import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { api } from '../../services/api.service';
import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import './Articles.scss';

const Articles = () => {

    const { project_id } = useParams();

    const [articles, setArticles] = useState([]);
    const [project, setProject] = useState({});

    const getProject = () => {
        api.get('project/' + project_id).then(
            response => {
                setProject(response.project);
            }
        );
    }

	const getArticles = () => {
		api.get('articles/' + project_id).then(
			response => {
				setArticles(response.articles);
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
			<div className="row contr">
				{ articles.map(
					article => (
						<div className="col col-3 stretch-parent" key={article.id}>
							<Card item={article} type="article" />
						</div>
					)
				) }
			</div>
		</div>
    );
};

export default Articles;
import { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { LoadingContext } from '../../services/context.service';
import { api } from '../../services/api.service';
import { setEndpoint } from '../../services/endpoints';

import Spinner from '../../components/Spinner/Spinner';
import Card from '../../components/Card/Card';
import Heading from '../../components/Heading/Heading';
import Empty from '../../components/Empty/Empty';
import Alert from '../../components/Alert/Alert';

import Swal from 'sweetalert2';

import './Articles.scss';

const Articles = () => {

    const { project_id } = useParams();

    const [articles, setArticles] = useState([]);
	const [deleted, setDeleted] = useState(false);
    const [project, setProject] = useState({name: '...'});

	const { loading, setLoading } = useContext(LoadingContext);

	const navigate = useNavigate();

    const getProject = () => {
		api.get({ endpoint: setEndpoint('project', 'show', project_id) }).then(
            response => {
                setProject(response.data);
			},
			error => {
				if(error.status === 401){
					navigate('/login?reason=expired');
				}
				setLoading(false);
			}
        );
    }

	let options = {
		ordering: 'id,asc',
		take: 50
	}

	const getArticles = () => {
		setLoading(true);
		api.get({ endpoint: setEndpoint('article', 'index', project_id, options) }).then(
			res => {
				setArticles(res.data);
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

	const deleteArticle = (id) => {

		const MySwal = Swal.mixin({
			customClass: {
				confirmButton: 'btn second solid',
				cancelButton: 'btn main outline'
			},
			buttonsStyling: true
		});

		MySwal.fire({
			title: '¿Estás seguro?',
			html: 'Al eliminar este artículo no podrás volver a recuperarlo.',
			confirmButtonText: 'Ok, eliminar igual.',
			showCancelButton: true,
			cancelButtonText: 'No, entonces no',
		}).then((result) => {
			if (result.isConfirmed) {
				setLoading(true);
				api.delete({endpoint: setEndpoint('article', 'destroy', id)}).then(
					response => {
						getArticles();
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
		getProject();
		getArticles();
	}, []);

    return (
        <div className="App">
            <Heading 
                title={ project.name } 
                back={{ text: 'Volver a proyectos', url: '/' }} 
                new={{ text: 'Nuevo escrito', url: '/article/new/' + project.id }} 
            />
			{ deleted ? <Alert text="El artículo fue eliminado correctamente." type="success" callback={setDeleted} /> : '' }
			{ 
			loading 
			? <Spinner /> 
			: <div className="row contr content">
				{ 
				articles.length > 0 ?
				articles.map(
					article => (
						<div className="col col-3 stretch-parent" key={article.id}>
							<Card item={article} type="article" deleteItem={deleteArticle} />
						</div>
					)
				) :
				<Empty 
					text="Aún no hay escritos cargados en este proyecto" 
					feedback="¿Te parece si empezamos con uno?" 
					link={'/article/new/' + project.id} 
				/>
				}
			</div>
			}
		</div>
    );
};

export default Articles;
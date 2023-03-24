import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";
import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import setEndpoint from "../../services/endpoints";

const ArticleShow = () => {

    const { article_id } = useParams();
    const navigate = useNavigate();
    const { loading, setLoading } = useContext(LoadingContext);

    const [article, setArticle] = useState({});

    useEffect(() => {
        setLoading(true);
        api.get({endpoint: setEndpoint('article', 'show', article_id)}).then(
            response => {
                setArticle(response.data);
                setLoading(false);
            },
			error => {
				if(error.status === 401){
					navigate('/login?reason=expired');
					setLoading(false);
				}
			}
        );
    }, [article_id]);

    return (
        <div className="App">
            <Heading 
                title={ article.title } 
                back={{ text: 'Volver al listado', url: '/articles/' + article.project_id }} 
                edit={{ text: 'Editar', url: '/article/edit/' + article.id }}
            />
            { loading ? <Spinner /> : null }
            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
        </div>
    );
}

export default ArticleShow;
import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";
import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";

const ArticleShow = () => {

    const { article_id } = useParams();
    const { loading, setLoading } = useContext(LoadingContext);

    const [article, setArticle] = useState({});

    useEffect(() => {
        setLoading(true);
        api.get({endpoint: 'article/' + article_id}).then(
            response => {
                setArticle(response.article);
                setLoading(false);
            }
        );
    }, [article_id]);

    return (
        <div className="App">
            <Heading 
                title={ article.title } 
                back={{ text: 'Volver al listado', url: '/articles/' + article.project_id }} 
            />
            { loading ? <Spinner /> : null }
            <div className="container">
                <div dangerouslySetInnerHTML={{ __html: article.content }}></div>
            </div>
        </div>
    );
}

export default ArticleShow;
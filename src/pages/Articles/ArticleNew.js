import { useState, useContext, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";
import { User } from '../../services/users.service';

import { Editor } from '@tinymce/tinymce-react';

import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import Icon from "../../components/Icon/Icon";

const ArticleNew = () => {

    const editorRef = useRef(null);
	const navigate = useNavigate();
    const { project_id } = useParams();

	const { loading, setLoading } = useContext(LoadingContext);
	const [ article, setArticle ] = useState({title: '', content: ''});
	const [ errors, setErrors ] = useState({title: '', content: ''});

	const saveArticle = (exit = false) => {
		if (editorRef.current) {
			let article_params = {
				...article,
				content: editorRef.current.getContent(),
				user_id: User.getId(),
				project_id: project_id
			}
			api.post({endpoint: 'article'}, article_params).then(
				response => {
					if(exit){
						navigate('/articles/' + project_id, { replace: true });
					} else {
						navigate('/article/edit/' + response.data.id, { replace: true });
					}
				},
				error => {
					setErrors(error.response.data.errors);
					setLoading(false);
				}
			);
		}
	}

	const setData = (event) => {
        setArticle({
            ...article,
            [event.target.name] : event.target.value
        });
    }

	useEffect(() => {
		setLoading(false);
	});

    return (
        <div className="App container">
            <Heading 
                title="Nuevo escrito" 
                back={{ text: 'Volver al listado', url: '/articles/' + project_id }} 
            />
            { loading ? <Spinner /> : 
            <div className="form content">
				<div className="form-group">
					<label>Título del escrito:</label>
					<input type="text" name="title" onChange={setData} placeholder="Escribe el título para tu escrito" />
					{ errors.title ? <span className="error">{ errors.title }</span> : null }
				</div>
				<div className="form-group">
					<label>Descripción:</label>
					<Editor
					 	apiKey='jh5k1buuga6eygwgzc5nrc6y6g6p60pk16njlqq12y8w3tt4'
						onInit={(evt, editor) => editorRef.current = editor}
						initialValue="<p></p>"
						init={{
						height: 500,
						menubar: false,
						plugins: [
							'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
							'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
							'insertdatetime', 'media', 'table', 'preview', 'wordcount'
						],
						toolbar: 'code | cut copy paste | bold italic underline | link anchor | bullist numlist blockquote | blocks | fullscreen removeformat',
						content_style: 'body { font-family: Bitter; font-size: 16px }'
						}}
					/>
				</div>
				<div className="form-group">
					<button onClick={() => saveArticle()} className="btn pill solid main mr10">
						Guardar y continuar
					</button>
					<button onClick={() => saveArticle(true)} className="btn pill solid main">
						Guardar y salir
						<Icon name="right" size={16} color="#FFF" style={{ marginBottom: '-2px', marginLeft: '5px' }} />
					</button>
				</div>
			</div>
			}
        </div>
    );
}

export default ArticleNew;
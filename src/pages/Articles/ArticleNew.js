import { useState, useContext, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";
import { User } from '../../services/users.service';

import { Editor } from '@tinymce/tinymce-react';

import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import Icon from "../../components/Icon/Icon";
import { setEndpoint } from "../../services/endpoints";

const ArticleNew = () => {

    const editorRef = useRef(null);
    const titleRef = useRef(null);
	const navigate = useNavigate();
    const { project_id } = useParams();

	const { loading, setLoading } = useContext(LoadingContext);
	const [ errors ] = useState({title: '', content: ''});

	const saveArticle = (exit = false) => {
		if (editorRef.current) {
			let article_params = {
				title: titleRef.current.value,
				content: editorRef.current.getContent(),
				user_id: User.getId(),
				project_id: project_id
			}

			console.log(article_params);

			api.post({endpoint: setEndpoint('article', 'store')}, article_params).then(
				response => {
					console.log(response);
					if(exit){
						navigate('/articles/' + project_id, { replace: true });
					} else {
						navigate('/article/edit/' + response.data.id, { replace: true });
					}
				},
				error => {
					if(error.status === 401){
						navigate('/login?reason=expired');
					}
					setLoading(false);
				}
			);
		}
	}

	useEffect(() => {
		api.get({endpoint: setEndpoint('session', 'check')}).then(
			response => {
				if(response.status === 401){
					navigate('/login?reason=expired');
				}
			},
			error => {
				if(error.status === 401){
					navigate('/login?reason=expired');
				}
			}
		);
		setLoading(false);
	}, []);

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
					<input type="text" name="title" ref={titleRef} placeholder="Escribe el título para tu escrito" />
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
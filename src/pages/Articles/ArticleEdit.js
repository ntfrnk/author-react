import { useState, useContext, useRef, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";

import { Editor } from '@tinymce/tinymce-react';

import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import Icon from "../../components/Icon/Icon";
import setEndpoint from "../../services/endpoints";

const ArticleEdit = () => {

    const editorRef = useRef(null);
    const titleRef = useRef(null);
	const navigate = useNavigate();
    const { article_id } = useParams();

	const { loading, setLoading } = useContext(LoadingContext);
	const [article, setArticle] = useState({ id: 0, title: '', content: '<p>Cargando texto...</p>', words: 0, chars: 0});
	const [ errors ] = useState({title: '', content: ''});

	const saveArticle = (exit = false) => {
		if (editorRef.current) {
			let article_params = {
				title: titleRef.current.value,
				content: editorRef.current.getContent(),
				words: article.words,
				chars: article.chars
			}
			api.put({endpoint: setEndpoint('article', 'update', article_id)}, article_params).then(
				response => {
					if(exit){
						navigate('/articles/' + article.project_id, { replace: true });
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

    const getArticle = useCallback(() => {
        setLoading(true);
        api.get({endpoint: setEndpoint('article', 'show', article_id)}).then(
            response => {
				const data = response.data;
				setArticle({...article, ...data});
				titleRef.current.value = data.title;
				editorRef.current = data.content;
                setLoading(false);
            },
			error => {
				if(error.status === 401){
					navigate('/login?reason=expired');
				}
				setLoading(false);
			}
        );
    });

	function handleEditorChange(content, editor) {
		setArticle({
			...article,
			words: editor.plugins.wordcount.getCount(),
			chars: editor.getContent().replace(/<[^>]*>?/gm, '').length
		});
	}

	useEffect(() => {
        getArticle();
        setLoading(false);
	}, []);

    return (
        <div className="App container">
            <Heading 
                title="Editar escrito" 
                back={{ text: 'Volver al listado', url: '/articles/' + article.project_id }} 
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
						onEditorChange={handleEditorChange}
						initialValue={article.content}
						init={{
						entity_encoding: 'raw',
						height: 600,
						menubar: false,
						plugins: [
							'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
							'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
							'insertdatetime', 'media', 'table', 'preview', 'wordcount'
						],
						toolbar: 'code | cut copy paste | bold italic underline | link anchor | bullist numlist blockquote | blocks | fullscreen removeformat',
							content_style: 'body { font-family: "Georgia"; font-size: 20px }'
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

export default ArticleEdit;
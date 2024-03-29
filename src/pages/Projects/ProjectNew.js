import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";
import { setEndpoint } from '../../services/endpoints';
import { User } from "../../services/users.service";

import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import Icon from "../../components/Icon/Icon";

import { Editor } from '@tinymce/tinymce-react';

import './Projects.scss';

const ProjectNew = () => {

	const editorRef = useRef(null);
	const nameRef = useRef(null);
	const navigate = useNavigate();

	const { loading, setLoading } = useContext(LoadingContext);
	const [ project, setProject ] = useState({});
	const [errors, setErrors] = useState({name: '', description: ''});

	const saveProject = (exit = false) => {
		if (editorRef.current) {
			let project_params = {
				name: nameRef.current.value,
				description: editorRef.current.getContent(),
				user_id: User.getId()
			}
			api.post({ endpoint: setEndpoint('project', 'store')}, project_params).then(
				response => {
					console.log('resp');
					console.log(response);
					if(exit){
						navigate('/', { replace: true });
					} else {
						navigate('/project/edit/' + response.data.id, { replace: true });
					}
				},
				error => {
					console.log('error');
					if(error.status === 401){
						navigate('/login?reason=expired');
					}
					if(error.status === 422){
						console.log(error);
					}
					setLoading(false);
				}
			);
		}
	}

	useEffect(() => {
		setLoading(false);
	});

    return (
        <div className="App container">
			<Heading title="Nuevo proyecto" back={{ text: 'Volver a proyectos', url: '/' }} />
			{ loading ? <Spinner /> : 
			<div className="form content">
				<div className="form-group">
					<label>Nombre del proyecto:</label>
					<input type="text" name="name" ref={nameRef} placeholder="Escribe aquí el nombre del proyecto" />
					{ errors.name ? <span className="error">{ errors.name }</span> : null }
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
						content_style: 'body { font-family: Bitter; font-size: 16px }',
						/*skin: "oxide-dark",
						content_css: "dark"*/
						}}
					/>
				</div>
				<div className="form-group">
					<button onClick={() => saveProject()} className="btn pill solid main mr10">
						Guardar y continuar
					</button>
					<button onClick={() => saveProject(true)} className="btn pill solid main">
						Guardar y salir
						<Icon name="right" size={16} color="#FFF" style={{ marginBottom: '-2px', marginLeft: '5px' }} />
					</button>
				</div>
			</div>
			}
		</div>
    );
}

export default ProjectNew;
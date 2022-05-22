import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";
import { User } from "../../services/users.service";

import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import Icon from "../../components/Icon/Icon";

import { Editor } from '@tinymce/tinymce-react';

import './Projects.scss';

const ProjectNew = () => {

	const editorRef = useRef(null);
	const navigate = useNavigate();

	const { loading, setLoading } = useContext(LoadingContext);
	const [ project, setProject ] = useState({});
	const [errors, setErrors] = useState({name: '', description: ''});

	const saveProject = (exit = false) => {
		if (editorRef.current) {
			let project_params = {
				...project,
				description: editorRef.current.getContent(),
				user_id: User.getId()
			}
			api.post({endpoint: 'project'}, project_params).then(
				response => {
					if(exit){
						navigate('/', { replace: true });
					} else {
						navigate('/project/edit/' + response.data.id, { replace: true });
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
        setProject({
            ...project,
            [event.target.name] : event.target.value
        });
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
					<input type="text" name="name" onChange={setData} placeholder="Escribe aquí el nombre del proyecto" />
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
						content_style: 'body { font-family: Bitter; font-size: 16px }'
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
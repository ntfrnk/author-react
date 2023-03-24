import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import { LoadingContext } from "../../services/context.service";
import { api } from "../../services/api.service";
import { setEndpoint } from '../../services/endpoints';

import Heading from "../../components/Heading/Heading";
import Spinner from "../../components/Spinner/Spinner";
import Icon from "../../components/Icon/Icon";

import { Editor } from '@tinymce/tinymce-react';
import './Projects.scss';

const ProjectEdit = () => {

	const editorRef = useRef(null);
	const navigate = useNavigate();
	const { project_id } = useParams();

	const { loading, setLoading } = useContext(LoadingContext);
	const [project, setProject] = useState({ name: '', description: '<p>Cargando descripción...</p>'});
	const [ errors, setErrors ] = useState({name: '', description: ''});

	//
	const getProject = () => {
		setLoading(true);
		api.get({ endpoint: setEndpoint('project', 'show', project_id) }).then(
			res => {
				if (res.code === 200) {
					let data = res.data;
					setProject({
						...project,
						...data
					});
					project.description = project.description === '<p>Cargando descripción...</p>' ? '' : project.description;
					setLoading(false);
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

	//
	const updateProject = (exit = false) => {
		if (editorRef.current) {
			let project_params = {
				...project,
				description: editorRef.current.getContent()
			}
			api.put({ endpoint: setEndpoint('project', 'update', project_id) }, project_params).then(
				response => {
					if(exit){
						navigate('/', { replace: true });
					}
				},
				error => {
					if (error.status === 401){
						navigate('/login?reason=expired');
					}
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
		getProject();
		setLoading(false);
	}, []);

    return (
        <div className="App container">
			<Heading title="Editar proyecto" back={{ text: 'Volver a proyectos', url: '/' }} />
			{ loading ? <Spinner /> : 
			<div className="form content">
				<div className="form-group">
					<label>Nombre del proyecto:</label>
					<input type="text" name="name" value={ project?.name } onChange={setData} placeholder="Escribe el título del proyecto" />
					{ errors.name ? <span className="error">{ errors?.name }</span> : null }
				</div>
				<div className="form-group">
					<label>Descripción:</label>
					<Editor
					 	apiKey='jh5k1buuga6eygwgzc5nrc6y6g6p60pk16njlqq12y8w3tt4'
						onInit={(evt, editor) => editorRef.current = editor}
						initialValue={project?.description}
						init={{
						height: 500,
						menubar: false,
						plugins: [
							'advlist', 'autolink', 'lists', 'link', 'image', 'charmap',
							'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
							'insertdatetime', 'media', 'table', 'preview', 'wordcount'
						],
						toolbar: 'code | cut copy paste | bold italic underline | link anchor | bullist numlist blockquote | blocks | fullscreen removeformat',
						content_style: 'body { font-family: Georgia; font-size: 20px }'
						}}
					/>
				</div>
				<div className="form-group">
					<button onClick={() => updateProject()} className="btn pill solid main mr10">
						Guardar y continuar
					</button>
					<button onClick={() => updateProject(true)} className="btn pill solid main">
						Guardar y salir
						<Icon name="right" size={16} color="#FFF" style={{ marginBottom: '-2px', marginLeft: '5px' }} />
					</button>
				</div>
			</div>
			}
		</div>
    );
}

export default ProjectEdit;
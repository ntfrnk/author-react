import { useContext, useEffect, useRef, useState } from "react";
import { useNavigate } from 'react-router-dom';
import { api } from "../../services/api.service";
import { LoadingContext } from "../../services/context.service";
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

	const saveProject = (exit = false) => {
		if (editorRef.current) {
			let proj = {
				...project,
				description: editorRef.current.getContent(),
				user_id: 3
			}
			api.post({endpoint: 'project'}, {json: JSON.stringify(proj)}).then(
				response => {
					if(exit){
						navigate('/', { replace: true });
					} else {
						console.log('Guardado');
					}
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
			{ loading ? <Spinner /> : null }
			<div className="form">
				<div className="form-group">
					<label>Nombre del proyecto:</label>
					<input type="text" name="name" onChange={setData} placeholder="Escribe aquí el nombre del proyecto" />
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
		</div>
    );
}

export default ProjectNew;
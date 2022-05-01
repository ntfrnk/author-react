import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";
import './Heading.scss';

const Heading = (props) => {

    props = {
        title: '',
        subtitle: '',
        back: {
            text: 'Volver al listado',
            url: ''
        },
        new: {
            text: '',
            url: ''
        },
        ...props,
    }

    return (
        <div className="heading">
            <div className="buttons fr">
                { 
                    props.back.url !== '' 
                    ? <Link to={ props.back.url } className="btn rounded main rounded">
                        <Icon name="left" color="#096B72" size={16} style={{ marginBottom: '-2px', marginRight: '5px' }} />
                        <span style={{ color: '#096B72' }}>{ props.back.text }</span>
                    </Link> 
                    : null 
                }
                { 
                    props.new.url !== '' 
                    ? <Link to={ props.new.url } className="btn solid main rounded ml5">
                        <Icon name="plus" color="#FFF" size={16} style={{ marginBottom: '-2px', marginRight: '5px' }} />
                        { props.new.text }
                    </Link> 
                    : null 
                }
            </div>
            <h1>{ props.title }</h1>
            { props.subtitle !== '' ? <p>{ props.subtitle }</p> : null }
        </div>
    );
}

export default Heading;
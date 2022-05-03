import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './Card.scss';

const Card = ({item, type, deleteProject}) => {

    return (
        <div className="card-container">
            <div className="card">
                <div className="card-header">
                    <h3 className="truncate t2" title={ item.name }>
                        { type === 'project' ? item.name : item.title }
                        &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; 
                    </h3>
                    { type !== 'project' ? <div>Palabras: {item.words}</div> : null }
                </div>
                <div className="card-buttons">
                    <div>
                        <Link to={ type === 'project' ? '/articles/' + item.id : '/article/' + item.id } className="btn small solid main">
                            <Icon name="search" color="#FFF" size={16} style={{ paddingTop: '3px' }} />
                        </Link>
                    </div>
                    <div>
                        <Link to={ type + '/edit/' + item.id } className="btn small solid main mr5">
                            <Icon name="edit" color="#FFF" size={16} style={{ paddingTop: '3px' }} />
                        </Link>
                        <button className="btn small solid second" onClick={ () => deleteProject(item.id) }>
                            <Icon name="remove" color="#FFF" size={16} style={{ paddingTop: '3px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;

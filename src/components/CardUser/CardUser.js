import { Link } from 'react-router-dom';
import Icon from '../Icon/Icon';
import './CardUser.scss';

const CardUser = ({item, deleteItem}) => {

	return (
		<div className="card-container">
            <div className="card">
                <div className="card-header">
                    <h3 className="truncate t1 mb0">
                        { item.name } { item.lastname }
                    </h3>
                    <div>{item.email}</div>
                </div>
                <div className="card-buttons">
                    <div>
                        <Link to={ '/user/' + item.id } className="btn small solid main">
                            <Icon name="search" color="#FFF" size={16} style={{ paddingTop: '3px' }} />
                        </Link>
                    </div>
                    <div>
                        <Link to={ '/user/edit/' + item.id } className="btn small solid main mr5">
                            <Icon name="edit" color="#FFF" size={16} style={{ paddingTop: '3px' }} />
                        </Link>
                        <button className="btn small solid second" onClick={ () => deleteItem(item.id) }>
                            <Icon name="remove" color="#FFF" size={16} style={{ paddingTop: '3px' }} />
                        </button>
                    </div>
                </div>
            </div>
        </div>
	);
}

export default CardUser;
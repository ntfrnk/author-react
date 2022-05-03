import Icon from '../Icon/Icon';
import './Alert.scss';

const Alert = ({ text, type, callback }) => {

    return (
        <div className={`alert ${type}`}>
            <button className="close" onClick={ () => callback(true) }>
                <Icon name="close" color="#333" size={16} />
            </button>
            <span>{text}</span>
        </div>
    );
}

export default Alert;
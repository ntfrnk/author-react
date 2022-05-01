import { Icons, Emojis } from '../../services/icons.service';
import './Icon.scss';

const Icon = (props) => {

    let defaultProps = {
        name: '',
        type: 'icon',
        size: 20,
        color: '#000',
        style: {}
    };

    defaultProps = { ...defaultProps, ...props };

    const path = defaultProps.type === 'icon' ? Icons[defaultProps.name] : Emojis[defaultProps.name];

    return (
        <>
            <svg version="1.1" xmlns="http://www.w3.org/2000/svg" width={defaultProps.size} height={defaultProps.size} viewBox="0 0 23 23" style={defaultProps.style}>
                <path d={path} fill={ defaultProps.color }></path>
            </svg>
        </>
    );
}

export default Icon;
import { Link } from "react-router-dom";
import Icon from "../Icon/Icon";

const Empty = ({ text, link, feedback }) => {

    return (
        <div className="empty col col-12">
            <div className="empty-icon">
                <Icon name="neutral" type="emoji" color="gray" size={64} />
            </div>
            <div className="empty-title">
                <div>{ text }</div>
                <div><Link to={ link }>{ feedback }</Link></div>
            </div>
        </div>
    );
}

export default Empty;
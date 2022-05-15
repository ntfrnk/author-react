import { Link } from "react-router-dom";
import LoginService from "../../services/login.service";
import "./Header.scss";

const Header = () => {

	const userIsLogged = LoginService.userIsLogged();

	return (
		<header>
			<div className="container">
				<div className="row">
					<div className="col col-3">
						<Link to="/" className="f40 logo">
							Author <span className="f14">[ Book Manager ]</span>
						</Link>
					</div>
					{ userIsLogged ?
					<nav className="col col-9 ar">
						<Link to="/">
							<i className="fa fa-clipboard"></i>&nbsp;Proyectos
						</Link>
						<Link to="/users">
							<i className="fa fa-user"></i>&nbsp;Usuarios
						</Link>
						<Link to="/settings">
							<i className="fa fa-user-cog"></i>&nbsp;Configurar
						</Link>
						<Link to="/logout">
							<i className="fa fa-sign-out-alt"></i>&nbsp;Salir
						</Link>
					</nav>
					: null }
				</div>
			</div>
		</header>
	);
};

export default Header;

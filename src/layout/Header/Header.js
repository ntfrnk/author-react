import { useContext, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { LoginContext } from "../../services/context.service";
import "./Header.scss";

const Header = () => {

	const { login, setLogin, logout } = useContext(LoginContext);

	const doLogout = () => {
		setLogin(false);
		logout();
	}

	const location = useLocation().pathname;
	const navigate = useNavigate();

	useEffect(() => {
		if(!login && location !== "/login") {
			navigate('/login');
		}
	}, [login, navigate, location]);

	return (
		<>
			<header>
				<div className="container">
					<div className="row px15">
						<div className="col col-3">
							<Link to="/" className="f40 logo">
								Author <span className="f14">[ Book Manager ]</span>
							</Link>
						</div>
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
							<Link to="/login" onClick={ () => doLogout() }>
								<i className="fa fa-sign-out-alt"></i>&nbsp;Salir
							</Link>
						</nav>
					</div>
				</div>
			</header>
		</>
	);
};

export default Header;

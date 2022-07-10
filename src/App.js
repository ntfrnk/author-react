import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { LoginProvider, LoadingProvider } from './services/context.service';
import LoginService from './services/login.service';

// Components
import Header from './layout/Header/Header';

// Pages
import Projects from './pages/Projects/Projects';
import ProjectNew from './pages/Projects/ProjectNew';
import ProjectEdit from './pages/Projects/ProjectEdit';
import Articles from './pages/Articles/Articles';
import ArticleShow from './pages/Articles/ArticleShow';
import ArticleNew from './pages/Articles/ArticleNew';
import ArticleEdit from './pages/Articles/ArticleEdit';
import Users from './pages/Users/Users';
import UserShow from './pages/Users/UserShow';
import UserNew from './pages/Users/UserNew';
import UserEdit from './pages/Users/UserEdit';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';

import './App.scss';

function App() {

	if(window.location.pathname !== '/login') {
		LoginService.checkToken().then(
			response => {
				if (response.code !== 200) {
					LoginService.logout();
				}
			},
			error => {
				LoginService.logout();
			}
		);
	}

	return (
		<LoginProvider>
			<LoadingProvider>
				<BrowserRouter>
					<Header />
					<div className="container">
						<Routes>
							<Route path="/" element={<Projects />} />
							<Route path="/login" element={<Login />} />
							<Route path="/project/new" element={<ProjectNew />} />
							<Route path="/project/edit/:project_id" element={<ProjectEdit />} />
							<Route path="/articles/:project_id" element={<Articles />} />
							<Route path="/article/:article_id" element={<ArticleShow />} />
							<Route path="/article/new/:project_id" element={<ArticleNew />} />
							<Route path="/article/edit/:article_id" element={<ArticleEdit />} />
							<Route path="/users" element={<Users />} />
							<Route path="/user/:id" element={<UserShow />} />
							<Route path="/user/new" element={<UserNew />} />
							<Route path="/user/edit/:user_id" element={<UserEdit />} />
							<Route path="/settings" element={<Settings />} />
						</Routes>
					</div>
				</BrowserRouter>
			</LoadingProvider>
		</LoginProvider>
	);
}

export default App;

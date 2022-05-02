import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoadingProvider from './services/context.service';

// Components
import Header from './layout/Header/Header';

// Pages
import Projects from './pages/Projects/Projects';
import Articles from './pages/Articles/Articles';
import Article from './pages/Article/Article';
import Users from './pages/Users/Users';
import Chapters from './pages/Chapters/Chapters';
import Login from './pages/Login/Login';
import Settings from './pages/Settings/Settings';

import './App.scss';

function App() {
	return (
		<LoadingProvider>
			<BrowserRouter>
				<Header />
				<div className="container">
					<Routes>
						<Route path="/login" element={<Login />} />
						<Route path="/" element={<Projects />} />
						<Route path="/articles/:project_id" element={<Articles />} />
						<Route path="/article/:article_id" element={<Article />} />
						<Route path="/chapters/:project_id" element={<Chapters />} />
						<Route path="/users" element={<Users />} />
						<Route path="/settings" element={<Settings />} />
					</Routes>
				</div>
			</BrowserRouter>
		</LoadingProvider>
	);
}

export default App;

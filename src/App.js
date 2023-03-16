import { BrowserRouter } from 'react-router-dom';
import { LoginProvider, LoadingProvider } from './services/context.service';

import './App.scss';
import Container from './Container';

function App() {

	return (
		<LoginProvider>
			<LoadingProvider>
				<BrowserRouter>
					<Container />
				</BrowserRouter>
			</LoadingProvider>
		</LoginProvider>
	);
}

export default App;

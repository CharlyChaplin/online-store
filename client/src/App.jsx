import AppRouter from 'components/AppRouter';
import React from 'react';
import { BrowserRouter } from 'react-router-dom';


const App = () => {
	return (
		<BrowserRouter>
			<AppRouter />
		</BrowserRouter>
	);
}

export default App;
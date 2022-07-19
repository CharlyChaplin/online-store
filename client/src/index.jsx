import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './init/main.sass';
import { Provider } from 'react-redux';
import { store } from 'store/index.js';


ReactDOM.createRoot(document.getElementById('wrapper'))

	.render(
		<Provider store={store}>
			<App />
		</Provider>
	);
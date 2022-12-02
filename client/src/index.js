import React from 'react';
import ReactDOM from 'react-dom/client';
import { Auth0Provider } from '@auth0/auth0-react';
import App from './components/App';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
	<Auth0Provider
		domain='dev-tvpz3xa87zbay8qi.us.auth0.com'
		clientId='OUasisczwMVGVO0RnlE2nlTVJZZJQEem'
		redirectUri={window.location.origin}
	>
		<App />
	</Auth0Provider>
);

import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './Assets/Css/index.css';
import App from './App';
import "./Component/i18n/i18n"
import {I18nextProvider} from "react-i18next";
import i18next from "i18next"

ReactDOM.render(
	<React.StrictMode>
		<I18nextProvider i18n={i18next}>
			<Suspense fallback={<div>Loading...</div>}>
				<App />
			</Suspense>
		</I18nextProvider>
	</React.StrictMode>,
	document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA


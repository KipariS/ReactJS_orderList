import React from 'react';
import ReactDOM from 'react-dom';
import {Router, Route} from 'react-router'
import createBrowserHistory from 'history/lib/createBrowserHistory'

// ============================================
// ADD COMPONENTS
// ============================================
import StorePicker from './components/StorePicker';
import App from './components/App';
import NoPage from './components/NoPage';



var routing = (
	<Router history={createBrowserHistory()}>
		<Route path="/" component={StorePicker} />
		<Route path="/store/:storeId" component={App} />
		<Route path="*" component={NoPage} />
	</Router>
)



ReactDOM.render( routing, document.querySelector('#root') )

















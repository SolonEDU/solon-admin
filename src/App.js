import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Error404 from './pages/Error404';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<PrivateRoute exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<Route path='/' component={Error404} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;

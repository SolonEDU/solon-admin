import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { AuthProvider } from './Auth';
import PrivateRoute from './PrivateRoute';
import Home from './pages/Dashboard';
import Login from './pages/Login';
import Register from './pages/Register';
import Proposals from './pages/Proposals';
import Events from './pages/Events';
import Forum from './pages/Forum';
import Users from './pages/Users';
import Error404 from './pages/Error404';

function App() {
	return (
		<AuthProvider>
			<Router>
				<Switch>
					<PrivateRoute exact path='/' component={Home} />
					<Route exact path='/login' component={Login} />
					<Route exact path='/register' component={Register} />
					<PrivateRoute
						exact
						path='/proposals'
						component={Proposals}
					/>
					<PrivateRoute exact path='/events' component={Events} />
					<PrivateRoute exact path='/forum' component={Forum} />
					<PrivateRoute exact path='/users' component={Users} />
					<Route path='/' component={Error404} />
				</Switch>
			</Router>
		</AuthProvider>
	);
}

export default App;

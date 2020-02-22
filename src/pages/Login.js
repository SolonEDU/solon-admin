import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import app from '../base';
import { AuthContext } from '../Auth';

const Login = ({ history }) => {
	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);
				history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to='/' />;
	}

	return (
		<div>
			<h1>Login</h1>
			<form onSubmit={handleLogin}>
				<label>
					Email
					<input
						name='email'
						type='email'
						placeholder='Enter your email address'
					/>
				</label>
				<br />
				<label>
					Password
					<input
						name='password'
						type='password'
						placeholder='Enter your password'
					/>
				</label>
				<br />
				<button type='submit'>Login</button>
				<br />
				<p>
					Don't have an account? <Link to='/register'>Register</Link>
				</p>
			</form>
		</div>
	);
};

export default withRouter(Login);

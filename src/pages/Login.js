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
		<div className='form-card'>
			<h1>Login</h1>
			<br />
			<form onSubmit={handleLogin}>
				<div className='form-group'>
					<label>
						Email
						<input
							name='email'
							type='email'
							placeholder='Enter your email'
							className='form-control'
						/>
					</label>
				</div>
				<div className='form-group'>
					<label>
						Password
						<input
							name='password'
							type='password'
							placeholder='Enter your password'
							className='form-control'
						/>
					</label>
				</div>
				<button type='submit' className='btn btn-primary'>
					Login
				</button>
				<br />
				<br />
				<p>
					Don't have an account? <Link to='/register'>Register</Link>
				</p>
			</form>
		</div>
	);
};

export default withRouter(Login);

import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import app from '../base';
import { AuthContext } from '../Auth';

const Register = ({ history }) => {
	const handleRegister = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.createUserWithEmailAndPassword(
						email.value,
						password.value
					);
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
			<h1>Register</h1>
			<form onSubmit={handleRegister}>
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
				<button type='submit'>Register</button>
				<br />
				<p>
					Already have an account? <Link to='/login'>Login</Link>
				</p>
			</form>
		</div>
	);
};

export default withRouter(Register);

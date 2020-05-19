import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import app from '../base';
import { AuthContext } from '../Auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Login = props => {
	const handleLogin = useCallback(
		async event => {
			event.preventDefault();
			const { email, password } = event.target.elements;
			try {
				await app
					.auth()
					.signInWithEmailAndPassword(email.value, password.value);
				props.history.push('/');
			} catch (error) {
				alert(error);
			}
		},
		[props.history]
	);

	const { currentUser } = useContext(AuthContext);

	if (currentUser) {
		return <Redirect to='/' />;
	}

	return (
		<div className='form-card'>
			<h1>Login</h1>
			<br />
			<Form onSubmit={handleLogin}>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input
						type='email'
						name='email'
						id='email'
						placeholder='Enter your email'
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input
						type='password'
						name='password'
						id='password'
						placeholder='Enter your password'
						required
					/>
				</FormGroup>
				<Button color='primary'>Login</Button>
			</Form>
			<br />
			<p>
				Don't have an account? <Link to='/register'>Register</Link>
			</p>
		</div>
	);
};

export default withRouter(Login);

import React, { useCallback, useContext } from 'react';
import { withRouter, Redirect } from 'react-router';
import { Link } from 'react-router-dom';
import app from '../base';
import { AuthContext } from '../Auth';
import { Button, Form, FormGroup, Label, Input } from 'reactstrap';

const Register = props => {
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
			<h1>Register</h1>
			<br />
			<Form onSubmit={handleRegister}>
				<FormGroup>
					<Label for='email'>Email</Label>
					<Input
						type='email'
						name='email'
						id='email'
						placeholder='Enter an email'
						required
					/>
				</FormGroup>
				<FormGroup>
					<Label for='password'>Password</Label>
					<Input
						type='password'
						name='password'
						id='password'
						placeholder='Enter a password'
						required
					/>
				</FormGroup>
				<Button color='primary'>Register</Button>
			</Form>
			<br />
			<p>
					Already have an account? <Link to='/login'>Login</Link>
			</p>
		</div>
	);
};

export default withRouter(Register);

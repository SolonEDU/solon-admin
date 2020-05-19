import React, { Component } from 'react';
import {
	Card,
	Button,
	CardHeader,
	CardFooter,
	CardBody,
	CardTitle,
	CardText
} from 'reactstrap';

const axios = require('axios');
axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] =
	process.env.REACT_APP_AUTHORIZATION;

class UserList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			users: null
		};
	}

	fetchData() {
		axios.get('/users').then(res => {
			this.setState({
				loading: false,
				users: res.data.users
			});
		});
	}

	deleteUser(userID) {
		axios.delete(`/users/${userID}`).then(() => {
			this.fetchData();
		});
	}

	componentDidMount() {
		this.fetchData();
	}

	render() {
		return (
			<div>
				{this.state.loading ? (
					<p>Loading...</p>
				) : (
					<div className='row'>
						{this.state.users.map(user => (
							<div
								className='col-lg-4 col-md-6 my-4'
								key={user.uid}
							>
								<Card outline color='secondary'>
									<CardHeader>User ID: {user.uid}</CardHeader>
									<CardBody>
										<CardTitle>
											<h5>Email: {user.email}</h5>
										</CardTitle>
										<CardText>
											Full Name: {user.firstname}{' '}
											{user.lastname}
										</CardText>
										<Button
											outline
											color='danger'
											onClick={() => {
												this.deleteUser(user.uid);
											}}
										>
											<i className='fas fa-trash-alt'></i>
											Delete User
										</Button>
									</CardBody>
									<CardFooter>
										Preferred Language: {user.lang}
									</CardFooter>
								</Card>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default UserList;

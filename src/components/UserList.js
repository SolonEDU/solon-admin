import React, { Component } from 'react';

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
								<div className='card border-dark text-center'>
									<div className='card-header'>
										User ID: {user.uid}
									</div>
									<div className='card-body'>
										<h4 className='card-title'>
											Email: {user.email}
										</h4>
										<p className='card-text'>
											Full Name: {user.firstname}{' '}
											{user.lastname}
										</p>
									</div>
									<div className='card-footer text-muted'>
										Preferred Language: {user.lang}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default UserList;

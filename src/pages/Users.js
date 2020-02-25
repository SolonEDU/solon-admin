import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import UserList from '../components/users/UserList';

class Users extends Component {
	render() {
		return (
			<div>
				<NavigationBar />
				<div className='container text-center'>
					<h1>Users</h1>
					<UserList />
				</div>
			</div>
		);
	}
}

export default Users;

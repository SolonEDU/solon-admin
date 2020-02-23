import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import UserList from '../components/UserList';

class Users extends Component {
	render() {
		return (
			<div>
				<Navbar />
				<div className='container text-center'>
					<h1>Users</h1>
					<UserList />
				</div>
			</div>
		);
	}
}

export default Users;

import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import { AuthContext } from '../Auth';

const Dashboard = () => {
	const { currentUser } = useContext(AuthContext);

	return (
		<div>
			<Navbar />
			<div className='container text-center'>
				<h1>Dashboard</h1>
				<p>Welcome {currentUser.email} </p>
			</div>
		</div>
	);
};

export default Dashboard;

import React from 'react';
import app from '../base';

const Dashboard = () => {
	return (
		<div>
			<h1>Dashboard</h1>
			<button onClick={() => app.auth().signOut()}>Sign Out</button>
		</div>
	);
};

export default Dashboard;

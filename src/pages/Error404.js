import React from 'react';
import NavigationBar from '../components/NavigationBar';

const Error404 = () => {
	return (
		<div>
			<NavigationBar />
			<div className='container text-center'>
				<h1>Sorry, the page you were looking for cannot be found.</h1>
			</div>
		</div>
	);
};

export default Error404;

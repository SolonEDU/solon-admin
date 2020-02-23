import React from 'react';
import { Link } from 'react-router-dom';
import app from '../base';

const Navbar = () => {
	return (
		<nav className='navbar navbar-expand-md navbar-light'>
			<Link className='navbar-brand' to='/'>
				Solon Admin
			</Link>
			<button
				className='navbar-toggler'
				type='button'
				data-toggle='collapse'
				data-target='#navbarNav'
				aria-controls='navbarNav'
				aria-expanded='false'
				aria-label='Toggle navigation'
			>
				<span className='navbar-toggler-icon'></span>
			</button>
			<div className='collapse navbar-collapse' id='navbarNav'>
				<ul className='navbar-nav ml-auto'>
					<li className='nav-item'>
						<Link className='nav-link' to='/'>
							Dashboard
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/proposals'>
							Proposals
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/events'>
							Events
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/forum'>
							Forum
						</Link>
					</li>
					<li className='nav-item'>
						<Link className='nav-link' to='/users'>
							Users
						</Link>
					</li>
					<button
						onClick={() => app.auth().signOut()}
						className='nav-item btn btn-outline-primary'
					>
						Sign Out
					</button>
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;

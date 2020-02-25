import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import app from '../base';
import {
	Collapse,
	Navbar,
	NavbarToggler,
	NavbarBrand,
	Nav,
	NavItem,
	NavLink,
	Button
} from 'reactstrap';

const NavigationBar = props => {
	const [isOpen, setIsOpen] = useState(false);

	const toggle = () => setIsOpen(!isOpen);

	return (
		<div>
			<Navbar color='color' light expand='md'>
				<NavbarBrand href='/'>Solon Admin</NavbarBrand>
				<NavbarToggler onClick={toggle} />
				<Collapse isOpen={isOpen} navbar>
					<Nav className='ml-auto' navbar>
						<NavItem>
							<Link to='/'>
								<NavLink>Dashboard</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Link to='/proposals'>
								<NavLink>Proposals</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Link to='/events'>
								<NavLink>Events</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Link to='/forum'>
								<NavLink>Forum</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Link to='/users'>
								<NavLink>Users</NavLink>
							</Link>
						</NavItem>
						<NavItem>
							<Button
								onClick={() => app.auth().signOut()}
								color='outline-primary'
							>
								Sign Out
							</Button>
						</NavItem>
					</Nav>
				</Collapse>
			</Navbar>
		</div>
	);
};

export default NavigationBar;

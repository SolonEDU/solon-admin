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
							<NavLink tag={Link} to='/'>Dashboard</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/proposals'>Proposals</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/events'>Events</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/forum'>Forum</NavLink>
						</NavItem>
						<NavItem>
							<NavLink tag={Link} to='/users'>Users</NavLink>
						</NavItem>
						<NavItem>
							<Button
								outline
								color='primary'
								onClick={() => app.auth().signOut()}
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

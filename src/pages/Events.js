import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import EventList from '../components/events/EventList';
import EventSortDropdown from '../components/events/EventSortDropdown';
import { Button } from 'reactstrap';

class Events extends Component {
	constructor() {
		super();
		this.state = {
			sort_by: 'date.asc'
		};
	}

	handleDropdownChange = value => {
		this.setState({
			sort_by: value
		});
	};

	render() {
		return (
			<div>
				<NavigationBar />
				<div className='container text-center'>
					<h1>Events</h1>
					<EventSortDropdown
						sort_by={this.state.sort_by}
						onDropdownChange={this.handleDropdownChange}
					/>
					<EventList sort_by={this.state.sort_by} />
					<Button color='primary' className='fab'>
						<i className='fas fa-plus'></i>
					</Button>
				</div>
			</div>
		);
	}
}

export default Events;

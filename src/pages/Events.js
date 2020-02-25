import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import EventList from '../components/events/EventList';
import EventSortDropdown from '../components/events/EventSortDropdown';

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
					<button className='fab btn-primary'>
						<i class='fas fa-plus'></i>
					</button>
				</div>
			</div>
		);
	}
}

export default Events;

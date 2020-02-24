import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import EventList from '../components/EventList';
import EventSortDropdown from '../components/EventSortDropdown';

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
				<Navbar />
				<div className='container text-center'>
					<h1>Events</h1>
					<EventSortDropdown
						sort_by={this.state.sort_by}
						onDropdownChange={this.handleDropdownChange}
					/>
					<EventList sort_by={this.state.sort_by} />
					<button className='fab btn-primary'>+</button>
				</div>
			</div>
		);
	}
}

export default Events;

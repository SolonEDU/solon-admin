import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import EventList from '../components/EventList';

class Events extends Component {
	constructor() {
		super();
		this.state = {
			sort_by: 'date.asc'
		};
	}

	handleDropdownChange = event => {
		this.setState({
			sort_by: event.target.value
		});
	};

	render() {
		return (
			<div>
				<Navbar />
				<div className='container text-center'>
					<h1>Events</h1>
					<select
						value={this.state.sort_by}
						onChange={this.handleDropdownChange}
					>
						<option value='date.desc'>Date Descending</option>
						<option value='date.asc'>Date Ascending</option>
						<option value='numattenders.desc'>
							Number of Attenders Descending
						</option>
						<option value='numattenders.asc'>
							Number of Attenders Ascending
						</option>
					</select>
					<EventList sort_by={this.state.sort_by} />
				</div>
			</div>
		);
	}
}

export default Events;

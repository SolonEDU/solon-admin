import React, { Component } from 'react';

class EventSortDropdown extends Component {
	handleChange = event => {
		this.props.onDropdownChange(event.target.value);
	};

	render() {
		return (
			<div>
				<select value={this.props.sort_by} onChange={this.handleChange}>
					<option value='date.desc'>Date Descending</option>
					<option value='date.asc'>Date Ascending</option>
					<option value='numattenders.desc'>
						Number of Attenders Descending
					</option>
					<option value='numattenders.asc'>
						Number of Attenders Ascending
					</option>
				</select>
			</div>
		);
	}
}

export default EventSortDropdown;

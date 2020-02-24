import React, { Component } from 'react';

class ProposalSortDropdown extends Component {
	handleChange = event => {
		this.props.onDropdownChange(event.target.value);
	};

	render() {
		return (
			<div>
				<select value={this.props.sort_by} onChange={this.handleChange}>
					<option value='starttime.desc'>
						Start Time Descending
					</option>
					<option value='starttime.asc'>Start Time Ascending</option>
					<option value='endtime.desc'>End Time Descending</option>
					<option value='endtime.asc'>End Time Ascending</option>
					<option value='numvotes.desc'>
						Number of Votes Descending
					</option>
					<option value='numvotes.asc'>
						Number of Votes Ascending
					</option>
				</select>
			</div>
		);
	}
}

export default ProposalSortDropdown;

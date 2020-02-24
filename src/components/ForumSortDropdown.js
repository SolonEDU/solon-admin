import React, { Component } from 'react';

class ForumSortDropdown extends Component {
	handleChange = event => {
		this.props.onDropdownChange(event.target.value);
	};

	render() {
		return (
			<div>
				<select value={this.props.sort_by} onChange={this.handleChange}>
					<option value='timestamp.desc'>Timestamp Descending</option>
					<option value='timestamp.asc'>Timestamp Ascending</option>
					<option value='numcomments.desc'>
						Number of Comments Descending
					</option>
					<option value='numcomments.asc'>
						Number of Comments Ascending
					</option>
				</select>
			</div>
		);
	}
}

export default ForumSortDropdown;

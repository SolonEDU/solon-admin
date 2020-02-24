import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ForumpostList from '../components/ForumpostList';

class Forum extends Component {
	constructor() {
		super();
		this.state = {
			sort_by: 'timestamp.desc'
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
					<h1>Forum</h1>
					<select
						value={this.state.sort_by}
						onChange={this.handleDropdownChange}
					>
						<option value='timestamp.desc'>
							Timestamp Descending
						</option>
						<option value='timestamp.asc'>
							Timestamp Ascending
						</option>
						<option value='numcomments.desc'>
							Number of Comments Descending
						</option>
						<option value='numcomments.asc'>
							Number of Comments Ascending
						</option>
					</select>
					<ForumpostList sort_by={this.state.sort_by} />
					<button className='fab btn-primary'>+</button>
				</div>
			</div>
		);
	}
}

export default Forum;

import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ForumpostList from '../components/forum/ForumpostList';
import ForumSortDropdown from '../components/forum/ForumSortDropdown';

class Forum extends Component {
	constructor() {
		super();
		this.state = {
			sort_by: 'timestamp.desc'
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
					<h1>Forum</h1>
					<ForumSortDropdown
						sort_by={this.state.sort_by}
						onDropdownChange={this.handleDropdownChange}
					/>
					<ForumpostList sort_by={this.state.sort_by} />
					<button className='fab btn-primary'>
						<i class='fas fa-plus'></i>
					</button>
				</div>
			</div>
		);
	}
}

export default Forum;

import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import ForumpostList from '../components/forum/ForumpostList';
import ForumSortDropdown from '../components/forum/ForumSortDropdown';
import { Button } from 'reactstrap';

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
				<NavigationBar />
				<div className='container text-center'>
					<h1>Forum</h1>
					<ForumSortDropdown
						sort_by={this.state.sort_by}
						onDropdownChange={this.handleDropdownChange}
					/>
					<ForumpostList sort_by={this.state.sort_by} />
					<Button color='primary' className='fab'>
						<i className='fas fa-plus'></i>
					</Button>
				</div>
			</div>
		);
	}
}

export default Forum;

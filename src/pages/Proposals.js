import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ProposalList from '../components/ProposalList';

class Proposals extends Component {
	constructor() {
		super();
		this.state = {
			sort_by: 'starttime.desc'
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
					<h1>Proposals</h1>
					<select
						value={this.state.sort_by}
						onChange={this.handleDropdownChange}
					>
						<option value='starttime.desc'>
							Start Time Descending
						</option>
						<option value='starttime.asc'>
							Start Time Ascending
						</option>
						<option value='endtime.desc'>
							End Time Descending
						</option>
						<option value='endtime.asc'>End Time Ascending</option>
						<option value='numvotes.desc'>
							Number of Votes Descending
						</option>
						<option value='numvotes.asc'>
							Number of Votes Ascending
						</option>
					</select>
					<ProposalList sort_by={this.state.sort_by} />
				</div>
			</div>
		);
	}
}

export default Proposals;

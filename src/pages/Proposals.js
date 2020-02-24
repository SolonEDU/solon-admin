import React, { Component } from 'react';
import Navbar from '../components/Navbar';
import ProposalList from '../components/ProposalList';
import ProposalSortDropdown from '../components/ProposalSortDropdown';

const axios = require('axios');
axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] =
	process.env.REACT_APP_AUTHORIZATION;

class Proposals extends Component {
	constructor() {
		super();
		this.state = {
			sort_by: 'starttime.desc',
			daysremaining: '8'
		};
	}

	handleDropdownChange = value => {
		this.setState({
			sort_by: value
		});
	};

	handleDaysRemainingChange = event => {
		this.setState({
			daysremaining: event.target.value
		});
	};

	addDays = (date, days) => {
		var result = new Date(date);
		result.setDate(result.getDate() + days);
		return result;
	};

	handleCreateProposal = event => {
		event.preventDefault();
		const title = event.target.elements.title.value;
		const description = event.target.elements.description.value;
		const daysremaining = this.state.daysremaining;
		const starttime = new Date();
		const endtime = this.addDays(starttime, parseInt(daysremaining));
		axios
			.post('/proposals', {
				title: title,
				description: description,
				starttime: starttime,
				endtime: endtime,
				uid: -1
			})
			.then(console.log('close modal here'));
	};

	render() {
		return (
			<div>
				<Navbar />
				<div className='container text-center'>
					<h1>Proposals</h1>
					<ProposalSortDropdown
						sort_by={this.state.sort_by}
						onDropdownChange={this.handleDropdownChange}
					/>
					<ProposalList sort_by={this.state.sort_by} />
					<button
						type='button'
						className='fab btn-primary'
						data-toggle='modal'
						data-target='#newProposalModal'
					>
						+
					</button>
				</div>
				<div
					className='modal fade text-center'
					id='newProposalModal'
					tabIndex='-1'
					role='dialog'
					aria-labelledby='newProposalModalLabel'
					aria-hidden='true'
				>
					<div className='modal-dialog' role='document'>
						<div className='modal-content'>
							<div className='modal-header'>
								<h5
									className='modal-title'
									id='newProposalModalLabel'
								>
									New Proposal
								</h5>
								<button
									type='button'
									className='close'
									data-dismiss='modal'
									aria-label='Close'
								>
									<span aria-hidden='true'>&times;</span>
								</button>
							</div>
							<form onSubmit={this.handleCreateProposal}>
								<div className='modal-body'>
									<div className='form-group'>
										<label>Title</label>
										<input
											name='title'
											type='text'
											className='form-control'
											required
										/>
									</div>
									<div className='form-group'>
										<label>Description</label>
										<textarea
											rows='10'
											className='form-control'
											id='description'
											name='description'
											required
										></textarea>
									</div>
									<div className='form-group'>
										<label>
											Days Until Voting on Proposal Ends:
										</label>
										<input
											type='range'
											className='form-control'
											id='daysremaining'
											name='daysremaining'
											min='1'
											max='14'
											step='1'
											defaultValue='8'
											onChange={
												this.handleDaysRemainingChange
											}
										/>
										<p
											className='text-center'
											id='daysremainingtext'
										>
											{this.state.daysremaining} days
										</p>
									</div>
								</div>
								<div className='modal-footer'>
									<button
										type='button'
										className='btn btn-secondary'
										data-dismiss='modal'
									>
										Close
									</button>
									<button
										type='submit'
										className='btn btn-primary'
									>
										Create Proposal
									</button>
								</div>
							</form>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default Proposals;

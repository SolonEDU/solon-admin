import React, { Component } from 'react';

const axios = require('axios');
axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] =
	process.env.REACT_APP_AUTHORIZATION;

class ProposalList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			proposals: null
		};
	}

	fetchData(sort_by) {
		axios.get(`/proposals?sort_by=${sort_by}`).then(res => {
			this.setState({
				loading: false,
				proposals: res.data.proposals
			});
		});
	}

	deleteProposal(proposalID) {
		axios.delete(`/proposals/${proposalID}`).then(() => {
			this.fetchData(this.props.sort_by);
		});
	}

	componentDidMount() {
		this.fetchData(this.props.sort_by);
	}

	componentDidUpdate(prevProps) {
		if (this.props.sort_by !== prevProps.sort_by) {
			this.fetchData(this.props.sort_by);
		}
	}

	render() {
		return (
			<div>
				{this.state.loading ? (
					<p>Loading...</p>
				) : (
					<div className='row'>
						{this.state.proposals.map(proposal => (
							<div
								className='col-lg-4 col-md-6 my-4'
								key={proposal.pid}
							>
								<div className='card border-dark text-center'>
									<div className='card-header'>
										Proposal ID: {proposal.pid}
										<br />
										User ID of Creator: {proposal.uid}
									</div>
									<div className='card-body'>
										<h4 className='card-title'>
											Title: {proposal.entitle}
										</h4>
										<p className='card-text'>
											Description:{' '}
											{proposal.endescription}
										</p>
										<div className='row mt-3 mb-1'>
											<div className='p-1 col-sm bg-success text-white'>
												Yes: {proposal.numyes}
											</div>
											<div className='p-1 col-sm bg-danger text-white'>
												No: {proposal.numno}
											</div>
										</div>
										<div className='row mb-3 mt-1'>
											<div className='p-1 col-sm bg-info text-white'>
												Total Number of Votes:{' '}
												{proposal.numvotes}
											</div>
										</div>
										<button
											onClick={() => {
												this.deleteProposal(
													proposal.pid
												);
											}}
											className='btn btn-outline-danger'
										>
											Delete Proposal
										</button>
									</div>
									<div className='card-footer text-muted'>
										Start Time: {proposal.starttime}
										<hr />
										End Time: {proposal.endtime}
									</div>
								</div>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default ProposalList;

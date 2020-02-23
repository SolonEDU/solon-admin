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
					// <div>
					// 	<ul className='proposallist'>
					// 		{this.state.proposals.map(proposal => (
					// 			<li className='proposal' key={proposal.pid}>
					// 				<p>Proposal ID: {proposal.pid} </p>
					// 				<h4>{proposal.entitle}</h4>
					// 				<p>Description: {proposal.endescription}</p>
					// 			</li>
					// 		))}
					// 	</ul>
					// </div>
					<div className='row'>
						{this.state.proposals.map(proposal => (
							<div
								className='col-lg-4 col-md-6 my-4'
								key={proposal.pid}
							>
								<div className='card text-center'>
									<div className='card-header'>
										Proposal ID: {proposal.pid}
										<br />
										User ID of Creator: {proposal.uid}
									</div>
									<div className='card-body'>
										<h5 className='card-title'>
											{proposal.entitle}
										</h5>
										<p className='card-text'>
											{proposal.endescription}
										</p>
										<h5 className='card-title'>Votes</h5>
										<p className='card-text'>
											yes: {proposal.numyes} <br />
											no: {proposal.numno} <br />
											total: {proposal.numvotes}
										</p>
									</div>
									<div className='card-footer text-muted'>
										Start Time: {proposal.starttime}
										<br />
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

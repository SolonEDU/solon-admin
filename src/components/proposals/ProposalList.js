import React, { Component } from 'react';
import {
	Card,
	Button,
	CardHeader,
	CardFooter,
	CardBody,
	CardTitle,
	CardText
} from 'reactstrap';

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
								<Card outline color='secondary'>
									<CardHeader>
										Proposal ID: {proposal.pid}
										<br />
										User ID of Creator: {proposal.uid}
									</CardHeader>
									<CardBody>
										<CardTitle>
											<h5>Title: {proposal.entitle}</h5>
										</CardTitle>
										<CardText>
											Description:{' '}
											{proposal.endescription}
										</CardText>
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
										<Button
											outline
											color='danger'
											onClick={() => {
												this.deleteProposal(
													proposal.pid
												);
											}}
										>
											<i class='fas fa-trash-alt'></i>
											Delete Proposal
										</Button>
									</CardBody>
									<CardFooter>
										Start Time: {proposal.starttime}
										<hr />
										End Time: {proposal.endtime}
									</CardFooter>
								</Card>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default ProposalList;

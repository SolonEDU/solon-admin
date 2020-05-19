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
	handleChange = () => {
		this.props.onChange();
	};

	deleteProposal(proposalID) {
		axios.delete(`/proposals/${proposalID}`).then(() => {
			this.handleChange();
		});
	}

	componentDidMount() {
		this.handleChange();
	}

	componentDidUpdate(prevProps) {
		// if (this.props.proposals !== null) {
		// 	console.log('now len: ' + this.props.proposals.length)
		// }
		// if (prevProps.proposals !== null) {
		// 	console.log('prev len: ' + prevProps.proposals.length)
		// }
		// if (this.props.sort_by !== prevProps.sort_by){
		// 	console.log('update');
		// 	this.handleChange();
		// }
		// else if (this.props.proposals !== null && prevProps.proposals == null) {
		// 	console.log('update');
		// 	this.handleChange();
		// }
		// else if (this.props.proposals.length !== prevProps.proposals.length) {
		// 	console.log('update');
		// 	this.handleChange();
		// }
		if (
			JSON.stringify(this.props.proposals) !==
			JSON.stringify(prevProps.proposals)
		) {
			console.log('update');
			this.handleChange();
		}
	}

	render() {
		return (
			<div>
				{this.props.loading ? (
					<p>Loading...</p>
				) : (
					<div className='row'>
						{this.props.proposals.map(proposal => (
							<div className='col-lg-4 col-md-6 my-4' key={proposal.pid}>
								<Card outline color='secondary'>
									<CardHeader>
										Proposal ID: {proposal.pid}
										<br />
										{proposal.uid === -1 ? (
											<div>Creator: Admin</div>
										) : (
											<div>User ID of Creator: {proposal.uid}</div>
										)}
									</CardHeader>
									<CardBody>
										<CardTitle>
											<h5>Title: {proposal.entitle}</h5>
										</CardTitle>
										<CardText>Description: {proposal.endescription}</CardText>
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
												Total Number of Votes: {proposal.numvotes}
											</div>
										</div>
										<Button
											outline
											color='danger'
											onClick={() => {
												this.deleteProposal(proposal.pid);
											}}
										>
											<i className='fas fa-trash-alt'></i>
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

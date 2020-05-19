import React, { Component } from 'react';
import NavigationBar from '../components/NavigationBar';
import ProposalList from '../components/proposals/ProposalList';
import ProposalSortDropdown from '../components/proposals/ProposalSortDropdown';
import ProposalModal from '../components/proposals/ProposalModal';

const axios = require('axios');
axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] =
	process.env.REACT_APP_AUTHORIZATION;

	var moment = require('moment');
	moment().format();

class Proposals extends Component {
	constructor() {
		super();
		this.state = {
			loading: true,
			proposals: null,
			sort_by: 'starttime.desc',
			daysremaining: '8'
		};
	}

	handleProposalsChange = () => {
		axios.get(`/proposals?sort_by=${this.state.sort_by}`).then(res => {
			var proposals = res.data.proposals;
			var i;
			for (i = 0; i < proposals.length; i++) {
				var formatstart = moment(proposals[i].starttime).format('lll');
				proposals[i].starttime = formatstart;
				var formatend = moment(proposals[i].endtime).format('lll');
				proposals[i].endtime = formatend;
			}
			this.setState({
				loading: false,
				proposals: proposals
			});
		});
	};

	handleDropdownChange = value => {
		this.setState({
			sort_by: value
		});
	};

	handleDaysRemainingChange = value => {
		this.setState({
			daysremaining: value
		});
	};

	handleCreateProposal = elements => {
		const title = elements.title.value;
		const description = elements.description.value;
		const daysremaining = this.state.daysremaining;
		const starttime = moment.now();
		const endtime = moment(starttime).add(daysremaining, 'days');
		axios
			.post('/proposals', {
				title: title,
				description: description,
				starttime: starttime,
				endtime: endtime,
				uid: -1
			})
			.then(this.handleProposalsChange());
	};

	render() {
		return (
			<div>
				<NavigationBar />
				<div className='container text-center'>
					<h1>Proposals</h1>
					<ProposalModal
						daysremaining={this.state.daysremaining}
						onFormSubmit={this.handleCreateProposal}
						onChange={this.handleDaysRemainingChange}
					/>
					<ProposalSortDropdown
						sort_by={this.state.sort_by}
						onDropdownChange={this.handleDropdownChange}
					/>
					<ProposalList
						loading={this.state.loading}
						proposals={this.state.proposals}
						onChange={this.handleProposalsChange}
						sort_by={this.state.sort_by}
					/>
				</div>
			</div>
		);
	}
}

export default Proposals;

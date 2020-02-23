import React, { Component } from 'react';

const axios = require('axios');
axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] =
	process.env.REACT_APP_AUTHORIZATION;

class EventList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			events: null
		};
	}

	fetchData(sort_by) {
		axios.get(`/events?sort_by=${sort_by}`).then(res => {
			this.setState({
				loading: false,
				events: res.data.events
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
					<div className='row'>
						{this.state.events.map(event => (
							<div
								className='col-lg-4 col-md-6 my-4'
								key={event.eid}
							>
								<div className='card border-dark text-center'>
									<div className='card-header'>
										Event ID: {event.eid}
									</div>
									<div className='card-body'>
										<h4 className='card-title'>
											Title: {event.entitle}
										</h4>
										<p className='card-text'>
											Description: {event.endescription}
										</p>
										<p className='card-text'>
											Number of Attenders:{' '}
											{event.numattenders}
										</p>
									</div>
									<div className='card-footer text-muted'>
										Date: {event.date} <br />
										Date Created: {event.datecreated}
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

export default EventList;

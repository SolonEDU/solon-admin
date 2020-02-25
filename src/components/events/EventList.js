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

	deleteEvent(eventID) {
		axios.delete(`/events/${eventID}`).then(() => {
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
						{this.state.events.map(event => (
							<div
								className='col-lg-4 col-md-6 my-4'
								key={event.eid}
							>
								<Card outline color='secondary'>
									<CardHeader>
										Event ID: {event.eid}
									</CardHeader>
									<CardBody>
										<CardTitle>
											<h5>Title: {event.entitle}</h5>
										</CardTitle>
										<CardText>
											Description: {event.endescription}
										</CardText>
										<div className='row my-3'>
											<div className='p-1 col-sm bg-info text-white'>
												Number of Attenders:{' '}
												{event.numattenders}
											</div>
										</div>
										<Button
											outline
											color='danger'
											onClick={() => {
												this.deleteEvent(event.eid);
											}}
										>
											<i class='fas fa-trash-alt'></i>
											Delete Event
										</Button>
									</CardBody>
									<CardFooter>
										Date: {event.date}
										<hr />
										Date Created: {event.datecreated}
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

export default EventList;

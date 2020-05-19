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

var moment = require('moment');
moment().format();

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
			var events = res.data.events;
			var i;
			for (i = 0; i < events.length; i++) {
				var formatdate = moment(events[i].date).format('lll');
				events[i].date = formatdate;
				var formatcreated = moment(events[i].datecreated).format('lll');
				events[i].datecreated = formatcreated;
			}
			this.setState({
				loading: false,
				events: events
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
							<div className='col-lg-4 col-md-6 my-4' key={event.eid}>
								<Card outline color='secondary'>
									<CardHeader>Event ID: {event.eid}</CardHeader>
									<CardBody>
										<CardTitle>
											<h5>Title: {event.entitle}</h5>
										</CardTitle>
										<CardText>Description: {event.endescription}</CardText>
										<div className='row my-3'>
											<div className='p-1 col-sm bg-info text-white'>
												Number of Attenders: {event.numattenders}
											</div>
										</div>
										<Button
											outline
											color='danger'
											onClick={() => {
												this.deleteEvent(event.eid);
											}}
										>
											<i className='fas fa-trash-alt'></i>
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

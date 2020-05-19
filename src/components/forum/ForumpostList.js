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

class ForumpostList extends Component {
	constructor(props) {
		super(props);
		this.state = {
			loading: true,
			forumposts: null
		};
	}

	fetchData(sort_by) {
		axios.get(`/forumposts?sort_by=${sort_by}`).then(res => {
			var forumposts = res.data.forumposts;
			var i;
			for (i = 0; i < forumposts.length; i++) {
				var formattimestamp = moment(forumposts[i].timestamp).format('lll');
				forumposts[i].timestamp = formattimestamp;
			}
			this.setState({
				loading: false,
				forumposts: res.data.forumposts
			});
		});
	}

	deleteForumpost(forumpostID) {
		axios.delete(`/forumposts/${forumpostID}`).then(() => {
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
						{this.state.forumposts.map(forumpost => (
							<div className='col-lg-4 col-md-6 my-4' key={forumpost.fid}>
								<Card outline color='secondary'>
									<CardHeader>
										Forum Post ID: {forumpost.fid}
										<br />
										User ID of Creator: {forumpost.uid}
									</CardHeader>
									<CardBody>
										<CardTitle>
											<h5>Title: {forumpost.entitle}</h5>
										</CardTitle>
										<CardText>Description: {forumpost.endescription}</CardText>
										<div className='row my-3'>
											<div className='p-1 col-sm bg-info text-white'>
												Number of Comments: {forumpost.numcomments}
											</div>
										</div>
										<Button
											outline
											color='danger'
											onClick={() => {
												this.deleteForumpost(forumpost.fid);
											}}
										>
											<i className='fas fa-trash-alt'></i>
											Delete Forum Post
										</Button>
									</CardBody>
									<CardFooter>Date Created: {forumpost.timestamp}</CardFooter>
								</Card>
							</div>
						))}
					</div>
				)}
			</div>
		);
	}
}

export default ForumpostList;

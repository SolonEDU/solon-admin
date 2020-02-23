import React, { Component } from 'react';

const axios = require('axios');
axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] =
	process.env.REACT_APP_AUTHORIZATION;

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
			this.setState({
				loading: false,
				forumposts: res.data.forumposts
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
						{this.state.forumposts.map(forumpost => (
							<div
								className='col-lg-4 col-md-6 my-4'
								key={forumpost.fid}
							>
								<div className='card border-dark text-center'>
									<div className='card-header'>
										Forum Post ID: {forumpost.fid}
										<br />
										User ID of Creator: {forumpost.uid}
									</div>
									<div className='card-body'>
										<h4 className='card-title'>
											Title: {forumpost.entitle}
										</h4>
										<p className='card-text'>
											Description:{' '}
											{forumpost.endescription}
										</p>
										<p className='card-text'>
											Number of Comments:{' '}
											{forumpost.numcomments}
										</p>
									</div>
									<div className='card-footer text-muted'>
										Date Created: {forumpost.timestamp}
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

export default ForumpostList;

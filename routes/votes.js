const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

// Get Vote Data Handle
router.get('/votes/:proposalID', ensureAuthenticated, (req, res) => {
	const proposalID = req.params.proposalID;
	axios
		.get(`/votes?pid=${proposalID}`)
		.then(function(response) {
			const votes = response['data']['votes'];
			req.flash('success_msg', response['data']['message']);
			res.render('votes', {
				votes: votes
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = router;

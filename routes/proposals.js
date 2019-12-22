const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

// Proposals Page
router.get('/', ensureAuthenticated, (req, res) => {
	axios
		.get('/proposals')
		.then(function(response) {
			const proposals = response['data']['proposals'];
			res.render('proposals', {
				proposals: proposals
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

// Delete Proposal Handle
router.get('/delete/:proposalID', ensureAuthenticated, (req, res) => {
	axios
		.delete(`/proposals/${req.params.proposalID}`)
		.then(function(response) {
			req.flash('success_msg', response['data']['message']);
			res.redirect('/proposals');
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = router;

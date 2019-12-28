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

function addDays(date, days) {
	var result = new Date(date);
	result.setDate(result.getDate() + days);
	return result;
}

// New Proposal Handle
router.post('/new', ensureAuthenticated, (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const daysremaining = req.body.daysremaining;
	const starttime = new Date();
	const endtime = addDays(starttime, parseInt(daysremaining));
	axios
		.post('/proposals', {
			title: title,
			description: description,
			starttime: starttime,
			endtime: endtime,
			uid: -1
		})
		.then(function(response) {
			req.flash('success_msg', response['data']['message']);
			res.redirect('/proposals');
		})
		.catch(function(error) {
			console.log(error);
		});
});

// Get Vote Data Handle
router.get('/votes', ensureAuthenticated, (req, res) => {
	const pid = req.query.pid;
	axios
		.get(`/votes?pid=${pid}`)
		.then(function(response) {
			const votes = response['data']['votes'];
			req.flash('success_msg', response['data']['message']);
			res.render('votes', {
				pid: pid,
				votes: votes
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = router;

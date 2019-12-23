const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

// Events Page
router.get('/', ensureAuthenticated, (req, res) => {
	axios
		.get('/events')
		.then(function(response) {
			const events = response['data']['events'];
			res.render('events', {
				events: events
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

// Delete Event Handle
router.get('/delete/:eventID', ensureAuthenticated, (req, res) => {
	axios
		.delete(`/events/${req.params.eventID}`)
		.then(function(response) {
			req.flash('success_msg', response['data']['message']);
			res.redirect('/events');
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = router;

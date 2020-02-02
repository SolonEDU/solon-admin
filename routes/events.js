const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

// Events Page
router.get('/', ensureAuthenticated, (req, res) => {
	axios
		.get('/events?sort_by=date.desc')
		.then(function(response) {
			const events = response['data']['events'];
			for (i = 0; i < events.length; i++) {
				events[i]['title'] = JSON.parse(events[i]['title'])['en'];
				events[i]['description'] = JSON.parse(events[i]['description'])['en'];
			}
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

// New Event Handle
router.post('/new', ensureAuthenticated, (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const date = req.body.date;
	axios
		.post('/events', {
			title: title,
			description: description,
			date: date
		})
		.then(function(response) {
			req.flash('success_msg', response['data']['message']);
			res.redirect('/events');
		})
		.catch(function(error) {
			console.log(error);
		});
});

// Get Attender Data Handle
router.get('/attenders', ensureAuthenticated, (req, res) => {
	const eid = req.query.eid;
	axios
		.get(`/attenders?eid=${eid}`)
		.then(function(response) {
			const attenders = response['data']['attenders'];
			req.flash('success_msg', response['data']['message']);
			res.render('attenders', {
				eid: eid,
				attenders: attenders
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = router;

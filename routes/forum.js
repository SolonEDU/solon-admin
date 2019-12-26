const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

// Forum Page
router.get('/', ensureAuthenticated, (req, res) => {
	axios
		.get('/forumposts')
		.then(function(response) {
			const forumposts = response['data']['forumposts'];
			res.render('forum', {
				forumposts: forumposts
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

// Delete Forum Post Handle
router.get('/delete/:forumpostID', ensureAuthenticated, (req, res) => {
	axios
		.delete(`/forumposts/${req.params.forumpostID}`)
		.then(function(response) {
			req.flash('success_msg', response['data']['message']);
			res.redirect('/forum');
		})
		.catch(function(error) {
			console.log(error);
		});
});

// New Forum Post Handle
router.post('/new', ensureAuthenticated, (req, res) => {
	const title = req.body.title;
	const description = req.body.description;
	const timestamp = new Date();
	axios
		.post('/forumposts', {
			title: title,
			description: description,
			timestamp: timestamp,
			uid: null
		})
		.then(function(response) {
			req.flash('success_msg', response['data']['message']);
			res.redirect('/forum');
		})
		.catch(function(error) {
			console.log(error);
		});
});

// Get Comments Handle
router.get('/comments', ensureAuthenticated, (req, res) => {
	const fid = req.query.fid;
	axios
		.get(`comments/forumpost/${fid}`)
		.then(function(response) {
			const comments = response['data']['comments'];
			req.flash('success_msg', response['data']['message']);
			res.render('comments', {
				fid: fid,
				comments: comments
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = router;

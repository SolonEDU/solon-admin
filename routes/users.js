const express = require('express');
const router = express.Router();
const { ensureAuthenticated } = require('../config/auth');
const axios = require('axios');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

// Users Page
router.get('/', ensureAuthenticated, (req, res) => {
	axios
		.get('/users')
		.then(function(response) {
			const users = response['data']['users'];
			res.render('users', {
				users: users
			});
		})
		.catch(function(error) {
			console.log(error);
		});
});

// Delete User Handle
router.get('/delete/:userID', ensureAuthenticated, (req, res) => {
	axios
		.delete(`/users/${req.params.userID}`)
		.then(function(response) {
			req.flash('success_msg', response['data']['message']);
			res.redirect('/users');
		})
		.catch(function(error) {
			console.log(error);
		});
});

module.exports = router;

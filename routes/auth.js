require('dotenv').config();
const express = require('express');
const router = express.Router();
const axios = require('axios');
const passport = require('passport');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

// Login Page
router.get('/login', (req, res) => res.render('login'));

// Login Handle
router.post('/login', (req, res, next) => {
	passport.authenticate('local', {
		successRedirect: '/dashboard',
		failureRedirect: '/auth/login',
		failureFlash: true
	})(req, res, next);
});

// Register Page
router.get('/register', (req, res) => res.render('register'));

// Register Handle
router.post('/register', (req, res) => {
	const username = req.body.username;
	const password = req.body.password;
	const password2 = req.body.password2;
	let errors = [];

	if (password !== password2) {
		errors.push({ msg: 'Passwords do not match' });
	}

	if (password.length < 6) {
		errors.push({ msg: 'Password must be at least 6 characters' });
	}

	if (errors.length > 0) {
		res.render('register', {
			errors,
			username,
			password,
			password2
		});
	} else {
		axios
			.post('/admins/register', {
				username: username,
				password: password
			})
			.then(response => {
				const apires = response['data'];
				if (apires['message'] === 'Error') {
					errors.push({ msg: apires['error']['errorMessage'] });
					res.render('register', {
						errors,
						username,
						password,
						password2
					});
				} else {
					req.flash('success_msg', apires['message']);
					res.redirect('/auth/login');
				}
			})
			.catch(error => {
				console.log(error);
			});
	}
});

// Logout Handle
router.get('/logout', (req, res) => {
	req.logout();
	req.flash('success_msg', 'You have been logged out');
	res.redirect('/auth/login');
});

module.exports = router;

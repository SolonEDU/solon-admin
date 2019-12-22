require('dotenv').config();
const LocalStrategy = require('passport-local').Strategy;
const axios = require('axios');

axios.defaults.baseURL = 'https://api.solonedu.com';
axios.defaults.headers.common['Authorization'] = process.env.AUTHORIZATION;

module.exports = function(passport) {
	passport.use(
		new LocalStrategy((username, password, done) => {
			axios
				.post('/admins/login', {
					username: username,
					password: password
				})
				.then(response => {
					const apires = response['data'];
					if (apires['message'] === 'Error') {
						return done(null, false, {
							message: apires['error']['errorMessage']
						});
					} else {
						user = apires['admin'];
						return done(null, user);
					}
				})
				.catch(error => {
					console.log(error);
				});
		})
	);

	passport.serializeUser((user, done) => {
		done(null, user.adminid);
	});

	passport.deserializeUser((adminid, done) => {
		axios
			.get(`/admins/${adminid}`)
			.then(response => {
				const user = response['data']['admin'];
				done(null, user);
			})
			.catch(error => {
				console.log(error);
			});
	});
};

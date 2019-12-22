const express = require('express');
const expressLayouts = require('express-ejs-layouts');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');

const app = express();

// Passport config
require('./config/passport')(passport);

// EJS
app.use(expressLayouts);
app.set('view engine', 'ejs');

// Bodyparser
app.use(express.urlencoded({ extended: false }));

// Express Session
app.use(
	session({
		secret: 'secret',
		resave: true,
		saveUninitialized: true
	})
);

// Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Connect flash
app.use(flash());

// Global Vars
app.use((req, res, next) => {
	res.locals.success_msg = req.flash('success_msg');
	res.locals.error_msg = req.flash('error_msg');
	res.locals.error = req.flash('error');
	next();
});

// Static Files
app.use(express.static('public'));

// Routes
const indexRoutes = require('./routes/index');
const authRoutes = require('./routes/auth');
const proposalRoutes = require('./routes/proposals');
const userRoutes = require('./routes/users');

app.use('/', indexRoutes);
app.use('/auth', authRoutes);
app.use('/proposals', proposalRoutes);
app.use('/users', userRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));

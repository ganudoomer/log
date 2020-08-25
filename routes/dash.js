const router = require('express').Router();
const User = require('../models/User');
const isAuth = require('../middleware');
router.get('/login', isAuth, (req, res) => {
	res.render('login', { err: null });
});

router.post('/login', (req, res) => {
	User.findOne({ email: req.body.email })
		.then((data) => {
			if (data) {
				if (data.password === req.body.password) {
					req.session.name = data.name;
					req.session.email = data.email;
					res.redirect('/home');
				} else {
					res.render('login', { err: 'Wrong passwprd or email' });
				}
			} else {
				res.render('login', { err: 'User does not exist' });
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/register', isAuth, (req, res) => {
	res.render('register', { err: null });
});

router.post('/register', (req, res) => {
	User.findOne({ email: req.body.email })
		.then((data) => {
			if (!data) {
				const user = new User({
					name: req.body.name,
					email: req.body.email,
					password: req.body.password
				});
				console.log(user);
				user.save((err) => {
					if (err) {
						console.log(err);
					} else {
						res.redirect('/login');
					}
				});
			} else {
				res.render('register', { err: 'Email already exists' });
			}
		})
		.catch((err) => {
			console.log(err);
		});
});

router.get('/home', (req, res) => {
	if (req.session.email) {
		res.render('home', { name: req.session.name });
	} else {
		res.redirect('/login');
	}
});

router.get('/logout', (req, res) => {
	req.session.destroy();

	res.redirect('/');
});

module.exports = router;

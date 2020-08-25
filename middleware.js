const isAuth = (req, res, next) => {
	if (req.session.email) {
		res.redirect('/home');
	} else {
		next();
	}
};
module.exports = isAuth;

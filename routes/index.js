const router = require('express').Router();
const isAuth = require('../middleware');
router.get('/', isAuth, (req, res) => {
	res.render('index');
});

module.exports = router;

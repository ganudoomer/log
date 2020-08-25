const express = require('express');
const app = express();
const index = require('./routes/index');
const dash = require('./routes/dash');
const mongoose = require('mongoose');
const session = require('express-session');
const expressLayouts = require('express-ejs-layouts');
mongoose
	.connect(process.env.DatabaseUrl, {
		useNewUrlParser: true,
		useUnifiedTopology: true
	})
	.then(() => console.log('Mongoose Connected'));

app.use(expressLayouts);
app.set('view engine', 'ejs');

app.use(
	session({
		secret: 'Cookie mass',
		resave: false,
		saveUninitialized: true
	})
);

app.use(express.urlencoded({ extended: true }));

app.use(index);
app.use(dash);

app.listen(process.env.PORT, process.env.IP, console.log('## Server running on port 3000'));

const fs = require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');
const User = require('./Models/user');
const path = require('path');

const dbURI = 'mongodb+srv://timtests:Xyyx37psYxkPS5Di@cluster0.wbjwp.mongodb.net/timtests?retryWrites=true&w=majority';

mongoose.connect(dbURI)
.then((result) => {
	console.log('Connected to database');
})
.catch((err) => console.log(err));

const express = require('express');

const pageRoutes = require('./routes/page');
const noteRoutes = require('./routes/note');
const authRoutes = require('./routes/auth');

const exp = require('constants');
const bodyParser = require('body-parser');

const app = express();

// Custom middleware
// app.use((req, res, next) => {	
// 	console.log('New request entered');
// 	console.log('host: ', req.hostname);
// 	console.log('path: ', req.path);
// 	console.log('method: ', req.method);
// 	next();
// })

// Middlewares
app.use((req, res, next) => {
	console.log('===================> Middleware')
	User.findById('628e036e799c230ecdecd41b')
		.then(user => {			
			req.user = user;			
			next();
		})
		.catch(err => {
			console.log(err);
		});
});
app.use(bodyParser.urlencoded({extended: false}));
// Middleware to parse JSON
app.use(bodyParser.json());
app.use(pageRoutes);
app.use(noteRoutes);
app.use(authRoutes);
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.set('views', './views');
// Register view engine
app.set('view engine', 'ejs');

app.get('/add-user', (req, res) => {
	const user = new User({
		username: 'Tim',
		email: 'fr2devkontiki@gmail.com',
		password: 'Kontiki123'
	});

	user.save()
	.then((result) => {
		res.send(result); 
	})
})

app.get('/all-users', (req, res) => {
	User.find().sort({ createdAt: -1 })
	.then((result) => {
		res.send(result);
	})
})

app.get('/user', (req, res) => {
	User.findById('628e036e799c230ecdecd41b')
	.then((result) => {
		res.send(result)
	})
	.catch((err) => {
		console.log(err);
	})
})
// Respond to this message bellow: "May this Easter season bring you and your family an abundance of happiness and blessings. Wishing you all a wonderful holiday filled with joy and love"
app.get('/easter', (req, res) => {
	res.send('May this Easter season bring you and your family an abundance of happiness and blessings. Wishing you all a wonderful holiday filled with joy and love');
})

app.listen(5000);
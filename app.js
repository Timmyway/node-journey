const fs = require('fs');
const _ = require('lodash');
const mongoose = require('mongoose');
const path = require('path');
const cookieParser = require('cookie-parser');
const csrf = require('csurf');
const flash = require('connect-flash');
const ErrorController = require('./controllers/ErrorController');

const MONGODB_URI = 'mongodb+srv://timtests:Xyyx37psYxkPS5Di@cluster0.wbjwp.mongodb.net/timtests?retryWrites=true&w=majority';

mongoose.connect(MONGODB_URI)
.then((result) => {
	console.log('Connected to database');
})
.catch((err) => console.log(err));

const express = require('express');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);

const pageRoutes = require('./routes/page');
const noteRoutes = require('./routes/note');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');

const exp = require('constants');
const mongoStore = new MongoDBStore({
	uri: MONGODB_URI,
	collection: 'sessions'
});

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
app.use(session({ secret: 'a4f5hh4so#-_8Apo_9h5j77fhcmfl-é@4', resave: false, saveUninitialized: false, store: mongoStore }))
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: false}));
// Middleware to parse JSON
app.use(bodyParser.json());
app.use(csrf());
app.use(flash());
// app.use((req, res, next) => {	
// 	User.findById('628e036e799c230ecdecd41b')
// 		.then(user => {			
// 			req.user = user;			
// 			next();
// 		})
// 		.catch(err => {
// 			console.log(err);
// 		});
// });
// static files
app.use(express.static(path.join(__dirname, 'public')));

app.use((req, res, next) => {
	res.locals.isAuthenticated = req.session.isLoggedIn;
	res.locals.csrfToken = req.csrfToken();
	next();
})
app.use(pageRoutes);
app.use(noteRoutes);
app.use(authRoutes);
app.use(userRoutes);
app.use(ErrorController.get404);

app.set('views', './views');
// Register view engine
app.set('view engine', 'ejs');

app.listen(5000);
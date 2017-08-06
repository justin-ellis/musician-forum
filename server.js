const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');
const session = require('express-session');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));

app.use(session({
	secret: "This is a random secret string",
	resave: false,
	saveUninitialized: false
}));

const membersController = require('./controllers/members.js');
app.use('/members', membersController);
const postsController = require('./controllers/posts.js');
app.use('/posts', postsController);
const sessionController = require('./controllers/session.js');
app.use('/session', sessionController);

app.get('/', (req, res)=>{
	res.render('index.ejs');
});


mongoose.connect('mongodb://localhost:27017/forum');

mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});

// connection to server
app.listen(3000, ()=>{
	console.log('listening');
});
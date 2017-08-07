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
	secret: "random secret string",
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

const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/musician-forum';
mongoose.connect(mongoUri);
// mongoose.connect('mongodb://localhost:27017/forum'); // remove this, activiate 

mongoose.connection.once('open', ()=>{
	console.log('connected to mongo');
});

const port = process.env.PORT || 3000;

// connection to server
app.listen(port, (req, res)=>{
	console.log('super cool');
});
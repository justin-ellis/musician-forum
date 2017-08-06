const express = require('express');
const app = express();
const membersController = require('./controllers/members.js');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended:false}));



app.use('/members', membersController);

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
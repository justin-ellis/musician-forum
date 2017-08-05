const express = require('express');
const app = express();
const membersController = require('./controllers/members.js');


app.get('/', (req, res)=>{
	res.render('index.ejs');
});

app.use('/members', membersController);


// connection to server
app.listen(3000, ()=>{
	console.log('listening');
});
const express = require('express');
const app = express();
const membersController = require('./controllers/members.js');




app.use('/members', membersController);

app.get('/', (req, res)=>{
	res.render('index.ejs');
});


// connection to server
app.listen(3000, ()=>{
	console.log('listening');
});
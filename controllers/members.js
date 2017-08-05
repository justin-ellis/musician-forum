const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	res.render('members/index.ejs');
});

router.get('/new', (req, res)=>{
	res.render('members/new.ejs');
});

router.post('/', (req, res)=>{
	res.send(req.body);
});

module.exports = router;
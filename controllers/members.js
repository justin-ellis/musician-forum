const express = require('express');
const router = express.Router();

router.get('/', (req, res)=>{
	res.render('members/index.ejs');
});

router.get('/new', (req, res)=>{
	res.render('members/new.ejs');
});

module.exports = router;
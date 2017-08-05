const express = require('express');
const router = express.Router();
const Member = require('../models/members.js');

router.get('/', (req, res)=>{
	res.render('members/index.ejs');
});

router.get('/new', (req, res)=>{
	res.render('members/new.ejs');
});

router.post('/', (req, res)=>{
	Member.create(req.body, (err, createdMember)=>{
	res.redirect('/members');
	});
});

module.exports = router;
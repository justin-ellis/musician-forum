const express = require('express');
const router = express.Router();
const Member = require('../models/members.js');

router.get('/', (req, res)=>{
	Member.find({}, (err, foundMembers)=>{
		res.render('members/index.ejs', {
			members:foundMembers
		});
	});
});

router.get('/new', (req, res)=>{
	res.render('members/new.ejs');
});

router.post('/', (req, res)=>{
	Member.create(req.body, (err, createdMember)=>{
	res.redirect('/members');
	});
});

router.get('/:id/edit', (req, res)=>{
	Member.findById(req.params.id, (err, foundMember)=>{
		res.render('members/edit.ejs', {	
		member: foundMember
		});
	});
});

router.put('/:id', (req, res)=>{
	Member.findByIdAndUpdate(req.params.id, req.body, (err, updatedMember)=>{
	res.redirect('/members');
	});
});


router.get('/:id', (req, res)=>{
	Member.findById(req.params.id, (err, foundMember)=>{
		res.render('members/show.ejs', {
			member: foundMember
		});
	});
});

router.delete('/:id', (req, res)=>{
	Member.findByIdAndRemove(req.params.id, (err, foundMember)=>{
		res.redirect('/members');
	});
});

module.exports = router;
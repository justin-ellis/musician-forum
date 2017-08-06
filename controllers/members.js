const express = require('express');
const Member = require('../models/members.js');
const Post = require('../models/posts.js');
const router = express.Router();

router.get('/', (req, res)=>{
	Member.find({}, (err, foundMembers)=>{
		res.render('members/index.ejs', {
			members:foundMembers
		});
	});
});

router.post('/', (req, res)=>{
	Member.create(req.body, (err, createdMember)=>{
	res.redirect('/members');
	});
});

router.get('/new', (req, res)=>{
	res.render('members/new.ejs');
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
	Member.findById(req.params.id, (err, foundMember)=>{
		const postIds= [];
		for (let i = 0; i < foundMember.posts.length; i++) {
			postIds.push(foundMember.posts[i].id);
		}
		Post.remove(
			{_id:{
				$in: postIds
				}
			}, (err, data)=>{
				res.redirect('/members');
			});
		});
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
	Member.findByIdAndUpdate(req.params.id, req.body, ()=>{
	res.redirect('/members');
	});
});





module.exports = router;
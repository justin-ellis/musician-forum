const express = require('express');
const Member = require('../models/members.js');
const Post = require('../models/posts.js');
const router = express.Router();

// MEMBERS INDEX PAGE
router.get('/', (req, res)=>{
	Member.find({}, (err, foundMembers)=>{
		res.render('members/index.ejs', {
			members:foundMembers
		});
	});
});

// POSTING NEWLY CREATED MEMBERS
router.post('/', (req, res)=>{
	Member.create(req.body, (err, createdMember)=>{
	res.redirect('/members');
	});
});

// CREATING A NEW MEMBER PAGE
router.get('/new', (req, res)=>{
	res.render('members/new.ejs');
});

// MEMBER SHOW PAGE
router.get('/:id', (req, res)=>{
	Member.findById(req.params.id, (err, foundMember)=>{
		res.render('members/show.ejs', {
			member: foundMember
		});
	});
});

// MEMBER DELETE ROUTE(deletes member's posts as well)
router.delete('/:id', (req, res)=>{
	Member.findByIdAndRemove(req.params.id, (err, foundMember)=>{
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


// MEMBER EDIT PAGE
router.get('/:id/edit', (req, res)=>{
	Member.findById(req.params.id, (err, foundMember)=>{
		res.render('members/edit.ejs', {	
		member: foundMember
		});
	});
});

// MEMBER UPDATE ROUTE
router.put('/:id', (req, res)=>{
	Member.findByIdAndUpdate(req.params.id, req.body, ()=>{
	res.redirect('/members');
	});
});





module.exports = router;
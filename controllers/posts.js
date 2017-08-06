const express = require('express');
const Post = require('../models/posts.js');
const Member = require('../models/members.js');
const router = express.Router();

router.get('/', (req, res)=>{
	Post.find({}, (err, foundPosts)=>{
		res.render('posts/index.ejs', {
			posts:foundPosts
		});
	});
});

router.get('/new', (req, res)=>{
	Member.find({}, (err, allMembers)=>{
	res.render('posts/new.ejs', {
		members: allMembers
		});
	});
});

router.post('/', (req, res)=>{
	Post.create(req.body, (err, createdPost)=>{
		Member.findById(req.body.memberId, (err, foundMember)=>{
			foundMember.posts.push(createdPost);
			foundMember.save((err, data)=>{
				res.redirect('/posts');
			});
		});
	});
});

router.get('/:id', (req, res)=>{
	Post.findById(req.params.id, (err, foundPost)=>{
		Member.findOne({'posts._id': req.params.id}, (err, foundMember)=>{
		res.render('posts/show.ejs', {
			post: foundPost,
			member: foundMember
			});
		});
	});
});

router.delete('/:id', (req, res)=>{
	Post.findByIdAndRemove(req.params.id, (err, foundPost)=>{
	Member.findOne({'posts._id': req.params.id}, (err, foundMember)=>{
		foundMember.posts.id(req.params.id).remove();
		foundMember.save((err, savedMember)=>{
		res.redirect('/posts');
			});
		});
	});
});


router.get('/:id/edit', (req, res)=>{
	Post.findById(req.params.id, (err, foundPost)=>{
		res.render('posts/edit.ejs', {	
		post: foundPost
		});
	});
});




router.put('/:id', (req, res)=>{
	Post.findByIdAndUpdate(req.params.id, req.body, ()=>{
	res.redirect('/posts');
	});
});

module.exports = router;
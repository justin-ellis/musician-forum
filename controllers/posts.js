const express = require('express');
const Post = require('../models/posts.js');
const Member = require('../models/members.js');
const router = express.Router();

// POSTS INDEX PAGE
router.get('/', (req, res)=>{
	if (req.session.logged){
	Post.find({}, (err, foundPosts)=>{
		res.render('posts/index.ejs', {
			posts: foundPosts,
		});
	});
	} else {
		res.redirect('/session/login');
	}		// want to show post creator next to posts on index
			// Member.find({}, (err, foundMembers)=>{
			// members: foundMembers
			// });
});

// NEW POST PAGE
router.get('/new', (req, res)=>{
	Member.find({}, (err, allMembers)=>{
	res.render('posts/new.ejs', {
		members: allMembers
		});
	});
});

// NEWLY CREATED POST ROUTE
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

// POST SHOW PAGE
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

// POST DELETE ROUTE
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

// POST EDIT PAGE
router.get('/:id/edit', (req, res)=>{
	Post.findById(req.params.id, (err, foundPost)=>{
		Member.find({}, (err, allMembers)=>{
			Member.findOne({'posts._id':req.params.id}, (err, foundPostCreator)=>{
				res.render('posts/edit.ejs', {	
				post: foundPost,
				members: allMembers,
				postCreator: foundPostCreator
				});
			});
		});
	});
});



// POST UPDATE ROUTE
router.put('/:id', (req, res)=>{
	Post.findByIdAndUpdate(req.params.id, req.body, {new: true}, (err, updatedPost)=>{
		Member.findOne({'posts._id':req.params.id}, (err, foundMember)=>{
	if(foundMember._id.toString() !== req.body.memberId){
		foundMember.posts.id(req.params.id).remove();
		foundMember.save((err, savedFoundMember)=>{
			Member.findById(req.body.memberId, (err, newMember)=>{
				newMember.posts.push(updatedPost);
				newMember.save((err, savedNewMember)=>{
					res.redirect('/posts/'+req.params.id);
				});
			});
		});
	} else {
		foundMember.posts.id(req.params.id).remove();
			foundMember.posts.push(updatedPost);
			foundMember.save((err, data)=>{
				res.redirect('/posts/'+req.params.id);
			});
		}
		});
	});
});

module.exports = router;
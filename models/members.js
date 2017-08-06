const mongoose = require('mongoose');
const Post = require('./posts.js');

const memberSchema = mongoose.Schema({
	username: {type: String, required: true},
	password: {type: String, required: true},
	posts: [Post.schema]
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
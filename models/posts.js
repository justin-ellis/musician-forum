const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	title: {type: String, required: true},
	img: {type: String},
	descr: {type: String, required: true},
	category: {type: String},
	sound: {type: String}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
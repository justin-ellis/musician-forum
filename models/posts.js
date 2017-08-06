const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
	img: {type: String, required: true},
	descr: {type: String, required: true},
	category: {type: String},
	sound: {type: String}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;
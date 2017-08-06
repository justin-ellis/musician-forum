const mongoose = require('mongoose');

const memberSchema = mongoose.Schema({
	username: {type: String, required: true}
});

const Member = mongoose.model('Member', memberSchema);

module.exports = Member;
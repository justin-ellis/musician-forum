const mongoose = require('mongoose');

const TopicSchema = new mongoose.Schema({
 category: String
});





module.exports = mongoose.model('TopicSchema', TopicSchema);
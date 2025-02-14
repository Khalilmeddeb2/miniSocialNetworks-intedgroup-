const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    message: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    post: { type: mongoose.Schema.Types.ObjectId, ref: 'Post', required: true },
}, { timestamps: true });


const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;
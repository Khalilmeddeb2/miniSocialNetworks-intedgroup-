const Comment = require('../models/comment');
const Post = require('../models/post');

// Service to create a new comment
exports.createComment = async (postId, userId, message) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }
    const comment = new Comment({
        message,
        user: userId,
        post: postId,
    });
    return comment.save();
};

// Service to get all comments for a specific post
exports.getCommentsByPostId = async (postId) => {
    return Comment.find({ post: postId })
        .populate('user', 'firstName lastName')
        .sort({ createdAt: -1 });
};

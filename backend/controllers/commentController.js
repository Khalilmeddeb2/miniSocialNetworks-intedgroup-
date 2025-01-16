const commentService = require('../services/commentService');

// Controller to create a new comment
exports.createComment = async (req, res) => {
    const { message } = req.body; 
    const { postId } = req.params; 

    try {
        const comment = await commentService.createComment(postId, req.userId, message); 
        res.status(201).json(comment);
    } catch (err) {
        const status = err.message === 'Post not found' ? 404 : 400;
        res.status(status).json({ message: err.message });
    }
};

// Controller to get all comments for a post
exports.getCommentsByPostId = async (req, res) => {
    const { postId } = req.params; // Extract postId from request parameters

    try {
        const comments = await commentService.getCommentsByPostId(postId);
        res.status(200).json(comments);
    } catch (err) {
        res.status(400).json({ message: 'Error retrieving comments', error: err.message });
    }
};

const postService = require('../services/postService');

// Controller to create a new post
exports.createPost = async (req, res) => {
    const { message } = req.body;
    try {
        const post = await postService.createPost(message, req.userId);
        res.status(201).json(post);
    } catch (err) {
        res.status(400).json({ message: 'Error creating the post', error: err.message });
    }
};

// Controller to get all posts
exports.getAllPosts = async (req, res) => {
    try {
        const posts = await postService.getAllPosts();
        res.status(200).json(posts);
    } catch (err) {
        res.status(500).json({ message: 'Server error', error: err.message });
    }
};

// Controller to like or unlike a post
exports.toggleLikePost = async (req, res) => {
    const { postId } = req.params;
    try {
        const post = await postService.toggleLikePost(postId, req.userId);
        res.status(200).json(post);
    } catch (err) {
        const status = err.message === 'Post not found' ? 404 : 500;
        res.status(status).json({ message: err.message });
    }
};

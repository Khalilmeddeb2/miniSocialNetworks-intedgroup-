const Post = require('../models/post');

// Service to create a new post
exports.createPost = async (message, userId) => {
    const post = new Post({ message, user: userId });
    return post.save(); // Save and return the post
};

// Service to get all posts
exports.getAllPosts = async () => {
    return Post.find().populate('user', 'firstName lastName').sort({ createdAt: -1 });
};

// Service to like or unlike a post
exports.toggleLikePost = async (postId, userId) => {
    const post = await Post.findById(postId);
    if (!post) {
        throw new Error('Post not found');
    }

    if (post.likes) {
        const index = post.likes.indexOf(userId);
        if (index > -1) {
            post.likes.splice(index, 1);
        } else {
            post.likes.push(userId);
        }
    } else {
        post.likes = [userId];
    }
    return post.save(); 
};

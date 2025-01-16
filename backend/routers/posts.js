const express = require('express');
const postController = require('../controllers/postController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/', auth.verifyToken, postController.createPost);
router.get('/', postController.getAllPosts);
router.put('/like/:postId', auth.verifyToken, postController.toggleLikePost);

module.exports = router;

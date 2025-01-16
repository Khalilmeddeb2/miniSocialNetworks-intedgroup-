const express = require('express');
const commentController = require('../controllers/commentController');
const auth = require('../middleware/auth');
const router = express.Router();

router.post('/:postId', auth.verifyToken, commentController.createComment);
router.get('/:postId', commentController.getCommentsByPostId);

module.exports = router;

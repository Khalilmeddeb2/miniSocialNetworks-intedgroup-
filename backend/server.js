require('./db');
const express = require('express');
const cors = require("cors");
const app = express();

// Middleware
app.use(express.json());
app.use(cors({
    origin: "*",
}));

// Routers
const userRouter = require('./routers/users');
const postRouter = require('./routers/posts');
const commentRouter = require('./routers/comments');

// Routes
app.use('/api/users', userRouter);
app.use('/api/posts', postRouter);
app.use('/api/comments', commentRouter);

// Server setup
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

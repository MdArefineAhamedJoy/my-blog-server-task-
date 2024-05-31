const express = require('express');
const { createBlog, getBlogs, getBlogById, updateBlog, deleteBlog } = require('../controllers/blogController');
const router = express.Router();

router.post('/blogs', createBlog);
router.get('/blogs', getBlogs);
router.get('/blogs/:id', getBlogById);
router.put('/blogs/:id', updateBlog);
router.delete('/blogs/:id', deleteBlog);

module.exports = router;

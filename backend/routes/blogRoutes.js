const express=require('express')
const { requireSignIn } = require('../middleware/authMiddleware')
const { createBlogController,getAllBlogsController,getSingleBlog,getAllUserBlog} = require('../controllers/blogController')
const router=express.Router()

router.post('/create-blog',requireSignIn,createBlogController)
router.get('/get-all-blogs',getAllBlogsController)
router.get('/get-blog/:slug',getSingleBlog)
router.get('/get-all-user-blog',requireSignIn,getAllUserBlog)

module.exports=router
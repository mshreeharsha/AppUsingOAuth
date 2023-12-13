const express=require('express')
const { requireSignIn } = require('../middleware/authMiddleware')
const { createBlogController,getAllBlogsController,getSingleBlog,getAllUserBlog} = require('../controllers/blogController')
const router=express.Router()
const formidable = require('express-formidable')

router.post('/create-blog',requireSignIn,formidable(),createBlogController)
router.get('/get-all-blogs',getAllBlogsController)
router.get('/get-blog/:bid',getSingleBlog)
router.get('/get-all-user-blog',requireSignIn,getAllUserBlog)

module.exports=router
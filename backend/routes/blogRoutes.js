const express=require('express')
const { requireSignIn } = require('../middleware/authMiddleware')
const { createBlogController,getAllBlogsController,getSingleBlog,getAllUserBlog,updateBlogController,getPhotoController} = require('../controllers/blogController')
const router=express.Router()
const formidable = require('express-formidable')

router.post('/create-blog',requireSignIn,formidable(),createBlogController)
router.put('/update-blog/:bid',requireSignIn,formidable(),updateBlogController)
router.get('/get-all-blogs',getAllBlogsController)
router.get('/get-photo/:bid',getPhotoController)
router.get('/get-blog/:bid',getSingleBlog)
router.get('/get-all-user-blog',requireSignIn,getAllUserBlog)

module.exports=router
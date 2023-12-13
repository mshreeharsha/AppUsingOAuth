//File System
const fs = require('fs');
const Blog = require('../models/blogModel');
const User = require('../models/userModel')


const createBlogController = async(req,res)=>{
    try{
        const {title,contentIntro,contentMain,contentConclusion}  = req.fields

        const {photo} = req.files

        let error=[]
        if(!title){
            error.push('title')
        }
        if(!contentIntro){
            error.push('intro')
        }
        if(!contentMain){
            error.push('main')
        }
        if(!contentConclusion){
            error.push('conclusion')
        }

        if(error.length>0){
            return res.send({
                success:false,
                message:'All Fields have to be Filled'
            })
        }

        const newBlog = new Blog({
            ...req.fields,author:req.user._id
        })
        if(photo){
            newBlog.photo.data = fs.readFileSync(photo.path)

            newBlog.photo.contentType=photo.type
        }

        await newBlog.save()

        await User.findOneAndUpdate({_id:req.user._id},
            {$push : {blogs: newBlog._id}},
            {new : true})

        res.status(200).send({
            success:true,
            message:'New Blog Successfully Created'
        })
    }
    catch(error){
        console.log(error)
        res.status(500).send({
            success:false,
            message:error.message
        })
    }
}

const getAllBlogsController =async(req,res)=>{

}

const getSingleBlog = async(req,res)=>{

}

const getAllUserBlog = async(req,res)=>{

}

module.exports = {createBlogController,getAllBlogsController,getSingleBlog,getAllUserBlog}
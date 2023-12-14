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
        res.status(400).send({
            success:false,
            message:error.message
        })
    }
}

const updateBlogController = async(req,res)=>{
    try{

        const existingBlog = await Blog.findById(req.params.bid).select("author")
        if(existingBlog.author!=req.user._id){
            return res.status(403).send({
                success:false,
                message:"User is not Authorized to Edit Someone else's Blog!!"
            })
        }

        const {title,contentIntro,contentMain,contentConclusion} = req.fields
        const {photo}=req.files

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

        const updatedBlog = await Blog.findOneAndUpdate({_id:req.params.bid},{
            ...req.fields,
            author:req.user._id
        },{new : true})

        if(photo){
            updatedBlog.photo.data = fs.readFileSync(photo.path)

            updatedBlog.photo.contentType=photo.type
        }
        
        await updatedBlog.save()

        res.status(200).send({
            success:true,
            message:'Blog Updated Successfully'
        })

    }
    catch(error){
        res.status(400).send({
            success:false,
            message:'Error in Updating the Blog',
            error
        })
    }
}

const getAllBlogsController =async(req,res)=>{
    try{
        const allBlogs=await Blog.find({}).sort({createdAt:-1}).select("-photo -contentMain -contentConclusion")
        res.status(200).send({
            success:true,
            message:'Fectched all Blogs',
            allBlogs
        })
    }
    catch(error){
        res.status(400).send({
            success:false,
            message:'Fetching all Blogs Failed!!',
            error
        })
    }
}

const getSingleBlog = async(req,res)=>{
    try{
        const blog = await Blog.findOne({_id:req.params.bid}).select("-photo")
        res.status(200).send({
            success:true,
            message:'Successfully Fteched One Blog',
            blog
        })
    }
    catch(error){
        res.status(400).send({
            success:false,
            message:'Error in Fetching Single Blog',
            error
        })
    }
}

const getAllUserBlog = async(req,res)=>{
    try{
        const allBlogs=await Blog.find({ _id: { $in: req.user.blogs }}).sort({createdAt:-1}).select("-photo -contentMain -contentConclusion")
        res.status(200).send({
            success:true,
            message:'Fetched All User',
            allBlogs
        })
    }
    catch(error){
        res.status(400).send({
            success:'false',
            message:"Error in Fetching User's all Blogs",
            error
        })
    }
}

const getPhotoController = async(req,res)=>{
    try{
        const exisitingBlog= await Blog.findOne({_id:req.params.bid}).select("photo")
        if(exisitingBlog.photo.data){
            res.set('Content-type',exisitingBlog.photo.contentType);
            return res.status(200).send(exisitingBlog.photo.data);
        }
    }
    catch(error){
        res.status(400).send({
            success:false,
            message:'Error in Fetching the Photo',
            error
        })
    }
}

const deleteBlogController = async(req,res)=>{
    try{
        const existingBlog=await Blog.findById(req.params.bid).select("author")
        if(existingBlog.author!=req.user._id){
            return res.status(403).send({
                success:false,
                message:"User cant delete Someone else's Blog"
            })
        }

        await User.findOneAndUpdate({_id:req.user._id},
            {$pull : {blogs: req.params.bid}},{new:true})
        
        await Blog.findOneAndDelete({_id:req.params.bid}).select("-photo")
        res.status(200).send({
            success:true,
            message:'Blog Deleted Successfully!!'
        })
    }
    catch(error){
        res.status(400).send({
            success:false,
            message:'Error in Deleteing the Blog',
            error
        })
    }
}

module.exports = {createBlogController,getAllBlogsController,getSingleBlog,getAllUserBlog,updateBlogController,getPhotoController,deleteBlogController}
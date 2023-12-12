const mongoose=require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    slug:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.ObjectId,
        ref:'User'
    },
    image:{
        type:'String',
        required:true
    },
    contentIntro:{
        type:String,
        required:true
    },
    contentMain:{
        type:String,
        required:true
    },
    contentConclusion:{
        type:String,
        required:true
    }
},{timestamps:true})

const Blog=mongoose.model('blog',blogSchema)
module.exports = Blog
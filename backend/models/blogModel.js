const mongoose=require('mongoose')
const Schema = mongoose.Schema

const blogSchema = new Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:mongoose.ObjectId,
        ref:'User'
    },
    photo:{
        data:Buffer,
        contentType:String
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
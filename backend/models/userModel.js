const mongoose=require('mongoose')
const Schema=mongoose.Schema

const userSchema = new Schema({
    username:{
        type:String,
        required:true
    },
    password:{
        type:String
    },
    googleID:{
        type:String
    },
    githubID:{
        type:String
    },
    email:{
        type:String
    },
    avatar:{
        type:String
    },
    blogs:[
        {
            type:mongoose.ObjectId,
            ref:'Blog'
        }
    ]
},{timestamps:true})

const User=mongoose.model('user',userSchema)
module.exports = User
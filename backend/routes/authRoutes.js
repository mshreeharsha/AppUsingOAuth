const express=require('express')
const passport = require('passport')
const router=express.Router()

router.get('/google',passport.authenticate('google',{
    scope:["profile","email"]
}))

router.get('/google/login-success',(req,res)=>{
    if(req.user){
        res.status(200).send({
            success:true,
            message:'User SuccessFully Logged in',
            user:{
                user:req.user,
                cookie:req.cookies
            }
        })
    }
    else{
        res.status(401).send({
            success:false,
            message:'User Not Logged in'
        })
    }
})

router.get('/google/redirect',passport.authenticate('google',{
    successRedirect:'http://localhost:3000',
    failureRedirect:'http://localhost:3000/login'
}))

router.get('/logout',(req,res)=>{
    req.logout()
})

module.exports=router
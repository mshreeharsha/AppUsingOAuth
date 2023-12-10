const express=require('express')
const passport = require('passport')
const router=express.Router()

router.get('/google',passport.authenticate('google',{
    scope:["profile"]
}))

router.get('/google/redirect',passport.authenticate('google'),
(req,res)=>{
    res.send({
        success:true,
        message:'User Logged in Successfully',
        user:req.user.user,
        token:req.user.token
    })
})

module.exports=router
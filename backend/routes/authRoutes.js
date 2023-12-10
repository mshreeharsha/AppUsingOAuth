const express=require('express')
const passport = require('passport')
const router=express.Router()

router.get('/google',passport.authenticate('google',{
    scope:["profile","email"]
}))

router.get('/google/redirect',passport.authenticate('google',{
    successRedirect:'http://localhost:3000/profile',
    failureRedirect:'http://localhost:3000/login'
}))

module.exports=router
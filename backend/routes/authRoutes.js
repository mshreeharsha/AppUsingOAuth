const express=require('express')
const passport = require('passport')
const router=express.Router()
const User = require('../models/userModel')
const bcrypt=require('bcryptjs')

router.get('/google',passport.authenticate('google',{
    scope:["profile","email"],
    prompt: 'consent',
    access_type: 'offline'
}))

router.get('/google/login-success',(req,res)=>{
    if(req.user){
        res.status(200).send({
            success:true,
            message:'User SuccessFully Logged in',
            user:req.user
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

router.post('/register',async(req,res)=>{
    console.log(req.body)
    const {username, email, password} = req.body
    let error=[]
    if(!username){
        error.push('username')
    }
    if(!email){
        error.push('email')
    }
    if(!password){
        error.push('password')
    }
    if(error.length>=1){
        return res.send({
            success:false,
            message:'All fields must be filled!!'
        })
    }
    else{
        const existingUser=await User.findOne({email:email})
        if(existingUser){ //Does not allow same email to be registered again
            return res.status(201).send({
                success:false,
                message:"User already exists"
            })
        }
        else{
            // Hash the password using bcrypt module (encoding password)
            const hashedPassword=await bcrypt.hashSync(password, 10)
                    
            const newUser=await new User({
                username: username,
                email: email,
                password: hashedPassword,
            }).save()
            return res.status(200).send({
                success:true,
                message:'User Registered!!',
                user:newUser
            })
        }
    }
})

router.post('/login', passport.authenticate('local', {
    failureRedirect: 'http://localhost:4000/auth/login-failure',
    failureFlash: true
}),(req,res)=>{
    console.log('req.isAuthenticated():', req.isAuthenticated());
    console.log('req.user:', req.user);
    res.send({
        success:true,
        message:'Login Successful!!',
        user:req.user
    })
});

router.get('/login-failure', (req, res) => {
    console.log(req.flash('error'))
    const errorMessage = req.flash('error')[0] || 'Login failed.';
    res.send({
        success:false,
        message:errorMessage
    })
});
  

router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect('http://localhost:3000/login')
})

module.exports=router
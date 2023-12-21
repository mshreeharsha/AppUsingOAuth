const express=require('express')
const passport = require('passport')
const router=express.Router()
const User = require('../models/userModel')
const bcrypt=require('bcryptjs')
const { requireSignIn } = require('../middleware/authMiddleware')

const backendURL = 'https://app-using-o-auth-api.vercel.app'
const frontendURL = 'https://app-using-o-auth-frontend.vercel.app'

//Route for sending response after being logged in
router.get('/google/login-success',(req,res)=>{
    if(req.user){
        res.status(200).send({
            success:true,
            message:'User SuccessFully Logged in',
            user:req.user._id
        })
    }
    else{
        res.status(401).send({
            success:false,
            message:'User Not Logged in'
        })
    }
})

//Google OAuth Consent Screen Route
router.get('/google',passport.authenticate('google',{
    scope:["profile","email"],
    prompt: 'consent',
    access_type: 'offline'
}))

//Github OAuth Consent Screen Route
router.get('/github',passport.authenticate('github',{
    scope:["profile","email"],
    prompt: 'consent',
    access_type: 'offline'
}))

//Google OAuth Redirect/Callback Route
router.get('/google/redirect',passport.authenticate('google',{
    successRedirect:frontendURL,
    failureRedirect:`${frontendURL}/login`
}))

//Github OAuth Redirect/Callback Route
router.get('/github/redirect',passport.authenticate('github',{
    successRedirect:frontendURL,
    failureRedirect:`${frontendURL}/login`
}))

//Manual Register Route
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

//Manual Login Route
router.post('/login', passport.authenticate('local', {
    failureRedirect:`${backendURL}/auth/login-failure-response`,
    failureFlash: true
}),(req,res)=>{
    // console.log('req.isAuthenticated():', req.isAuthenticated());
    // console.log('req.user:', req.user);
    res.send({
        success:true,
        message:'Login Successful!!',
        user:req.user._id
    })
});

//Response for Login Failure
router.get('/login-failure-response',(req,res)=>{
    res.send({
        success:false,
        message:'Login Failed!!'
    })
})

//Displaying the Error causing the Login Failure Route
router.get('/login-failure', (req, res) => {
    const errorMessage=req.flash('error')[0]
    //Flash messages are typically consumed after a redirect, or first time use
    res.send({
        success:false,
        message:errorMessage
    })
});
  
//Logout Route
router.get('/logout',(req,res)=>{
    req.logout()
    res.redirect(`${frontendURL}/login`)
})

router.get('/getUser',requireSignIn,(req,res)=>{
    res.status(200).send({
        success:true,
        message:'User Fetched Successfully!!',
        user:req.user
    })
})

module.exports=router
const passport=require('passport')
const GoogleStatergy = require('passport-google-oauth20')
const keys=require('./keys')
const User=require('../models/userModel')

passport.serializeUser((user,done)=>{
    done(null,user._id)
})

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
        if(user){
            done(null,user)
        }
    })
})

passport.use(new GoogleStatergy({
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:'/auth/google/redirect'
    },(accessToken,refreshToken,profile,done)=>{
        console.log(profile)

        User.findOne({googleID:profile.id}).then((user)=>{
            if(user){
                //User already Exist
                done(null,user)
            }
            else{
                new User({
                    username:profile.displayName,
                    googleID:profile.id
                }).save()
                .then((newUser)=>{
                    console.log(`New User Created : ${newUser}`)
                    done(null,newUser)
                })
            }
        })
    }
))
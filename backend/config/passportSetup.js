const passport=require('passport')
const GoogleStrategy = require('passport-google-oauth20')
const GithubStrategy = require('passport-github2').Strategy
const LocalStrategy = require('passport-local').Strategy
const User=require('../models/userModel')
const bcrypt = require('bcryptjs')

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

passport.use(new GoogleStrategy({
        clientID:process.env.clientIDGoogle,
        clientSecret:process.env.clientSecretGoogle,
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
                    googleID:profile.id,
                    email:profile._json.email,
                    avatar:profile._json.picture
                }).save()
                .then((newUser)=>{
                    console.log(`New User Created : ${newUser}`)
                    done(null,newUser)
                })
            }
        })
    }
))

passport.use(new GithubStrategy({
        clientID:process.env.clientIDGithub,
        clientSecret:process.env.clientSecretGithub,
        callbackURL:'/auth/github/redirect'
    },(accessToken,refreshToken,profile,done)=>{
        console.log(profile)

        User.findOne({githubID:profile.id}).then((user)=>{
            if(user){
                //User already Exist
                done(null,user)
            }
            else{
                new User({
                    username:profile.username,
                    githubID:profile.id,
                    email:profile._json.email,
                    avatar:profile._json.avatar_url
                }).save()
                .then((newUser)=>{
                    console.log(`New User Created : ${newUser}`)
                    done(null,newUser)
                })
            }
        })
    }
))

passport.use(new LocalStrategy({usernameField:'email',passwordField:'password'},(email,password,done)=>{
    let error=[]
    if(!email){error.push('email')}
    if(!password){error.push('password')}

    if(error.length>=1){
        done(null,false,{message:'Email or Password is Missing!!'})
    }
    User.findOne({email:email}).then((existingUser)=>{
        if(existingUser){
            if(!existingUser.password){
                done(null,false,{message:'Email is not Registered!!'})
            }
            else{
                //Comparing the Stored Password with the user entered Password
                const isMatch = bcrypt.compareSync(password, existingUser.password);
                if (isMatch) {
                    // console.log('Everything correct'," ",existingUser)
                    done(null, existingUser);
                } else {
                    done(null, false, { message: 'Password is Incorrect' });
                }
            }
        }
        else{
            console.log('Not registered')
            done(null,false,{message:'Email is Not Registered!!'})
        }
    })
}))
const passport=require('passport')
const GoogleStatergy = require('passport-google-oauth20')
const keys=require('./keys')

passport.use(new GoogleStatergy({
        clientID:keys.google.clientID,
        clientSecret:keys.google.clientSecret,
        callbackURL:'/auth/google/redirect'
    },(accessToken,refreshToken,profile,done)=>{
        console.log(profile)
    }
))
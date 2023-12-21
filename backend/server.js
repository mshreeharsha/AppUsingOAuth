const express=require('express')
const app=express()
const keys=require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const cors=require('cors')
const cookieSession=require('cookie-session')
const flash = require('connect-flash');


//DataBase Setup
const databaseSetup=require('./config/databaseSetup')

//cors
app.use(cors())

//Passport Setup
const passportSetup=require('./config/passportSetup')
const passport = require('passport')

//CookieSession
app.use(cookieSession({
    maxAge:24*60*60*1000, //1 day
    keys:[keys.cookieSession.secretKey]
}))

//flash
app.use(flash());

//Initializing passport
app.use(passport.initialize())
app.use(passport.session())

//has to be above the routes
app.use(express.json())
//Routes
app.use('/auth',authRoutes)
app.use('/blog',blogRoutes)

app.listen(keys.PORT,()=>{
    console.log(`Server Listining at Port ${keys.PORT}`)
})
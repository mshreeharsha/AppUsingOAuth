const express=require('express')
const app=express()
const authRoutes = require('./routes/authRoutes')
const blogRoutes = require('./routes/blogRoutes')
const cors=require('cors')
const cookieSession=require('cookie-session')
const flash = require('connect-flash');
require('dotenv').config()

//DataBase Setup
const databaseSetup=require('./config/databaseSetup')

//cors
app.use(cors({
    origin:["http://localhost:3000"],
    methods:["GET","POST","PUT","DELETE"],
    credentials:true
}))

//Passport Setup
const passportSetup=require('./config/passportSetup')
const passport = require('passport')

//CookieSession
app.use(cookieSession({
    maxAge:24*60*60*1000, //1 day
    keys:[process.env.secretKey]
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

app.listen(process.env.PORT,()=>{
    console.log(`Server Listining at Port ${process.env.PORT}`)
})
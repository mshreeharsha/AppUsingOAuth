const express=require('express')
const app=express()
const keys=require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const cors=require('cors')
const cookieSession=require('cookie-session')
const flash = require('express-flash');

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

//Initializing passport
app.use(passport.initialize())
app.use(passport.session())

//flash
app.use(flash());

app.use(express.json())
//Routes
app.use('/auth',authRoutes)


app.listen(keys.PORT,()=>{
    console.log(`Server Listining at Port ${keys.PORT}`)
})
const express=require('express')
const app=express()
const keys=require('./config/keys')
const authRoutes = require('./routes/authRoutes')
const cors=require('cors')

//DataBase Setup
const databaseSetup=require('./config/databaseSetup')

//Passport Setup
const passportSetup=require('./config/passportSetup')

//cors
app.use(cors())

//Routes
app.use('/auth',authRoutes)

app.listen(keys.PORT,()=>{
    console.log(`Server Listining at Port ${keys.PORT}`)
})
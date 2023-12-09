const express=require('express')
const app=express()
const keys=require('./config/keys')

//DataBase Setup
const databaseSetup=require('./config/databaseSetup')

app.listen(keys.PORT,()=>{
    console.log(`Server Listining at Port ${keys.PORT}`)
})
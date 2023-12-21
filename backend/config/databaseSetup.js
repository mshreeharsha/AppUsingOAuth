const mongoose=require('mongoose')
const keys=require('./keys')
mongoose.connect(keys.database.mongoURI).then(()=>{
    console.log('Connected to Database!!')
})
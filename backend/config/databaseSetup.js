const mongoose=require('mongoose')

mongoose.connect(process.env.mongoURI).then(()=>{
    console.log('Connected to Database!!')
})
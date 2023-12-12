//Require SigIn MiddleWare
const requireSignIn = (req,res,next)=>{
    if(req.isAuthenticated()){
        next()
    }
    else{
        return res.status(401).send({
            success:false,
            message:'User is not Authenticated!!'
        })
    }
}

module.exports = {requireSignIn}
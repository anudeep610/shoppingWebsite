const jwt=require("jsonwebtoken");
const env=require("dotenv");

env.config();

exports.requireSignIn=(req,res,next)=>{
    if(req.headers.authorization)
    {
        const token=req.headers.authorization.split(" ")[1];
        const user=jwt.verify(token,process.env.secret_key);
        req.user=user;
        next();
    }else{
        res.status(400).send({message:"auth token required"});
    }
}
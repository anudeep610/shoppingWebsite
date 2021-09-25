const jwt=require("jsonwebtoken");
const env=require("dotenv");

env.config();

exports.requireSignIn=(req,res,next)=>{
    const token=req.headers.authorization.split(" ")[1];
    const user=jwt.verify(token,process.env.secret_key);
    req.user=user;
    next();
}
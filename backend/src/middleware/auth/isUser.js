exports.isUser=(req,res,next)=>{
    if(req.user.role==="user")
        next();
    else
        res.status(400).send({message:"access denied"});
}
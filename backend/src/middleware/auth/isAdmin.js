exports.isAdmin=(req,res,next)=>{
    if(req.user.role==="admin")
        next();
    else
        res.status(400).send({message:"access denied"});
}
const {validationResult}=require("express-validator");

exports.isRequestValidated=(req,res,next)=>{
    const errors = validationResult(req);
    if(errors.array().length>0){
        return res.status(400).send({error:errors.array()[0].msg});
    }
    else
        next();
}
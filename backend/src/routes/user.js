const express=require("express");
const router=express.Router();
const User=require("../models/user");
router.post("/signin",(req,res)=>{

});

router.post("/signup",async(req,res)=>{
    try{
        const foundUser=await User.findOne({email:req.body.email});
        if(foundUser){
            res.status(200).send({message:"user already exists"});
        }
        else{
            const newUser=new User({
                ...req.body
            });
            await newUser.save();
            res.status(201).send({message:"user created successfully!!!!"});
        }
    }catch(err){
        res.status(400).send({message:err});
    }
    
});

module.exports=router;
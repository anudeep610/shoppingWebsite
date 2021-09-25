const express=require("express");
const router=express.Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const env=require("dotenv");
const {requireSignIn}=require("../middleware/middleware");

env.config();

router.post("/signin",async(req,res)=>{
    try{
        const foundUser=await User.findOne({email:req.body.email});
        if(!foundUser){
            res.status(404).send({message:"no user exists"});
        }
        else{
            if(foundUser.authenticate(req.body.password))
            {
                const token=jwt.sign({id:foundUser._id,name:foundUser.name,email:foundUser.email,username:foundUser.username,role:foundUser.role},process.env.secret_key,{expiresIn:'1h'});
                res.status(200).send({message:"loged in successfully",token:token,username:foundUser.username});
            }
            else
                res.status(200).send({message:"wrong password"});
        }
    }catch(err){
        res.status(400).send({message:err});
    }
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

router.post("/profile",requireSignIn,(req,res)=>{
    res.status(200).send(req.user);
});

module.exports=router;
const express=require("express");
const router=express.Router();
const User=require("../models/user");
const jwt=require("jsonwebtoken");
const env=require("dotenv");
const {requireSignIn}=require("../middleware/auth/requireSignIn");
const {validateSignUpRequest}=require("../middleware/auth/validateSignUpRequest");
const {validateSignInRequest}=require("../middleware/auth/validateSignInRequest");
const {isRequestValidated}=require("../middleware/auth/isRequestValidated");
const shortid=require("shortid"); 
env.config();

router.post("/signin",validateSignInRequest,isRequestValidated,async(req,res)=>{
    try{
        const foundUser=await User.findOne({email:req.body.email});
        if(!foundUser){
            res.status(404).send({message:"no user exists"});
        }
        else{
            if(foundUser.authenticate(req.body.password))
            {
                const token=jwt.sign({_id:foundUser._id,role:foundUser.role},process.env.secret_key,{expiresIn:'1h'});
                const { _id, email, role, name, username } = foundUser;
                res.cookie("token",token,{expiresIn:"1h"});
                res.status(200).json({
                    token,
                    user: {_id, email, role, name, username}
                });
            }
            else
                res.status(400).send({message:"wrong password"});
        }
    }catch(err){
        res.status(400).send({message:err});
    }
});

router.post("/signup",validateSignUpRequest,isRequestValidated,async(req,res)=>{
    try{
        const foundUser=await User.findOne({email:req.body.email});
        if(foundUser){
            res.status(200).send({message:"user already exists"});
        }
        else{
            const newUser=new User({
                ...req.body
            });
            // newUser.username=shortid.generate();
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

router.post("/signout", requireSignIn, (req,res)=>{
    res.clearCookie("token");
    res.status(200).send({message:"signed out successfully"});
});

module.exports=router;
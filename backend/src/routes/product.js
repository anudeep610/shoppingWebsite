const express=require("express");
const router=express.Router();
const multer=require("multer");
const shortid=require("shortid");
const path=require("path");
const slugify=require("slugify");

const {requireSignIn}=require("../middleware/auth/requireSignIn");
const {isAdmin}=require("../middleware/auth/isAdmin");

const Product=require("../models/product");

const storage=multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(path.dirname(__dirname),"uploads"))
    },
    filename:function(req,file,cb){
        cb(null,shortid.generate() + "-" + file.originalname) 
    }
});
const upload=multer({storage});

router.post("/product/create",requireSignIn,isAdmin,upload.array("pictures"),async(req,res)=>{
    try{
        const{
            name,price,description,category,createdBy,quantity
        }=req.body;
        let pictures=[]
        if(req.files.length>0)
        {
            pictures=req.files.map(file=>{
                return {img:file.filename }
            })
        }
        const newProduct=new Product({
            name,
            slug:slugify(name),
            price,
            description,
            pictures,
            quantity,
            category,
            createdBy:req.user._id
        });
        await newProduct.save();
        res.status(201).send(newProduct);
    }catch(err){
        res.status(400).send({message:err})
    }
});
module.exports=router;
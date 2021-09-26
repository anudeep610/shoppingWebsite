const express=require("express");
const router=express.Router();

const Cart=require("../models/cart");
const {requireSignIn}=require("../middleware/auth/requireSignIn");
const {isUser}=require("../middleware/auth/isUser");

router.post("/cart/addtocart",requireSignIn,isUser,async(req,res)=>{
    try{
        let cart = await Cart.findOne({user:req.user._id});
        if(cart)
        {
            const item = cart.cartItems.find(c=>c.product == req.body.cartItems.product)
            if(item)
            {
                Cart.findOneAndUpdate({"user":req.user._id,"cartItems.product":req.body.cartItems.product},{
                    "$set":{
                        "cartItems.$":{
                            ...req.body.cartItems,
                            quantity: item.quantity + req.body.cartItems.quantity
                        }
                    }
                }).exec((error,_cart)=>{
                    if(error) return res.status(400).send({message:error});
                    if(_cart){
                        return res.status(201).send({cart:_cart});
                    }
                });
            }else{
                Cart.findOneAndUpdate({user:req.user._id},{
                    "$push":{
                        "cartItems":req.body.cartItems
                    }
                }).exec((error,_cart)=>{
                    if(error) return res.status(400).send({message:error});
                    if(_cart){
                        return res.status(201).send({cart:_cart});
                    }
                });
            }
        }else{
            const cart = new Cart({
                user:req.user._id,
                cartItems:[req.body.cartItems]
            });
            await cart.save();
            res.status(201).send({cart});
        }
    }catch(err){
        res.status(400).send({message:err});
    }
});

module.exports=router;
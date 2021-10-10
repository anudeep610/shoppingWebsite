const { requireSignin, isUser } = require("../middleware/auth/isUser");
const router = require("express").Router();
const Order=require("../models/order");

router.post("/addOrder", requireSignin, isUser, async(req,res)=>{
    try{
        let orders = await Order.find({user:req.user._id})
        .select("_id paymentStatus paymentType orderStatus items")
        .populate("items.productId", "_id name pictures");
        res.status(200).send(orders);
    }catch(err){
        res.status(400).send({message:err});
    }
});
// router.get("/getOrders", requireSignin, isUser,);
// router.post("/getOrder", requireSignin, isUser, );

module.exports = router;
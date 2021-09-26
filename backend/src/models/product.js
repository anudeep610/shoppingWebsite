const mongoose=require("mongoose");

const productSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true
    },
    slug:{
        type:String,
        required:true,
        unique:true
    },
    price:{
        type:Number,
        required:true
    },
    description:{
        type:String,
        required:true,
        trim:true
    },
    offer:{
        type:Number
    },
    pictures:[
        {img:{type:String}}
    ],
    reviews:[
        {
            userId:{type:mongoose.Schema.Types.ObjectId, ref:"User"},
            review:String
        }
    ],
    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    quantity:{
        type:Number,
        required:true,
        min:1
    },
    category:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Category",
        required:true
    }
},{timestamps:true});

module.exports=mongoose.model("Product",productSchema);
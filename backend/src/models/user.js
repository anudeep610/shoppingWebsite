const mongoose=require("mongoose");
const bycrypt=require("bcrypt");

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:true,
        trim:true,
        min:3,
        max:40
    },
    username:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        index:true,
        lowercase:true
    },
    email:{
        type:String,
        required:true,
        trim:true,
        unique:true,
        lowercase:true
    },
    hash_password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        enum:["user","admin"],
        default:"user"
    },
    phNo:{type:String}
}, {timestamps:true});

// userSchema.virtual("password").set(function(password){
//     this.hash_password=bycrypt.hashSync(password,5);
// });

userSchema.methods={
    authenticate:async function(password){
        return await bycrypt.compare(password,this.hash_password);
    }
}
module.exports=mongoose.model("User",userSchema);
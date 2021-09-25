require("./db/mongoose");
const express=require("express");
const env=require("dotenv");
const app = express();

//routes
const userRoute=require("./routes/user");

env.config();

app.use(express.json());
app.use(userRoute);

app.all("/*",(req,res)=>{
    res.status(404).send({message:"no page found"});
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});
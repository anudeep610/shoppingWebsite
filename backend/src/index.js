require("./db/mongoose");
const express=require("express");
const env=require("dotenv");
const app = express();



env.config();

app.use(express.json());

app.get("/",(req,res,next)=>{
    res.status(200).send({message:"hello there"});
});

app.post("/data",(req,res,next)=>{
    res.status(200).send(req.body);
});

app.all("/*",(req,res)=>{
    res.status(404).send({message:"no page found"});
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});
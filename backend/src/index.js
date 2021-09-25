require("./db/mongoose");
const express=require("express");
const env=require("dotenv");
const app = express();

//routes
const authRoute=require("./routes/auth");

env.config();

app.use(express.json());
app.use(authRoute);

app.all("/*",(req,res)=>{
    res.status(404).send({message:"no page found"});
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});
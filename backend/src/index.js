require("./db/mongoose");
const express=require("express");
const env=require("dotenv");
const app = express();
const path = require('path')
const cors=require("cors");

//routes
const authRoute=require("./routes/auth");
const categoryRoute=require("./routes/category");
const productRoute=require("./routes/product");
const cartRotes=require("./routes/cart");
// const orderRoutes=require("./routes/order");

env.config();

app.use(cors());
app.use(express.json());
app.use(authRoute);
app.use(categoryRoute);
app.use(productRoute);
app.use(cartRotes);
app.use(express.static(path.join(__dirname, 'uploads')));
// app.use(orderRoutes);

app.all("/*",(req,res)=>{
    res.status(404).send({message:"no page found"});
});

app.listen(process.env.PORT,()=>{
    console.log(`server is running on ${process.env.PORT}`);
});
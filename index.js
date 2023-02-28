const express=require("express");

require("dotenv").config();

const cors=require("cors");


const {connection}=require("./config/db");
const { ProductRouter } = require("./Routes/product.route");

const app=express();

app.use(cors());

app.use(express.json());

app.get("/",(req,res)=>{
    res.send("Welcome To App");
})

app.use("/product",ProductRouter);

app.listen(process.env.port,async ()=>{
    try{
        await connection;
        console.log("Connected to DB");
    }catch(err){
        // res.send("Something went wrong");
        console.log(err)
    }
})
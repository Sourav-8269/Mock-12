const express=require("express");
const { ProductModel } = require("../model/product.model");

const ProductRouter=express.Router();

ProductRouter.get("/",async(req,res)=>{
    const category=req.query.category;
    console.log(category)
    try{
        if(category!=undefined&&typeof(category)=="string"){
            const post=await ProductModel.find({category});
            res.send(post);
        }else if(category!=undefined&&category.length>0&&typeof(category)=="object"){
            let arr=[];
            for(let i=0;i<category.length;i++){
                const post1=await ProductModel.find({category:category[i]});
                arr.push(post1);
            }
            console.log(arr.length)
            res.send(arr);
        }else{
            const post=await ProductModel.find();
            res.send(post);

        }
    }catch(err){
        res.send("Something Went Wrong");
        console.log(err);

    }
})

ProductRouter.get("/sort", async (req, res) => {
    
    const sort=req.query.q;
    console.log(sort)
    try {
        if(sort=="asc"){
            let data=await ProductModel.find({}).sort({postedAt:1});
              res.send(data)
        }else if(sort=="desc"){
            let data=await ProductModel.find({}).sort({postedAt:-1});
            res.send(data)
        }else{
            let data=await ProductModel.find({})
            res.send(data)
        }
    } catch (error) {
        console.log(error)
    }
})


ProductRouter.get("/page", async (req, res) => {
    
    const page=req.query.q;
    console.log(page)
    try {
        let data=await ProductModel.find({}).skip((page-1)*4).limit(4);
        res.send(data)
    } catch (error) {
        console.log(error)
    }
})

ProductRouter.get("/search", async (req, res) => {
    
    console.log(req.query.q)
    try {
        let data=await ProductModel.find({
            "$or":[
                {name:{$regex:req.query.q}},
                {description:{$regex:req.query.q}},
                {category:{$regex:req.query.q}}
            ]
          })
          res.send(data)
          
        
        
    } catch (error) {
        console.log(error)
    }
})

ProductRouter.post("/add",async (req,res)=>{
    let payload=req.body;
    // console.log(payload)
    try{
        const product=new ProductModel(payload);
        await product.save();
        res.send("Added Successfully");
    }catch(err){
        res.send("Something went wrong");
        console.log(err)
    }
})

ProductRouter.delete("/delete/:id",async (req,res)=>{
    const ID=req.params.id;
    try{
        await ProductModel.findByIdAndDelete({_id:ID});
        res.send(`Deleted Product Successfully with id: ${ID}`);
    }catch(err){
        res.send("Something went wrong");
        console.log(err)
    }
})

module.exports={ProductRouter};
import express, { Router, Request, Response } from "express";
import Product from "../Database/ProductSchema";

const productRouter:Router = express.Router();

//Get All Product Query Router
productRouter.get("/",async (request:Request, response:Response)=>{
    try{
        let products = await Product.find(); 
        if(!products){
            return response.status(400).json({
                message: "No Product Found"
            })
        }

        return response.status(200).json({
            products:products,
            count:products.length
        })
    }
    catch(error){
        return response.status(400).json({
            error:error,
            messge:"Unable to get Product Data"
        })
    }
});

//Get a Single Product Query Router
productRouter.get("/:productId",async (request:Request,response:Response)=>{
    try{
        let {productId} = request.params;

        let data = await Product.findById(productId);
        return response.status(200).json(data);
    }
    catch(error){
        return response.status(400).json({
            error:error
        })
    }
    
})

//Create a Product Query Router
productRouter.post("/add",async (request:Request, response:Response)=>{

    try{
        let product = request.body;
        let {name} = request.body;

        let existProduct = await Product.findOne({name:name});
        if(existProduct){
            return response.status(200).json({
                msg:"Product name already Exist"
            });
        }

        product = new Product(product);
        product = await product.save();

        return response.status(200).json({
            message:"Product Saved Succesfuly",
            product:product
        })
        
    }
    catch(error){
        return response.status(400).json({
            error:error
        })
    }
})

//Update a Product Query Router
productRouter.put("/:productId",async (request:Request, response:Response)=>{
    try{
        let {productId} = request.params;
        let product = request.body;
        let existProduct = await Product.findById(productId);
        if(!existProduct){
            return response.status(400).json({
                message: "No Product Found for Given Product Id"
            })
        }

        product = await Product.findByIdAndUpdate(productId,{$set:product},{new:true});
        
        return response.status(200).json({
            message:"Product Updated Successfully",
            product:product
        })
        

    }
    catch(error){
        return response.status(400).json({
            error:error
        })
    }
});

//Delete a Product Query Router
productRouter.delete("/:productId", async (request:Request, response:Response)=>{
    let {productId} = request.params;
    let existProduct = await Product.findById(productId);
    if(!existProduct){
        return response.status(400).json({
            message: "No Product Found for Given Product Id"
        })
    }

    let product = await Product.findByIdAndRemove(productId);
    
    return response.status(200).json({
        message:"Product Deleted Successfully",
        product:product
    })
});

export default productRouter;

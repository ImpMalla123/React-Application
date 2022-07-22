import { model, Schema } from "mongoose";
import { IProducts } from "../Models/IProduct";

const poductSchema:Schema=new Schema<IProducts>({
    name:{type:String,required:true,unique:true},
    imageUrl:{type:String,required:true,unique:false},
    price:{type:Number,required:true,unique:false},
    qty:{type:Number,required:true,unique:false},
    info:{type:String,required:false,unique:false}
},{timestamps:true});

const Product = model<IProducts>("products",poductSchema);
export default Product; 
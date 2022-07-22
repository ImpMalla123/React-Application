import { createAsyncThunk, createSlice, SerializedError } from "@reduxjs/toolkit"
import axios from "axios";
import {IProducts} from "../../Components/Products/Models/IProducts"
import ProductsService from "../../Components/Products/Services/ProductsService"
import * as productAction from "./Product.actions";


export const productFeature = "productFeature";

export interface InitialState{
    products:IProducts[];
    product:IProducts;
    loading:boolean;
    errorMessage:SerializedError;
}

const initialState:InitialState={
    loading:false,
    products: [] as IProducts[],
    product: {} as IProducts,
    errorMessage:{} as SerializedError
}

export const productSlice = createSlice({
    name:"product Slice",
    initialState:initialState,
    reducers:{},
    extraReducers:(builder)=>{
        //get all Products
        builder.addCase(productAction.getAllProductsFromServer.pending,(state,action)=>{
            state.loading=true;
        }).addCase(productAction.getAllProductsFromServer.fulfilled,(state,action)=>{
            state.products=action.payload;
            state.loading=false;
        }).addCase(productAction.getAllProductsFromServer.rejected, (state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })
        
        //get a Product
        .addCase(productAction.getProductFromServer.pending,(state,action)=>{
            state.loading=true;
        }).addCase(productAction.getProductFromServer.fulfilled,(state,action)=>{
            state.loading=false;
            state.product=action.payload;
        }).addCase(productAction.getProductFromServer.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })
        
        //Delete a Product
        .addCase(productAction.deleteProductFromServer.pending,(state,action)=>{
            state.loading=true;
        }).addCase(productAction.deleteProductFromServer.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(productAction.deleteProductFromServer.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })
        
        //Create a Product
        .addCase(productAction.createProductFromServer.pending,(state,action)=>{
            state.loading=true;
        }).addCase(productAction.createProductFromServer.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(productAction.createProductFromServer.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        //Update a Product
        .addCase(productAction.updateProductFromServer.pending,(state,action)=>{
            state.loading=true;
        }).addCase(productAction.updateProductFromServer.fulfilled,(state,action)=>{
            state.loading=false;
        }).addCase(productAction.updateProductFromServer.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })

        .addCase(productAction.searchProductsFromServer.pending,(state,action)=>{
            state.loading=true;
        }).addCase(productAction.searchProductsFromServer.fulfilled,(state,action)=>{
            state.loading=false;
            state.products = action.payload;
        }).addCase(productAction.searchProductsFromServer.rejected,(state,action)=>{
            state.loading=false;
            state.errorMessage=action.error;
        })
    }
})



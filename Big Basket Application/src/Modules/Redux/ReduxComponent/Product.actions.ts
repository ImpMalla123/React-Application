import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { IProducts } from "../../Components/Products/Models/IProducts";
import ProductsService from "../../Components/Products/Services/ProductsService";

// async action
export const getAllProductsFromServer = createAsyncThunk("getAllProductFromServer",async():Promise<any>=>{
    // const response = await axios.get(`${serverUrl}/products/`);
    let response = await ProductsService.getAllProducts();
    return response.data;
})

export const getProductFromServer = createAsyncThunk("getProductFromServer",async(productId:string):Promise<any>=>{
    // const response = await axios.get(`${serverUrl}/products/`);
    let response = await ProductsService.getProduct(productId);
    return response.data;
})

export const deleteProductFromServer = createAsyncThunk("deleteProductFromServer", async(productId: string, {dispatch}):Promise<any>=>{
    // const response = await axios.delete(`${serverUrl}/products/${productId}`);
    let response = await ProductsService.deleteProduct(`${productId}`);
    if(response){
        dispatch(getAllProductsFromServer());
    }
})

export const createProductFromServer = createAsyncThunk("createProductFromServer", async(product: IProducts):Promise<any>=>{
    // const response = await axios.delete(`${serverUrl}/products/${product}`);
    let response = await ProductsService.createProduct(product);
    return response.data;
})

export const updateProductFromServer = createAsyncThunk("updateProductFromServer", async(payload:{product: IProducts, productId:string}):Promise<any>=>{
    let {product, productId} = payload;
    let response = await ProductsService.updateProduct(product,productId);
    return response.data;
})


export const searchProductsFromServer = createAsyncThunk("searchProductsFromServer", async(productKey: string):Promise<any>=>{
    // const response = await axios.delete(`${serverUrl}/products/${productId}`);
    let response = await ProductsService.getAllProducts();
    let filterData = response.data;
    filterData.filter((item:any) => {
        return Object.values(item).join('').toLowerCase().includes(`${productKey}`.toLowerCase())
    });
    return filterData;
})
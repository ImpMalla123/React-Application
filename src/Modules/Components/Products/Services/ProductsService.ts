import { rejects } from "assert";
import axios from "axios";
import { resolve } from "path";
import { IProducts } from "../Models/IProducts";

class ProductsService{
    private static serverUrl:string | undefined = process.env.REACT_APP_JSON_SERVER_URL;
    
    /**
     * get All Products
     */
    public static getAllProducts() {
        return axios.get(`${this.serverUrl}`);
    }

    /**
     * get a Product
     */
     public static getProduct(productId:string|undefined) {
        return axios.get(`${this.serverUrl}/${productId}`);
    }

    /**
     * Delete Product
     */
    public static deleteProduct(productId:string | undefined){
        return axios.delete(`${this.serverUrl}/${productId}`);
    }

    /**
     * Create Product
     */
    public static createProduct(product:IProducts){
        return axios.post(`${this.serverUrl}/add`, product);
    }

    /**
     * Update Product
     */
     public static updateProduct(product:IProducts,productId:string){
        return axios.put(`${this.serverUrl}/${productId}`,product);
    }
}

export default ProductsService;
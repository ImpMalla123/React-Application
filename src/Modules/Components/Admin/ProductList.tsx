import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { IProducts } from "../Products/Models/IProducts";
import ProductsService from "../Products/Services/ProductsService";
import AddProduct from "./AddProduct";
import * as productReducer from "../../Redux/ReduxComponent/Product.feature"; 
import { useSelector } from "react-redux";
import Store, { AppDispatch } from "../../Redux/Store";
import { useDispatch } from "react-redux";
import { type } from "@testing-library/user-event/dist/type";
import Spinner from "../../Layouts/Spinner";
import * as productAction from "../../Redux/ReduxComponent/Product.actions"; 
interface IProps{}
interface IProductState{
    [productReducer.productFeature]:productReducer.InitialState;
}

let ProductList:React.FC<IProps> =() =>{


    let productState = useSelector((Store:IProductState)=>{
        return Store[productReducer.productFeature];
    });
    let dispatch:AppDispatch = useDispatch();

    let {loading,errorMessage,products,count} = productState;

    useEffect(()=>{
        dispatch(productAction.getAllProductsFromServer());
    },[])

    let deleteProduct=(productId:string|undefined)=>{
        if(productId){
            dispatch(productAction.deleteProductFromServer(productId));
        }
    }

    const [searchInput, setSearchInput] = useState<string>("")
    // console.log(products);
    let searchItems = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(searchInput){
            dispatch(productAction.searchProductsFromServer(searchInput));
        }
    }

    let updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        setSearchInput(() => event.target.value);
}

    return(
        <>
            <div className="grid">
                <div className="container">
                    <div className="row m-3">
                        <div className="col">
                            <Link className="btn btn-group-vertical btn-danger" to={"/admin/add-product"}>Create Product</Link>
                        </div>
                    </div>
                    <form onSubmit={(e)=>searchItems}>
                        <div className="row m-3">
                            <div className="col-sm-3">
                                <input type="text" onChange={updateInput} name={"searchKey"} className="form-control" placeholder="Search Contact"/>
                            </div>
                            <div className="col">
                                <input type="submit" value="Search" className="btn btn-outline-dark"/>
                            </div>
                        </div>
                    </form>
                    <div className="row m-3">
                        <div className="col">
                            <div className="">
                                <div className="">
                                    {
                                        loading && <Spinner/>
                                    }
                                    {
                                        !loading && errorMessage && 
                                        <div className="row">
                                            <p className="text-danger display-6">{errorMessage.message}</p>
                                        </div>
                                    }
                                    {
                                        !loading && count === 0 &&
                                        <div className="row">
                                            <p className="text-danger text-center display-6">No Data Found</p>
                                        </div>
                                    }
                                    {
                                        !loading && products && products.length > 0 && 
                                        <table className="table table-hover table-bordered text-center">
                                            <thead>
                                                <tr className="table-dark">
                                                <th>Product Id</th>
                                                <th>Product</th>
                                                <th>Name</th>
                                                <th>Qty</th>
                                                <th>Price</th>
                                                <th>Actions</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {
                                                    products.map((product)=>{
                                                        return(
                                                            <tr key={product._id}>
                                                                <td>{product._id}</td>
                                                                <td><img className="rounded-circle" height={100} width={100} src={product.imageUrl} alt="No Image" /></td>
                                                                <td>{product.name}</td>
                                                                <td>{product.qty}</td>
                                                                <td> &#8377; {parseInt(product.price).toFixed(2)}</td>
                                                                <td>
                                                                <Link className="btn btn-primary" to={`/admin/update-product/${product._id}`} >Update</Link>
                                                                <button onClick={()=>deleteProduct(product._id)} className="btn btn-warning m-2">Delete</button>
                                                                </td>
                                                            </tr>
                                                        )
                                                    })
                                                }
                                            </tbody>
                                        </table>
                                    }
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default ProductList;
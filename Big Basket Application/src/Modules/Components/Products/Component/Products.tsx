import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../../../Layouts/Navbar";
import Spinner from "../../../Layouts/Spinner";
import { IProducts } from "../Models/IProducts";
import ProductsService from "../Services/ProductsService";
import * as productReducer from "../../../Redux/ReduxComponent/Product.feature";
import { useSelector } from "react-redux";
import { AppDispatch } from "../../../Redux/Store";
import { useDispatch } from "react-redux";
import { productFeature } from "../../../Redux/ReduxComponent/Product.feature";
import * as productAction from "../../../Redux/ReduxComponent/Product.actions";
interface IProps{}
interface IProductState{
    [productReducer.productFeature]:productReducer.InitialState;
}

let Products:React.FC<IProps> =() =>{

    // let [product,setProduct]=useState<IProducts[]>([] as IProducts[]);
    // let [loading, setLoading] = useState<boolean>(false);
    // let [errorMessage, setErrorMessage] = useState<string>("");

    let dispatch:AppDispatch=useDispatch();

    let productState = useSelector((Store:IProductState)=>{
        return Store[productFeature];
    })

    let {loading, products, errorMessage} = productState;

    useEffect(() => {
        // dispatch  an action
        dispatch(productAction.getAllProductsFromServer());
    }, []);

    // useEffect(()=>{
    //     setLoading(true);
    //     ProductsService.getAllProducts().then((response)=>{
    //         setProduct(()=>response.data)
    //         setLoading(false);
    //     }).catch((err)=>{
    //         console.log(err);
    //         setErrorMessage(()=>err.message);
    //         setLoading(false);
    //     })
    // },[])

   
    return(
        <>
            <div className="grid">
                <div className="container">
                    <div className="row mt-2">
                        <div className="col">
                        <h3>Product Details</h3>
                        <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sequi quibusdam iusto voluptas, facere alias eos praesentium dicta magnam vero repudiandae ea voluptatem iure consequuntur recusandae labore officiis saepe, reprehenderit repellat!</p>
                        </div>
                    </div>
                    {
                        loading && <Spinner/>
                    }
                    {
                        !loading && errorMessage &&
                        <div className="container mt-5 display-6">
                            <p className="text-danger text-center">{errorMessage?.message}</p>
                        </div>
                    }
                    {
                        !loading && products && products.length>0 &&
                        <div className="row mt-3 mb-5">
                        {
                            products.map((product)=>{
                                return(
                                    <div className="col-sm-3" key={product.id}>
                                        <div className="card shadow-lg mt-2">
                                            <div className="card-header align-content-center text-center">
                                                <img width={120} height={120} src={product.imageUrl} alt="" />
                                            </div>
                                            <div className="card-body">
                                                
                                                <ul className="list-group">
                                                    <li className="list-group-item">
                                                    Name : {product.name}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Price : &#8377; {parseInt(product.price).toFixed(2)}
                                                    </li>
                                                    <li className="list-group-item">
                                                        Qty : {product.qty}
                                                    </li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                                
                                )
                            })
                        }
                        </div>   
                    }
                </div>
            </div>
        </>
    );

}

export default Products;
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import Store, { AppDispatch } from "../../Redux/Store";
import * as productReducer from "../../Redux/ReduxComponent/Product.feature";
import * as productAction from "../../Redux/ReduxComponent/Product.actions";
import { IProducts } from "../Products/Models/IProducts";
import {productFeature as productFeatureKey} from "../../Redux/ReduxComponent/Product.feature";

interface IProps{}

interface IProductState {
    [productReducer.productFeature]:productReducer.InitialState;
}

let UpdateProduct:React.FC<IProps> =() =>{

     let [product, setProduct] = useState<IProducts>({
        name:"",
        price:"",
        info:"",
        imageUrl:"",
        qty:"",
    })

    let {productId} = useParams();
    const dispatch:AppDispatch= useDispatch();
    const navigate = useNavigate();

    let productState = useSelector((Store:IProductState)=>{
        return Store[productReducer.productFeature];
    })

    const {loading, errorMessage, product: reduxProduct } = productState;

    const updateInput = (event:React.ChangeEvent<HTMLInputElement|HTMLSelectElement|HTMLTextAreaElement>)=>{
        setProduct((prevState)=>{
            return{
                ...prevState,
                [event.target.name]:event.target.value
            }
        })
    }

    useEffect(()=>{
        if(productId){
            dispatch(productAction.getProductFromServer(productId));
        }
    },[productId])

    useEffect(() => {
        if (Object.keys(reduxProduct).length > 0) {
            setProduct((prevState) => {
                return {
                    ...prevState,
                    name: reduxProduct.name ? reduxProduct.name : "",
                    imageUrl: reduxProduct.imageUrl ? reduxProduct.imageUrl : "",
                    price: reduxProduct.price ? reduxProduct.price : "",
                    qty: reduxProduct.qty ? reduxProduct.qty : "",
                    info: reduxProduct.info ? reduxProduct.info : ""
                }
            })
        }
    }, [reduxProduct])

    let handleUpdate = (event:React.FormEvent<HTMLFormElement>) =>{
        event.preventDefault();
        if(productId){
            dispatch(productAction.updateProductFromServer({product:product,productId:productId})).then(()=>{
                navigate("/Admin");
            })
        }
    }
    return(
        <>
            <div className="grid">
                <div className="container">
                    <div className="row mt-2">
                        <div className="col">
                            <p className="display-6 text-success fs-1 fw-bolder">Update Product</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, culpa iste esse animi suscipit earum soluta doloremque, quaerat vitae magni repellat mollitia distinctio quasi! Mollitia laudantium distinctio possimus natus laborum?</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="card shadow-lg">
                                <div className="card-header buttonDarken">
                                    <h3>Update Product</h3>
                                </div>
                                <div className="card-body">
                                <form onSubmit={handleUpdate}>
                                    <div className="form-group">
                                        <input type="text" className="form-control" name={'name'} value={product.name} onChange={updateInput} placeholder="Product Name"/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="text" className="form-control" name={"imageUrl"} value={product.imageUrl} onChange={updateInput} placeholder="Product Image Url"/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="number" className="form-control" name={"price"} value={product.price} onChange={updateInput} placeholder="Price"/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <input type="number" className="form-control" name={"qty"} value={product.qty} onChange={updateInput} placeholder="Available Qty"/>
                                    </div>
                                    <div className="form-group mt-2">
                                        <textarea className="form-control" name={"info"} value={product.info} cols={3} onChange={updateInput} placeholder="General Info"></textarea>
                                    </div>
                                    <button type="submit" className="btn btn-primary mt-2 buttonDarken">UPDATE</button>
                                </form>
                                </div>
                            </div>
                        </div>
                        <div className="col-sm-3">
                            <img src={product.imageUrl} alt="" className="img-fluid"/>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );

}

export default UpdateProduct;
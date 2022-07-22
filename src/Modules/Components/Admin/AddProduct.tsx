import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../Redux/Store";
import * as productReducer from "../../Redux/ReduxComponent/Product.feature"
import { useNavigate } from "react-router-dom";
import * as productAction from "../../Redux/ReduxComponent/Product.actions"; 

interface IProps{}
interface IState{}

let AddProduct:React.FC<IProps> =() =>{
   
    const dispatch:AppDispatch=useDispatch();

    const navigate = useNavigate();

    let [product, setProduct] = useState({
        name:"",
        price:"",
        info:"",
        imageUrl:"",
        qty:"",
    })

    let updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
            setProduct((prevState) => {
                return {
                    ...prevState,
                    [event.target.name]: event.target.value
                }
            })
    }

    useEffect(() => {
        dispatch(productAction.getAllProductsFromServer);
    }, [])

    let handleSubmit=(event:React.FormEvent<HTMLFormElement>)=>{
        event.preventDefault();
        dispatch(productAction.createProductFromServer(product)).then((response)=>{
            navigate('/admin');
        })
    }

    return(
        <>
        {/* <pre>{JSON.stringify(product)}</pre> */}
            <div className="grid">
                <div className="container">
                    <div className="row mt-2">
                        <div className="col">
                            <p className="display-6 fs-1 fw-bolder text-success">Create New Product</p>
                            <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Explicabo, culpa iste esse animi suscipit earum soluta doloremque, quaerat vitae magni repellat mollitia distinctio quasi! Mollitia laudantium distinctio possimus natus laborum?</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-5">
                            <div className="card shadow-lg">
                                <div className="card-header buttonDarken">
                                    <h3 className="fw-bold">New Product</h3>
                                </div>
                                <div className="card-body">
                                <form onSubmit={handleSubmit}>
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
                                    <button type="submit" className="btn btn-primary mt-2 buttonDarken">CREATE</button>
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

export default AddProduct;
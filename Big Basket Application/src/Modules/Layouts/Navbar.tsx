import React, { useState } from "react";
import { Link } from "react-router-dom";


interface IProps{}
interface IState{}

let Navbar:React.FC<IProps> =() =>{
   let style = {
    color: "white"
   }
    return(
        <>
            <nav className="navbar navbar-expand-lg mx-auto rgba-gradient pl-5" >
                <div className="container ">
                    <Link className="navbar-brand" to={"/"}><i style={style} className="fa fa-shopping-cart" aria-hidden="true">&nbsp;&nbsp;Big Basket</i> </Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>

                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <Link style={style} className="nav-link" to={"/"}>Home <span className="sr-only">(current)</span></Link>
                        </li>
                        <li className="nav-item">
                            <Link style={style} className="nav-link" to={"/products"}>Products</Link>
                        </li>                 
                    </ul>
                </div>
                <ul className="me-2 navbar-nav mr-auto">
                    <li className="nav-item">
                    <Link style={style} className="nav-link" to={"/admin"}><i className="fa-solid fa-user"></i>&nbsp;&nbsp;ADMIN</Link>
                    </li>   
                </ul>
            </div>    
            </nav>
        </>
    );

}

export default Navbar;
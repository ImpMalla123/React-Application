import React, { useState } from "react";
import { Link } from "react-router-dom";
import Navbar from "../Layouts/Navbar";


interface IProps{}
interface IState{}

let Home:React.FC<IProps> =() =>{
   
    return(
        <>
            <div className="wrapper">
                <div className="landing">
                <div className="d-flex flex-column justify-content-center text-center align-items-center h-75 d-inline-block">
                <p className="text-center display-1 fw-bolder">Big Basket</p>
                <p className="text-center fs-5 m-4 fw-bold fst-italic">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Neque illum atque aspernatur, molestias temporibus natus, aut autem distinctio nesciunt exercitationem rem, cupiditate laborum iste in saepe dolor. Delectus, ullam sapiente.</p>
                    </div>
                </div>
            </div>
        </>
    );

}

export default Home;
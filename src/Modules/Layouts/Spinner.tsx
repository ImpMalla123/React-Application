import React, { useState } from "react";
import spiiner from "../../assets/img/loading.gif"


interface IProps{}
interface IState{}

let Spinner:React.FC<IProps> =() =>{
   
    return(
        <>
            <div className="grid">
                <div className="container">
                    <img src={spiiner} alt="" />
                </div>
            </div>
        </>
    );

}

export default Spinner;
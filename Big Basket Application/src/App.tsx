import React from 'react';
import './App.css';
import {BrowserRouter, Routes, Route} from "react-router-dom";
import Navbar from './Modules/Layouts/Navbar';
import Home from './Modules/Home/Home';
import Products from './Modules/Components/Products/Component/Products';
import ProductList from './Modules/Components/Admin/ProductList';
import AddProduct from './Modules/Components/Admin/AddProduct';
import UpdateProduct from './Modules/Components/Admin/UpdateProduct';


function App() {
    return (
        <React.Fragment>
            <BrowserRouter>
                <Navbar/>
                <Routes>
                    <Route path='/' element={<Home/>}/>
                    <Route path='/products' element={<Products/>}/>
                    <Route path='/admin' element={<ProductList/>}/>
                    <Route path='/admin/add-product' element={<AddProduct/>}/>
                    <Route path='/admin/update-product/:productId' element={<UpdateProduct/>}/>
                </Routes>
            </BrowserRouter>
        </React.Fragment>
    );
}

export default App;

import { combineReducers } from "@reduxjs/toolkit";
import * as productReducer from "./ReduxComponent/Product.feature";

const RootReducer = combineReducers({
    [productReducer.productFeature]:productReducer.productSlice.reducer
});

export default RootReducer;
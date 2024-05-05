import {combineReducers} from "@reduxjs/toolkit";

import authReducer from "../slice/authSlice"
// import profileReducer from "../slices/profileSlice";
// import cartReducer from "../slices/cartSlice"

const rootReducer  = combineReducers({
    auth: authReducer,
    // profile:profileReducer,
    // cart:cartReducer,
})

export default rootReducer
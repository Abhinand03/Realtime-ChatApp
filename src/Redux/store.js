import { configureStore } from "@reduxjs/toolkit";
import userReducer from './user'
import messagereducer from './message'

 export const store=configureStore({
    reducer:{
       oneuser: userReducer,
       message:messagereducer
        

    }
})
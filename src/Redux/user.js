import { createSlice } from "@reduxjs/toolkit";

const userslice=createSlice({
    name:'user',
    initialState:{
        user:{},
        status:true
        
    },
    reducers:{
        senduser:(state,actions)=>{
            state.user=actions.payload
        },
        sendstatus:(state,actions)=>{
            state.status=actions.payload
        }

    }
})


export const {senduser,sendstatus}= userslice.actions

export default userslice.reducer
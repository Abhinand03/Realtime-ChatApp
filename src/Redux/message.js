import { createSlice } from "@reduxjs/toolkit"


 const messageslice= createSlice({
    name:"message",
    initialState:{
        mess:[],
        re_mess:[]
    },
    reducers:{
        sendmess:(state,actions)=>{
            state.mess=actions.payload 
        },
        re_message:(state,actions)=>{
            state.re_mess=actions.payload
        }
    }
    
 })
 export const {sendmess,re_message}=messageslice.actions
 export default messageslice.reducer


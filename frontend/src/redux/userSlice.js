import { createSlice } from "@reduxjs/toolkit";

let initialValue={
    user:null,
    loginStatus:false,
    categories:null
}

export const userSlice=createSlice({
    name:'user',
    initialState:initialValue,
    reducers:{
        setUser:(state,action)=>{
            console.log(action.payload);
            state.loginStatus=true
            state.user=action.payload
        },
        setCategory:(state,action)=>{
            state.categories=action.payload
        },
        logoutHandel:(state)=>{
            console.log('logout called');
            state.user=null
            state.loginStatus=false
        }
    }
})

export const {setUser,setCategory,logoutHandel}=userSlice.actions

export default userSlice.reducer
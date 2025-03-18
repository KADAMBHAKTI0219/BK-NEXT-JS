const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: null,
        isAuthenticated:false
    },
    reducers:{
        signup:(state,{payload})=>{
            const {email,password,city} = payload;
            localStorage.setItem('auth',JSON.stringify({email,password,city}))
            
        },

        signin: (state,{payload})=>{
            const {email,password} = payload;
            const user = JSON.parse(localStorage.getItem('auth'));
            if(user && user.email === email && user.password === password){
                state.user = user;
                state.isAuthenticated = true;
            }
            else{
                throw new Error('Invalid credentials or user not found.');
            }
        },

        signout: (state)=>{
            state.user = null,
            state.isAuthenticated = false;
            localStorage.removeItem('auth')
        }
    }
})

export const {signup, signin,signout} = authSlice.actions;
export default authSlice.reducer;
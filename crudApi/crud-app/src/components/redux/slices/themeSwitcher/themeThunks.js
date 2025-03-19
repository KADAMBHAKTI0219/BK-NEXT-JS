import { createAsyncThunk } from "@reduxjs/toolkit";

export const themeChanger = createAsyncThunk('/theme/themeChanger',async ()=>{
    return 'dark';
})
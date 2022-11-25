import { createSlice } from "@reduxjs/toolkit";

const auth = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("user") || false
    },
    reducers: {
        login: (state, action) => {
            state.user = action.payload
        },
        logout: state => {
            state.user = false
        }
    },
})

export const authState = state => state.auth.user
export const { login, logout } = auth.actions
export default auth.reducer
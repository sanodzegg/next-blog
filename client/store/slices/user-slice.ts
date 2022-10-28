import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
    auth: null as unknown,
    profile: {},
}

const userSlice = createSlice({
    name: "UserSlice",
    initialState,
    reducers: {
        LogIn(state, payload) {
            state.auth = true;
            const { username, email, picture, aboutMe } = payload.payload;
            
            state.profile = { username, email, picture, aboutMe };
            if(payload.payload.token) {
                const CookieData = {
                    id: payload.payload.id,
                    token: payload.payload.token
                }
                Cookies.set("user", JSON.stringify(CookieData), { expires: 1/12 });
            }
        },
        LogOut(state) {
            state.auth = false;
            state.profile = {};
            Cookies.remove("user");
            if(localStorage.getItem("blogCache")) localStorage.removeItem("blogCache");
            if(sessionStorage.getItem("contactMail")) sessionStorage.removeItem("contactMail");
        }
    }
});

export default userSlice;

export const userActions = userSlice.actions;
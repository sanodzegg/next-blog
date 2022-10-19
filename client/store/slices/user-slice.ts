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
            const { username, email, picture } = payload.payload;
            state.profile = { username, email, picture };
            if(payload.payload.token) {
                const CookieData = {
                    username: username,
                    token: payload.payload.token
                }
                Cookies.set("user", JSON.stringify(CookieData), { expires: 1/12 });
            }
        }
    }
});

export default userSlice;

export const userActions = userSlice.actions;
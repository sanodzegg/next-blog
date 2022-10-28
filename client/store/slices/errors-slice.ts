import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    error: {}
}

const errorSlice = createSlice({
    name: "ErrorsSlice",
    initialState,
    reducers: {
        ShowError(state, payload) {
            state.show = true;
            state.error = payload.payload
        },
        HideError(state) {
            state.show = false;
            state.error = {}
        }
    }
});

export default errorSlice;

export const errorActions = errorSlice.actions;
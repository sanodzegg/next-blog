import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    show: false,
    term: "",
    searched: []
}

const searchSlice = createSlice({
    name: "ErrorsSlice",
    initialState,
    reducers: {
        OpenSearch(state) {
            state.show = true;
        },
        HideSearch(state) {
            state.show = false;
        },
        SearchTerm(state, payload) {
            state.term = payload.payload;
        },
        setSearched(state, payload) {
            state.searched = payload.payload
        }
    }
});

export default searchSlice;

export const searchActions = searchSlice.actions;
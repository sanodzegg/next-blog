import { configureStore } from "@reduxjs/toolkit";

import errorSlice from "./slices/errors-slice";
import searchSlice from "./slices/search-slice";
import userSlice from "./slices/user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        error: errorSlice.reducer,
        search: searchSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
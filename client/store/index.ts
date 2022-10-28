import { configureStore } from "@reduxjs/toolkit";
import errorSlice from "./slices/errors-slice";

import userSlice from "./slices/user-slice";

const store = configureStore({
    reducer: {
        user: userSlice.reducer,
        error: errorSlice.reducer
    }
});

export type RootState = ReturnType<typeof store.getState>;
export default store;
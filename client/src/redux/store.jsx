import { configureStore } from "@reduxjs/toolkit";
import { LoaderSlice } from "./LoaderSlice";
import { UserSlice } from "./UserSlice";

const store = configureStore({
  reducer: {
    loaders: LoaderSlice.reducer,
    users: UserSlice.reducer,
  },
});

export default store;

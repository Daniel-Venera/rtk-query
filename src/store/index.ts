import { configureStore } from "@reduxjs/toolkit";
import { bitcoinApi } from "../services/app";
import appReducer from "./appSlice";

export const store = configureStore({
  reducer: {
    [bitcoinApi.reducerPath]: bitcoinApi.reducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(bitcoinApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

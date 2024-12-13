"use client";

// import { configureStore } from "@reduxjs/toolkit";
// import grindelBackhus from "../reducers";

// export type RootState = ReturnType<typeof grindelBackhus>;
// const store = configureStore({
//     reducer: grindelBackhus,
// });


// export default store;

// src/redux/store.ts

import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { api } from '@/services/api';
import sessionReducer from '../slices/sessionSlice';
import loadingReducer from '../slices/loadingSlice';

export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        session: sessionReducer,
        loading: loadingReducer,
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

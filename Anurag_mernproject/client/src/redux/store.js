import { configureStore } from "@reduxjs/toolkit";
import usersReducer from './usersSlice';
import loadersReduceer from "./loadersSlice";
const store= configureStore({
    reducer:{
        users:usersReducer,
        loaders:loadersReduceer,
    },
});
export default store;
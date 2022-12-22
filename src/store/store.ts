import {configureStore, combineReducers} from "@reduxjs/toolkit";

import {userModel} from "@/entities/user";
import {advertModel} from "@/entities/advert";
import {commonEntitiesApi} from "@/shared/api";

import {adminAdvertApi} from "@/shared/api/rtk-queries/adminAdvertApi";
import {userApi} from "@/shared/api/rtk-queries/userApi";
import {feedbackApi} from "@/shared/api/rtk-queries/feedbackApi";
import {adminReportApi} from "@/shared/api/rtk-queries/adminReportApi";

import {newAdvertsSlice, favoritesInfoSlice} from "@/store/slices";


const rootReducer = combineReducers({
    user: userModel.userSlice.reducer,
    newAdverts: newAdvertsSlice.reducer,
    favoritesInfo: favoritesInfoSlice.reducer,
    [advertModel.advertApi.reducerPath]: advertModel.advertApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
    [adminAdvertApi.reducerPath]: adminAdvertApi.reducer,
    [adminReportApi.reducerPath]: adminReportApi.reducer,
    [commonEntitiesApi.reducerPath]: commonEntitiesApi.reducer,
    [commonEntitiesApi.reducerPath]: commonEntitiesApi.reducer,
    [feedbackApi.reducerPath]: feedbackApi.reducer
});


export const store = configureStore({
    reducer: rootReducer,
    middleware: getDefaultMiddleware => getDefaultMiddleware()
        .concat([
            commonEntitiesApi.middleware,
            advertModel.advertApi.middleware,
            adminAdvertApi.middleware,
            adminReportApi.middleware,
            userApi.middleware,
            feedbackApi.middleware,
        ])
});


export type RootState = ReturnType<typeof store.getState>
export type AppStore = typeof store;
export type AppDispatch = AppStore["dispatch"]


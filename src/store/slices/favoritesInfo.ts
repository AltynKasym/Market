import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {Api} from "@/shared/api";


export const favoritesInfoSlice = createSlice({
    name: "favoritesInfo",
    initialState: 0,
    reducers: {
        setFavoriteQty: (state, action: PayloadAction<number>) => {
            return action.payload;
        },

        addOne: (state) => {
            console.log("ADDED ONE");
            return state + 1;
        },

        removeOne: (state) => {
            return Math.max(state - 1, 0);
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchFavoriteIds.fulfilled, (state, action) => {
            return action.payload.adverts?.length;
        });
    }
});


export const fetchFavoriteIds = createAsyncThunk(
    "favoritesInfo/fetchFavoriteIds",
    async () => {
        const response = await Api.Advert.getFavoriteIds();
        return response.data;
    }
);
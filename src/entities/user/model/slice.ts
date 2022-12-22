import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DTO} from "@/shared/api";


export const userSlice = createSlice({
    name: "user",
    initialState: null as Nullable<DTO.User>,
    reducers: {
        set: (state, action: PayloadAction<DTO.User>) => {
            return action.payload;
        },
        setAccessToken: (state, action: PayloadAction<string>) => {
            if (state !== null)
                state.access = action.payload;
        },
        setNewUser: (state, action: PayloadAction<DTO.User>) => {
            if (state !== null) {
                state.first_name = action.payload.first_name;
                state.last_name = action.payload.last_name;
                state.first_name = action.payload.first_name;
                state.phone_number = action.payload.phone_number;
            }
        },
        reset: (state) => {
            return null;
        },
    }
});
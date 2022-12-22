import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {DTO} from "@/shared/api";


interface SetFavoriteArgs {
    advertId: number;
    isFavorite: boolean;
}


export const newAdvertsSlice = createSlice({
    name: "newAdverts",
    initialState: [] as DTO.Advert[],
    reducers: {
        setFavorite: (state, action: PayloadAction<SetFavoriteArgs>) => {
            const ad = state.find(x => x.id === action.payload.advertId);
            if (ad) {
                ad.isFavorite = action.payload.isFavorite;
            }
        },

        push: (state, action: PayloadAction<DTO.Advert[]>) => {
            const payloadMap = new Map(action.payload.map(x => [x.id, x]));
            const changedAdverts = state.map(x => {
                const changedAd = payloadMap.get(x.id);
                if (changedAd) {
                    payloadMap.delete(x.id);
                    return changedAd;
                }
                return x;
            });
            return changedAdverts.concat(Array.from(payloadMap.values()));
        },

        reset: (state) => {
            return [];
        },
    }
});
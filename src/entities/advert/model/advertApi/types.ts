import {DTO} from "@/shared/api";


export interface SetFavoriteQueryArgs {
    advertId: number;
    isFavorite: boolean;
}


export type TagsType = "Adverts" | "PremiumAdverts" | "FavoriteAdverts" | "UserAdverts";


export interface SetAdvertStatusQueryArg {
    advertId: number;
    status: DTO.AdvertStatus;
}
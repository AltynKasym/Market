import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {TagDescription} from "@reduxjs/toolkit/dist/query/endpointDefinitions";
import {ThunkDispatch} from "redux-thunk";
import {AnyAction} from "redux";

import {ApiUtil, DTO} from "@/shared/api";
import {slices} from "@/store";

import {SetFavoriteQueryArgs, SetAdvertStatusQueryArg, TagsType} from "./types";
import {getSearchParams, mergerWithFavoritesIfAuthorized} from "./util";


export const advertApi = createApi({
    reducerPath: "advertApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_WEB_API_URL}`}),
    tagTypes: ["Adverts", "PremiumAdverts", "FavoriteAdverts", "UserAdverts"],
    keepUnusedDataFor: 200,  // кол-во секунд которое держать в кеше
    refetchOnReconnect: false,
    endpoints: (build) => ({
        getAdverts: build.query<DTO.AdvertsResponse, Voidable<DTO.AdvertsRequestQueryParams>>({
            query: (args) => {
                const params = getSearchParams(args);
                return `advert?${params}`;
            },
            providesTags: result => ["Adverts"],
            transformResponse: mergerWithFavoritesIfAuthorized
        }),

        getPremiumAdverts: build.query<DTO.AdvertsResponse, Voidable<DTO.AdvertsRequestQueryParams>>({
            query: (args) => {
                const params = getSearchParams(args);
                return `premium_advert?${params}`;
            },
            providesTags: result => ["PremiumAdverts"],
            transformResponse: mergerWithFavoritesIfAuthorized,
        }),

        getFavoriteAdverts: build.query<DTO.AdvertsResponse, Voidable<DTO.AdvertsRequestQueryParams>>({
            query: (args) => {
                const params = getSearchParams(args);
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: `fav_adverts/?${params}`,
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    },
                };
            },
            providesTags: result => ["FavoriteAdverts"],
            transformResponse: async (response: DTO.AdvertsResponse) => {
                response.results.forEach(x => x.isFavorite = true);
                return response;
            }
        }),

        setFavorite: build.mutation<FetchArgs, SetFavoriteQueryArgs>({
            query: ({advertId, isFavorite}) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                if (!authHeader)
                    throw new Error("Not Authorized");

                const favNum = isFavorite ? 1 : 0;
                return {
                    url: `favorite/${advertId}/${favNum}/`,
                    method: "PUT",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            onQueryStarted: async (request, {dispatch, queryFulfilled, getState}) => {
                const tags = [
                    {type: "Adverts"},
                    {type: "PremiumAdverts"},
                    {type: "FavoriteAdverts"},
                ] as TagDescription<TagsType>[];

                patchFavoritesInfo(request, dispatch);
                patchNewAdverts(request, dispatch);

                const patches = [];

                for (const {endpointName, originalArgs} of advertApi.util.selectInvalidatedBy(getState(), tags)) {
                    const endpoint = endpointName as "getAdverts" | "getPremiumAdverts" | "getFavoriteAdverts";

                    if (endpoint === "getFavoriteAdverts") {
                        const patch = patchFavoriteAdvertsOnSetFavorite(endpoint, request, originalArgs, dispatch);
                        patch && patches.push(patch);
                    } else {
                        const patch = patchAdvertsAndPremium(endpoint, request, originalArgs, dispatch);
                        patches.push(patch);
                    }
                }

                try {
                    await queryFulfilled;
                } catch {
                    patches.forEach(x => x.undo());
                    undoPatchNewAdverts(request, dispatch);
                    undoPatchFavoritesInfo(request, dispatch);
                }
            }
        }),

        getUserAdverts: build.query<DTO.MyAdvertsResp2[], Voidable<string>>({
            query: (status) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: `user_advert?status=${status || ""}`,
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    },
                };
            },
            providesTags: (result, error, arg) => {
                return arg
                    ? [{type: "UserAdverts", id: arg}]
                    : ["UserAdverts"];
            }
        }),

        setAdvertStatus: build.mutation<FetchArgs, SetAdvertStatusQueryArg>({
            query: ({advertId, status}) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                if (!authHeader)
                    throw new Error("Not Authorized");

                return {
                    url: `user_advert_update/${advertId}/`,
                    method: "PATCH",
                    headers: {
                        "Authorization": authHeader
                    },
                    body: {
                        status
                    }
                };
            },
            // invalidatesTags: [{type: "UserAdverts", id: DTO.AdvertStatus.Inactive}],
            onQueryStarted: async (request, {dispatch, queryFulfilled, getState, getCacheEntry}) => {
                const patches = [];

                if (request.status === DTO.AdvertStatus.Inactive) {
                    const patch = dispatch(
                        advertApi.util.updateQueryData("getUserAdverts", undefined, (draft: DTO.MyAdvertsResp2[]) => {
                            const advert = draft.find(x => x.id === request.advertId);
                            if (advert) {
                                advert.status = request.status;
                            }
                        }));

                    patches.push(patch);
                }

                try {
                    await queryFulfilled;
                } catch {
                    patches.forEach(x => x.undo());
                }
            }
        })
    })
});


const patchFavoriteAdvertsOnSetFavorite = (
    endpoint: string,
    request: SetFavoriteQueryArgs,
    originalArgs: unknown,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
    if (!request.isFavorite) {
        return dispatch(
            // @ts-ignore
            advertApi.util.updateQueryData(endpoint, originalArgs, (draft: DTO.AdvertsResponse) => {
                draft.results = draft.results.filter(x => x.id !== request.advertId);
            })
        );
    }
    dispatch(advertApi.util.invalidateTags(["FavoriteAdverts"]));
    return null;

};


const patchAdvertsAndPremium = (
    endpoint: string,
    request: SetFavoriteQueryArgs,
    originalArgs: unknown,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
    return dispatch(
        // @ts-ignore
        advertApi.util.updateQueryData(endpoint, originalArgs, (draft: DTO.AdvertsResponse) => {
            const advert = draft.results.find(x => x.id === request.advertId);
            if (advert)
                advert.isFavorite = request.isFavorite;
        })
    );
};


const patchFavoritesInfo = (
    request: SetFavoriteQueryArgs,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
    request.isFavorite && dispatch(slices.favoritesInfoSlice.actions.addOne());
    (!request.isFavorite) && dispatch(slices.favoritesInfoSlice.actions.removeOne());
};

const undoPatchFavoritesInfo = (
    request: SetFavoriteQueryArgs,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
    request.isFavorite && dispatch(slices.favoritesInfoSlice.actions.removeOne());
    (!request.isFavorite) && dispatch(slices.favoritesInfoSlice.actions.addOne());
};


const patchNewAdverts = (
    request: SetFavoriteQueryArgs,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
    dispatch(slices.newAdvertsSlice.actions.setFavorite({
        advertId: request.advertId,
        isFavorite: request.isFavorite
    }));
};

const undoPatchNewAdverts = (
    request: SetFavoriteQueryArgs,
    dispatch: ThunkDispatch<unknown, unknown, AnyAction>
) => {
    dispatch(slices.newAdvertsSlice.actions.setFavorite({
        advertId: request.advertId,
        isFavorite: !request.isFavorite
    }));
};
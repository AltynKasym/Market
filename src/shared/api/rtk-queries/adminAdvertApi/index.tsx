import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AdvertsResponse} from "../../types";
import {DTO, ApiUtil} from "@/shared/api";
import {DeleteAdvert} from "./types";
import {getSearchParams} from "./util";


export const adminAdvertApi = createApi({
    reducerPath: "adminAdvertApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_WEB_API_URL}`}),
    tagTypes: ["AdminAdverts"],
    keepUnusedDataFor: 20,
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getAdverts: build.query<AdvertsResponse, Voidable<DTO.AdvertsRequestQueryParams>>({
            query: (args) => {
                const params = getSearchParams(args);
                const authHeader = ApiUtil.getLsAuthHeaders();
                console.log("params", args);
                
                if (!authHeader)
                    throw new Error("Not Authorized");

                return {
                    url: `admin/advert?${params}`,
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            providesTags: result => ["AdminAdverts"],
        }),

        deleteAdvertbyId: build.mutation<FetchArgs, DeleteAdvert>({
            query: (advertId) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                if (!authHeader)
                    throw new Error("Not Authorized");
                return {
                    url: `admin/advert/${advertId}`,
                    method: "DELETE",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            invalidatesTags: ["AdminAdverts"],
        })
    })
});
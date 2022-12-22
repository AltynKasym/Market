import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/dist/query/react";
import {DTO} from "@/shared/api";


export const commonEntitiesApi = createApi({
    reducerPath: "commonEntitiesApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_WEB_API_URL}`}),
    refetchOnReconnect: true,
    tagTypes: ["Categories", "SubCategories", "Cities", "Promotes"],
    endpoints: (build) => ({
        getCategories: build.query<DTO.Category[], void>({
            query: () => "category/",
            providesTags: result => ["Categories"]
        }),

        getSubCategories: build.query<DTO.SubCategory[], Voidable<number>>({
            query: () => "sub_category/",
            providesTags: result => ["SubCategories"],
            transformResponse: (response: DTO.SubCategory[], meta, categoryId) => {
                return categoryId
                    ? response.filter(x => x.category === categoryId)
                    : response;
            }
        }),

        getCities: build.query<DTO.City[], void>({
            query: () => "city/",
            providesTags: result => ["Cities"]
        }),

        getPromotes: build.query<DTO.Promote[], void>({
            query: () => "promote/",
            providesTags: result => ["Promotes"]
        })
    })
});
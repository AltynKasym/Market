import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {AdvertsResponse} from "../../types";
import {DTO, ApiUtil} from "@/shared/api";


export const adminReportApi = createApi({
    reducerPath: "adminReportApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_WEB_API_URL}`}),
    tagTypes: ["AdminReport"],
    keepUnusedDataFor: 20,
    refetchOnReconnect: true,
    endpoints: (build) => ({
        getAdverts: build.query<AdvertsResponse, Voidable<DTO.AdvertsRequestQueryParams>>({
            query: (args) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                if (!authHeader)
                    throw new Error("Not Authorized");

                return {
                    url: "admin/ad_report/",
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            providesTags: result => ["AdminReport"],
        }),
    })
});
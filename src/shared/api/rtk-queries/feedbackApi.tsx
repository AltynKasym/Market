import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiUtil} from "@/shared/api";
import {FeedbackRes, updateDataArg} from "../types";


export const feedbackApi = createApi({
    reducerPath: "feedbackApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_WEB_API_URL}`}),
    tagTypes: ["Feedback"],
    endpoints: (build) => ({
        getFeedbacks: build.query<FeedbackRes[], void>({
            query: () => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: "feedback/",
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            providesTags: result => ["Feedback"]
        }),
        getFeedbackById: build.query<FeedbackRes, string | undefined>({
            query: (id) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: `feedback/${id}`,
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            providesTags: result => ["Feedback"]
        }),
        postFeedback: build.mutation<FetchArgs, updateDataArg>({
            query: (data) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: "feedback/",
                    method: "POST",
                    body: data,
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            invalidatesTags: ["Feedback"]
        }),
        deleteFeedbackById: build.mutation<FetchArgs, number>({
            query: (id) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: `feedback/${id}`,
                    method: "DELETE",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            invalidatesTags: ["Feedback"]
        })
    })
});
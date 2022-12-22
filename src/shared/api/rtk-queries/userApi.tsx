import {createApi, FetchArgs, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import {ApiUtil} from "@/shared/api";
import {updateDataArg} from "../types";


export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl: `${import.meta.env.VITE_WEB_API_URL}`}),
    tagTypes: ["Users"],
    endpoints: (build) => ({
        getUsers: build.query<FetchArgs, void>({
            query: () => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: "admin/user/",
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            providesTags: result => ["Users"]
        }),
        getUserById: build.query<FetchArgs, string | undefined>({
            query: (id) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: `admin/user/${id}`,
                    method: "GET",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            providesTags: result => ["Users"]
        }),
        updateUser: build.mutation<FetchArgs, updateDataArg>({
            query: ({id, data}) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: `admin/user/${id}/`,
                    method: "PUT",
                    body: data,
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            invalidatesTags: ["Users"]
        }),
        deleteUserById: build.mutation<FetchArgs, number>({
            query: (id) => {
                const authHeader = ApiUtil.getLsAuthHeaders();
                return {
                    url: `admin/user/${id}`,
                    method: "DELETE",
                    headers: {
                        "Authorization": authHeader
                    }
                };
            },
            invalidatesTags: ["Users"]
        })
    })
});
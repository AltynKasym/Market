import axios, {AxiosRequestConfig, AxiosInstance} from "axios";
import dayjs from "dayjs";

import {dropAuthAndRedirect} from "./util";


export const axiosInstance: AxiosInstance = axios.create({
    baseURL: import.meta.env.VITE_WEB_API_URL,
    headers: {
        "Content-Type": "application/json"

    },
    timeout: 10_000 // TODO: вернуть 20_000
});

axiosInstance.interceptors.request.use((request: AxiosRequestConfig) => {
    const date = dayjs(new Date()).format("DD.MM.YYYY hh:mm:ss");
    console.log(`${date}: [${request.method?.toUpperCase()}] ${request.baseURL}/${request.url}`);
    return request;
});

axiosInstance.interceptors.response.use(response => response,
    err => {
        if (err.response?.status === 401) {
            const baseUrl = import.meta.env.VITE_WEB_API_URL;
            if (err.request.responseURL !== `${baseUrl}/user/login/`
                && err.request.responseURL !== `${baseUrl}/favorite/`
            ) {
                dropAuthAndRedirect();
            }
        }
        return Promise.reject(err);
    });

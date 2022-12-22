import {axiosInstance} from "./axiosInstance";
import * as DTO from "./types";
import {AxiosResponse} from "axios";


// TODO: сделать так https://github.com/feature-sliced/examples/tree/master/todo-app/src/shared/api
export {AdminApi} from "./adminApi";
// TODO: апи перенести в отдельный файл, здесь оставить только реэкспорт
export {DTO};
export {commonEntitiesApi} from "./rtk-queries/commonEntitiesApi";

import * as ApiUtil from "./util";


export {ApiUtil};

/* eslint-disable @typescript-eslint/no-explicit-any */


const signUp = async (data: DTO.RegisterData): Promise<AxiosResponse<DTO.RegisterResponse>> => {
    return await axiosInstance.post("user/register/", data);
};


const signIn = async (data: DTO.LoginData): Promise<AxiosResponse<DTO.User>> => {
    return await axiosInstance.post("user/login/", data);
};

const signInWithGoogle = async (tokenId: string): Promise<AxiosResponse<DTO.User>> => {
    return await axiosInstance.post("social_auth/google/", {
        auth_token: tokenId
    });
};

const refreshAccessToken = async (refreshToken: string) => {
    return await axiosInstance.post("user/login/refresh/", {
        refresh: refreshToken
    });
};

const forgotPassword = async (email: string): Promise<AxiosResponse<DTO.User>> => {
    return await axiosInstance.post("user/forgot/password/", {
        email
    });
};

const changeUser = async (data: DTO.ChangeUserRequest): Promise<AxiosResponse<DTO.User>> => {
    return await axiosInstance.put("user/change/info/", data, {
        headers: {
            "Authorization": ApiUtil.getLsAuthHeaders()
        }
    });
};

type Status = { status: string };

const requestActivation = async (email: string, code: string): Promise<AxiosResponse<Status>> => {
    return await axiosInstance.post("user/check/activation/code/", {
        email,
        code
    });
};


const feedback = async (data: object) => {
    return await axiosInstance.post("feedback/", data);
};

const faq = async () => {
    return await axiosInstance.get("FAQ/");
};

const getHelpDataById = async (id: unknown) => {
    return await axiosInstance.get(`help/${id}`);
};

const getHelpCategory = async () => {
    return await axiosInstance.get("help_category/");
};

const getHelp = async () => {
    return await axiosInstance.get("help/");
};


const getFooterLinks = async () => {
    return await axiosInstance.get("site_link/");
};

const getFeedbackMessage = async () => {
    return await axiosInstance.get("feedback_message/");
};

const getPrivacyPolicy = async () => {
    return await axiosInstance.get("privacy_policy/");
};


//<editor-fold desc="Chat">

const createChatRoom = async (roomData: unknown) => {
    return await axiosInstance.post("chat_room/", roomData, {
        headers: {
            "Authorization": ApiUtil.getLsAuthHeaders()
        }
    });
};

const getChatRoom = async (id: string) => {
    return await axiosInstance.get(`chat_room/${id}`,
        {
            headers: {
                "Authorization": ApiUtil.getLsAuthHeaders()
            }
        });
};

const sendMessage = async (data: any, accessToken?: string) => {
    return await axiosInstance.post("message/", data,
        {
            headers: {
                "Authorization": `Bearer ${accessToken}`
            }

        });
};

const getChatList = async () => {
    return await axiosInstance.get("chat_room/",
        {
            headers: {
                "Authorization": ApiUtil.getLsAuthHeaders()
            }
        });
};

//</editor-fold desc="Chat">


//<editor-fold desc="Advert">

const getAdvert = async (id: number) => {
    return await axiosInstance.get(`advert/${id}/`);
};


// TODO: тут надо поменять тип, потому что в FormData можно все что угодно добавить
const createAdvert = async (data: FormData) => {
    return await axiosInstance.post("advert/", data, {
        headers: {
            "Authorization": ApiUtil.getLsAuthHeaders()
        }
    });
};

const getFavoriteIds = async (): Promise<AxiosResponse<DTO.FavoriteIdsResponse>> => {
    return await axiosInstance.get("favorite/", {
        headers: {
            "Authorization": ApiUtil.getLsAuthHeaders()
        }
    });
};

const putAdvertEdit = async (id: number, data: unknown) => {
    return await axiosInstance.put(`/advert/${id}/`, data,
        {
            headers: {
                "Authorization": ApiUtil.getLsAuthHeaders()
            }
        });
};


//</editor-fold desc="Advert">


export const showContacts = async (id: number) => {
    return await axiosInstance.post(`advert_contacts/${id}/`);
};

export const Api = {
    Common: {
        getFooterLinks,
        getFeedbackMessage,
        getPrivacyPolicy,
        getHelp,
        getHelpDataById,
        getHelpCategory,
        faq,
        feedback,
    },
    User: {
        signUp,
        signIn,
        refreshAccessToken,
        forgotPassword,
        requestActivation,
        signInWithGoogle,
        changeUser,
    },

    Chat: {
        createChatRoom,
        getChatRoom,
        sendMessage,
        getChatList
    },
    Advert: {
        getAdvert,
        createAdvert,
        getFavoriteIds,
        putAdvertEdit,
    },
    Statistics: {
        showContacts
    }

};

/* eslint-enable @typescript-eslint/no-explicit-any */

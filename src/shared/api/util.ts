import lstore from "store";
import {Constants} from "@/shared/constants";
import * as DTO from "./types";


export const getLsAuthHeaders = () => {
    // TODO: константа для ключа лежит в userModel, кто отвечать должен
    const user = lstore.get(Constants.LS_USER_KEY) as Nullable<DTO.User>;
    if (!user)
        return "";

    return `Bearer ${user.access}`;
};


export const dropAuthAndRedirect = () => {
    lstore.remove(Constants.LS_USER_KEY);
    window.location.href = "/auth/login";
};





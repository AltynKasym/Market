import lstore from "store";
import {AxiosError} from "axios";

import {Constants} from "@/shared/constants";
import {Api, DTO} from "@/shared/api";
import {userModel} from "@/entities/user";
import {userSlice} from "./slice";
import {useAppDispatch, useAppSelector} from "@/store";


interface Result {
    status: number;
    message: string;
}

const signUp = async (data: DTO.RegisterData) => {
    return await Api.User.signUp(data);
};


const getResult = (status: number, message: string): Result => {
    return {
        status,
        message
    };
};

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const userState = useAppSelector(state => state.user);

    const init = () => {
        if (userState)
            return;
        console.log("init");
        const oldUserState = lstore.get(Constants.LS_USER_KEY) as Nullable<DTO.User>;
        if (oldUserState)
            dispatch(userSlice.actions.set(oldUserState));
    };


    const signIn = async (responseCallback: () => ReturnType<typeof Api.User.signIn>): Promise<Result> => {
        try {
            const response = await responseCallback();
            if (response.status === 200) {
                dispatch(userSlice.actions.set(response.data));
                lstore.set(Constants.LS_USER_KEY, response.data);
                return getResult(200, "Ok");
            }
            return getResult(-1, "Unexpected");
        } catch (e) {
            const err = e as AxiosError;
            if (err.response?.status === 401)
                return getResult(401, err.response?.statusText || "");
            return getResult(0, "Ошибка сервера");
        }
    };


    const signInWithEmailAndPassword = async (email: string, password: string): Promise<Result> => {
        return signIn(async () => await Api.User.signIn({email, password}));
    };

    const signInWithGoogle = async (tokenId: string) => {
        return signIn(async () => await Api.User.signInWithGoogle(tokenId));
    };

    const signOut = () => {
        dispatch(userModel.userSlice.actions.reset());
        lstore.remove(Constants.LS_USER_KEY);
    };

    const refreshAccessToken = (accessToken: string) => {
        dispatch(userSlice.actions.setAccessToken(accessToken));
    };

    const forgotPassword = async (email: string) => {
        await Api.User.forgotPassword(email);
    };

    const requestActivation = async (email: string, code: string) => {
        await Api.User.requestActivation(email, code);
    };

    const checkEmailPassword = async (email: string, password: string) => {
        try {
            await Api.User.signIn({email, password});
            return true;
        } catch {
            return false;
        }
    };

    const changeUser = async (oldEmail: string, old_password: string, changeData: DTO.ChangeUserRequest) => {
        const isValid = await checkEmailPassword(oldEmail, old_password);
        if (!isValid)
            throw new Error("Неверный пароль");
        try {
            const response = await Api.User.changeUser(changeData);
            dispatch(userSlice.actions.setNewUser(response.data));
        } catch (e) {
        }
    };

    return {
        user: userState,
        init,
        refreshAccessToken,
        signInWithEmailAndPassword,
        signInWithGoogle,
        signOut,
        signUp,
        forgotPassword,
        requestActivation,
        checkEmailPassword,
        changeUser
    };
};
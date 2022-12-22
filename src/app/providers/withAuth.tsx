import React from "react";
import {Navigate} from "react-router-dom";

import {userModel} from "@/entities/user";


export const withAuth = <T extends object>(Component: React.ComponentType<T>) => {
    return (props: T) => {
        const {user} = userModel.useAuth();
        if (!user)
            return <Navigate to="/auth/login"/>;
        return <Component {...props} />;
    };
};
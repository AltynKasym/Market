import {Fragment, useEffect} from "react";
import {useLocation} from "react-router-dom";
import {gapi} from "gapi-script";

import {Router} from "./Router";
import {Header} from "./header/Header";
import {Footer} from "./footer";
import {FloatButton} from "./floatButton";
import {userModel} from "@/entities/user";
import "./styles/index.scss";
import Pusher from "pusher-js";

import css from "./styles.module.scss";

// TODO: ssl https://timonweb.com/django/https-django-development-server-ssl-certificate/


// TODO: assets надо почистить, удалить дубликаты с разными цветами, использовать svgr
export const App = () => {
    const location = useLocation(); // для того чтобы App рендерился при сменне роута
    const {init, user} = userModel.useAuth();

    /*CONNECT TO CHANNEL*/
    useEffect(() => {
        if (user) {
            Pusher.logToConsole = true;

            const pusher = new Pusher("fac24ed4d8f178c400a0", {
                cluster: "ap2"
            });


            const channel = pusher.subscribe("notification");
            channel.bind("notificate", (data: object) => {
                console.log("NOTIFICATION", data);
            });
            console.log("connected");
        }
    }, [user]);

    init();

    useEffect(() => {
        window.history.scrollRestoration = "manual";
    }, []);

    useEffect(() => {
        const start = () => {
            gapi.client.init({
                clientId: import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID
            });
        };

        gapi.load("client:auth2", start);
    }, []);


    // const accessToken = gapi.auth.getToken().access_token;

    return (
        <Fragment>
            {location.pathname !== "/auth/login" && <Header/>}
            <main className={css.content}>
                <Router/>
                <FloatButton/>
            </main>
            {location.pathname !== "/auth/login" && <Footer/>}
        </Fragment>
    );
};
import css from "./styles.module.scss";
import cn from "classnames";
import logo from "@/assets/icons/logo.svg";
import {useNavigate, useSearchParams} from "react-router-dom";
import React, {useState} from "react";
import {userModel} from "@/entities/user";
import {BlockingLoader} from "@/shared/ui/BlockingLoader";
import {Alerts} from "@/shared/ui/alerts";


export const Activation = () => {

    const navigate = useNavigate();
    const {requestActivation} = userModel.useAuth();
    const [params] = useSearchParams();
    const [code, setCode] = useState("");


    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();
            BlockingLoader.show();
            await requestActivation(`${params.get("email")}`, code);
            await Alerts.showSuccess("Аккаунт активирован");
            navigate("/");
        } catch {
            await Alerts.showError("Почта или код неверно введены");
        } finally {
            BlockingLoader.hide();
        }
    };

    return (
        <div className={css.root}>
            <div className={cn(css.wallpaper, "container")}>
                <img src={logo} alt="logo"/>
                <button onClick={() => navigate(-1)} className={css.closeBtn}>
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule={"evenodd"} clipRule={"evenodd"}
                            d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 7.16344 24.8366 0 16
                              0C7.16344 0 0 7.16344 0 16ZM29.0909 16C29.0909 23.2299 23.2299 29.0909 15.9999
                              29.0909C8.77004 29.0909 2.90904 23.2299 2.90904 16C2.90904 8.77007 8.77004 2.90908
                              15.9999 2.90908C23.2299 2.90908 29.0909 8.77007 29.0909 16ZM21.8182 12.4237L19.5763
                              10.1818L16 13.7581L12.4237 10.1818L10.1818 12.4237L13.7581 16L10.1819 19.5763L12.4238
                              21.8182L16 18.2419L19.5762 21.8182L21.8181 19.5763L18.2419 16L21.8182 12.4237Z"
                            fill="#BDBDBD"/>
                    </svg>
                </button>
                <p className={css.title}>Введите код подтверждения, которую получили на почту</p>
                <form onSubmit={handleSubmit}>
                    <input type="email" placeholder={`${params.get("email")}`}
                        required
                        value={`${params.get("email")}`}
                    />
                    <input type="text" placeholder={"Код"}
                        required
                        onChange={(e) => setCode(e.target.value)}
                        value={code}
                    />
                    <button type="submit" className={css.btn}>
                        Далее
                    </button>
                </form>
            </div>
        </div>
    );
};
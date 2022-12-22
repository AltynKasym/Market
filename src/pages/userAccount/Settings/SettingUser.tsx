import {Link, useNavigate} from "react-router-dom";

import {userModel} from "@/entities/user";
import {ValidationSettings} from "./validation/ValidationSettings";
import css from "./styles.module.scss";


export const SettingUser = () => {
    const {signOut, user} = userModel.useAuth();
    const navigate = useNavigate();
    const onLogOut = () => {
        signOut();
        navigate("/");
    };


    return (
        <div className={css.setting}>
            <ValidationSettings/>
            <div className={css.line}></div>
            <div className={css.checkBox}>
                <p className={css.title}>Настройки уведомлений</p>
                <form action="" className={css.fromRadio}>
                    <label className={css.radio}>
                        <input name="radio" type="radio" checked/>
                        <span>Включить</span>
                    </label>
                    <label className={css.radio}>
                        <input name="radio" type="radio"/>
                        <span>Выключить</span>
                    </label>
                </form>
                <button
                    className={css.mobileExit}
                    type="button"
                    onClick={onLogOut}
                >
                    Выйти с аккаунта
                </button>
                {user?.is_superuser &&
                    <Link to='/admin/adverts' className={css.linkAdmin}>
                        Супер Админ
                    </Link>
                }
            </div>
            <div className={css.lineOne}></div>
            <button className={css.exit} type="button" onClick={onLogOut}>
                Выйти с аккаунта
            </button>
        </div>
    );
};

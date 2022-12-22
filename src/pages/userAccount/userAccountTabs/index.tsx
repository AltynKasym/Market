import {userModel} from "@/entities/user";
import {NavTabs} from "@/shared/ui/navTabs";

import css from "./styles.module.scss";

import speakerIcon from "@/assets/icons/user_account/speaker2.svg";
import settingsIcon from "@/assets/icons/user_account/setting.svg";
import favoritesIcon from "@/assets/icons/user_account/favorite.svg";
import messageIcon from "@/assets/icons/user_account/messages.svg";


export const UserAccountTabs = () => {
    const {user} = userModel.useAuth();

    return (
        <div className={css.root}>
            <div className="container">
                <h2 className={css.title}>
                    Кабинет пользователя: &nbsp;
                    <span className={css.userName}>{user?.last_name} {user?.first_name}</span>
                </h2>
                <div className={css.tabs}>
                    <NavTabs links={tabLinks}/>
                </div>
            </div>
        </div>
    );
};


const tabLinks = [
    {
        title: "Мои объявления",
        src: "/user-account",
        icon: speakerIcon
    },
    {
        title: "История транзакции",
        src: "/user-account/transaction",
        icon: settingsIcon
    },
    {
        title: "Избранные",
        src: "/user-account/favorites",
        icon: favoritesIcon
    },
    {
        title: "Сообщения",
        src: "/user-account/announcements",
        icon: messageIcon
    },
    {
        title: "Настройки",
        src: "/user-account/settings",
        icon: settingsIcon
    }
];
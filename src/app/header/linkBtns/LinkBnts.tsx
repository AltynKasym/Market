import {useEffect, useState} from "react";
import {Link, NavLink} from "react-router-dom";

import css from "./style.module.scss";
import cn from "classnames";

import {useAppSelector} from "@/store";

import {ReactComponent as Location} from "@/assets/icons/location.svg";
import {userModel} from "@/entities/user";
import userIcon from "@/assets/icons/avatar.svg";
import favorite from "@/assets/icons/favorite.svg";
import message from "@/assets/icons/mail.svg";


export const LinkButtnos = () => {
    const {user} = userModel.useAuth();
    const [location, setLocation] = useState<Optional<string>>();
    const favoritesQty = useAppSelector(state => state.favoritesInfo);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(obj => {
                const url = "https://api.bigdatacloud.net/data/reverse-geocode-client?"
                    + `latitude=${obj.coords.latitude}&longitude=${obj.coords.longitude}&localityLanguage=en`;
                fetch(url)
                    .then(res => res.json())
                    .then(data => setLocation(data.principalSubdivision));
            });
        } else
            alert("Geolocation is not supported by this browser.");
    }, [navigator]);

    return (
        <div className={css.linkBnts}>
            <div className={cn("container", css.container)}>
                <div className={css.linksBlock}>
                    <div className={css.bntBlock}>
                        <NavLink end to="/" className={({isActive}) => cn(css.link, isActive && css.linkActive)}>
                            Объявления
                        </NavLink>
                        <NavLink to="/about" className={({isActive}) => cn(css.link, isActive && css.linkActive)}>
                            О нас
                        </NavLink>
                        <NavLink to="/help" className={({isActive}) => cn(css.link, isActive && css.linkActive)}>
                            Помощь
                        </NavLink>
                    </div>
                    <div className={css.line}></div>
                    <div className={css.locationBlock}>
                        <p className={css.locationTitle}>Местоположение:</p>
                        <Location className={css.locationImg}/>
                        <p className={css.locationDescr}>
                            {location ? location : "Все регионы"}
                        </p>
                    </div>
                </div>
                <div className={css.userBlock}>
                    <Link
                        className={css.user}
                        to={user ? "/user-account" : "/auth/login"}
                    >
                        <img src={userIcon} alt="userIcon" className={css.userIcon}/>
                        <p className={css.userText}>
                            {user ? user.first_name : "Вход"}
                        </p>
                    </Link>
                    <Link to="/user-account/favorites" className={css.favorite}>
                        <img src={favorite} alt="favorite" className={css.favIcon}/>
                        <span className={css.favText}>{favoritesQty}</span>
                    </Link>
                    <Link to="/user-account/announcements" className={css.message}>
                        <img src={message} alt="message" className={css.mesIcon}/>
                        {/*<p className={css.row}></p>*/}
                        {/*<p className={css.mesText}>14</p>*/}
                    </Link>
                </div>
            </div>
        </div>
    );
};



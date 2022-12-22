import {Link, NavLink, useNavigate} from "react-router-dom";
import React, {useEffect, useRef, useState} from "react";

import {advertModel} from "@/entities/advert";

import user from "@/assets/icons/avatar.svg";
import {ReactComponent as Plus} from "@/assets/icons/plus-circle.svg";
import favorite from "@/assets/icons/favorite.svg";
import message from "@/assets/icons/mail.svg";
import searchIcon from "@/assets/icons/search.svg";
import {ReactComponent as Logo} from "@/assets/icons/zmall-logo.svg";
import {ReactComponent as Location} from "@/assets/icons/location.svg";
import {ReactComponent as Menu} from "@/assets/icons/menu.svg";
import {SelectCategories} from "./selectCategories/SelectCategories";
import {SelectLocation} from "./selectLocation/SelectLocation";

import cn from "classnames";
import css from "./styles.module.scss";
import {commonEntitiesApi} from "@/shared/api";

import {useOutsideAlerter} from "@/shared/hooks";
import empty from "@/assets/images/empty-card-image.png";
import {useAppSelector} from "@/store";


export const Mobile = () => {
    const favoritesQty = useAppSelector(state => state.favoritesInfo);

    const [isActive, setIsActive] = useState<boolean>(false);
    const [city, setCity] = useState<Optional<number>>();
    const [isActiveCategories, setIsActiveCategories] = useState<boolean>(false);
    const [category, setCategory] = useState<Optional<number>>();
    const [value, setValue] = useState<string>("");
    const [isShow, setIsShow] = useState<boolean>(false);
    const {data: categories} = commonEntitiesApi.useGetCategoriesQuery();
    const {data: advertsData, isLoading} = advertModel.advertApi.useGetAdvertsQuery({
        categoryId: category,
        cityId: city,
        search: value
    },
    {skip: !value}
    );

    const navigate = useNavigate();
    const {data: cities} = commonEntitiesApi.useGetCitiesQuery();

    useEffect(() => {
        value && setIsShow(true);
    }, [value]);

    const handlerSubmit = () => {
        navigate("/search", {state: {arr: advertsData}});
        setIsShow(false);
    };

    const ref = useRef<HTMLDivElement>(null);
    useOutsideAlerter(ref, () => {
        setIsShow(false);
    });

    const linksPage = [
        {
            title: "Объявления",
            link: "/"
        },
        {
            title: "О нас",
            link: "/about"
        },
        {
            title: "Помощь",
            link: "/help"
        },
    ];

    return (
        <div className={css.mobile}>
            <div className={css.oneBlock}>
                <div className={cn("container", css.container)}>
                    <Link to="/" className={css.logo}>
                        <Logo className={css.logoIcon}/>
                    </Link>
                    <div className={css.blocksSoc}>
                        <Link to="/user-account/favorites" className={css.favorite}>
                            <img src={favorite} alt="favorite" className={css.favIcon}/>
                            <span className={css.favText}>{favoritesQty}</span>
                        </Link>
                        <Link to="/user-account/announcements" className={css.favorite}>
                            <img src={message} alt="message" className={css.favIcon}/>
                        </Link>
                        <Link to="/user-account" className={css.favorite}>
                            <img src={user} alt="user" className={css.favIcon}/>
                        </Link>
                    </div>
                </div>
            </div>
            <div className={css.three}>
                {linksPage.map((item, index) =>
                    <NavLink end to={`${item.link}`} key={index}
                        className={({isActive}) => cn(css.link, isActive && css.linkActive)}>
                        {item.title}
                    </NavLink>
                )}
            </div>
            <div className={css.twoBlock}>
                <div className={cn("container", css.container)}>
                    <Location
                        className={css.icon}
                        onClick={() => {
                            setIsActive(!isActive);
                            setIsActiveCategories(false);
                        }}
                    />
                    <Menu
                        className={css.icon}
                        onClick={() => {
                            setIsActive(false);
                            setIsActiveCategories(!isActiveCategories);
                        }}
                    />
                    <div className={css.form}>
                        <input type="text" placeholder="Поиск объявлений..."
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            onClick={() => setIsShow(true)}
                        />
                        <button type="button" onClick={handlerSubmit}>
                            <img src={searchIcon} alt="searchIcon" className={css.seacrhIcon}/>
                        </button>
                    </div>
                    <Link className={css.plus} to="/post-advert">
                        <Plus className={css.plusIcon}/>
                    </Link>
                    <div className={css.searchAdvert}>
                        {
                            (isShow && value && !isLoading)
                                ? advertsData?.results.map((item, i) => (
                                    <Link to={`/detail/${item.id}`} className={css.item} key={i}
                                        onClick={() => setValue("")}
                                    >
                                        {<img src={item.advert_image?.[0]?.image || empty} alt="img"/>}
                                        <div className={css.text}>
                                            <p className={css.title}>{item.name}</p>
                                            <p className={css.number}>{item.start_price} ₸</p>
                                        </div>
                                    </Link>
                                )) : null}
                    </div>
                </div>
            </div>
            {isActive && (
                <SelectLocation citys={cities || []} selectCity={city} onSelectCity={(city) => setCity(city.id)}
                    onClose={() => setIsActive(false)}/>
            )}

            {isActiveCategories && (
                <SelectCategories
                    categories={categories || []}
                    selectedCategory={category}
                    onSelectCategory={(category) => setCategory(category.id)}
                    onClose={() => setIsActiveCategories(false)}
                />
            )}
        </div>
    );
};


import {Link} from "react-router-dom";
import {useEffect, useState} from "react";

import {Api, commonEntitiesApi} from "@/shared/api";
import {linkResponse} from "@/shared/api/types";

import {footerData} from "./data"; // TODO: убрать и поключить API
import css from "./styles.module.scss";

import googlePlayIcon from "@/assets/icons/google-play.svg";
import classmates from "@/assets/icons/footer/ok.svg";
import facebook from "@/assets/icons/footer/facebook.svg";
import instagram from "@/assets/icons/footer/instagram.svg";


export const Footer = () => {
    const {data: cities} = commonEntitiesApi.useGetCitiesQuery();
    const {data: categories} = commonEntitiesApi.useGetCategoriesQuery();
    const [links, setLinks] = useState<linkResponse[]>([]);

    useEffect(() => {
        Api.Common.getFooterLinks().then(res => setLinks(res.data));
    }, []);


    return (
        <footer className={css.footer}>
            <div className="container">
                <div className={css.content}>
                    <div className={css.aboutProject}>
                        <nav>
                            <h2 className={css.title}>О проекте</h2>
                            <ul className={css.nav}>
                                {
                                    footerData.map((link, i) => (
                                        <li key={i}>
                                            <Link to={link.link}>
                                                {link.title}
                                            </Link>
                                        </li>
                                    ))
                                }
                            </ul>
                        </nav>
                        <div>
                            <div>
                                <h2 className={css.title}>
                                    Каталог объявлений
                                </h2>
                                <div className={css.boxBlock}>
                                    {
                                        categories?.map((category, i) => (
                                            <Link
                                                key={i}
                                                className={css.box}
                                                to={`/category/${category.id}`}
                                            >
                                                {category.name}
                                            </Link>
                                        ))
                                    }
                                </div>

                            </div>
                            <div className={css.cityBox}>
                                <h2 className={css.title}>
                                    Объявления по городам
                                </h2>
                                <div className={css.boxBlock}>
                                    {
                                        cities?.map(city => (
                                            <Link
                                                key={city.id}
                                                className={css.box}
                                                to="/category/-1"
                                                state={{cityId: city.id}}
                                            >
                                                {city.name}
                                            </Link>
                                        ))
                                    }
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className={css.mediaBox}>
                        <p>Бесплатное приложение для твоего телефона</p>
                        <a href={links[0]?.links?.link}>
                            <img className={css.googleIcon} src={googlePlayIcon} alt="google-play"/>
                        </a>
                        <p>Zmall в социальных сетях</p>
                        <div className={css.media}>
                            <a href={links[1]?.links?.link} target="_blank" rel="noopener,noreferrer">
                                <img src={classmates} alt="img"/>
                            </a>
                            <a href={links[2]?.links?.link} target="_blank" rel="noopener,noreferrer">
                                <img src={facebook} alt="img"/>
                            </a>
                            <a href={links[3]?.links?.link} target="_blank" rel="noopener,noreferrer">
                                <img src={instagram} alt="img"/>
                            </a>
                        </div>
                        <p>{links[0]?.text} </p>
                    </div>
                </div>
            </div>
        </footer>
    );
};
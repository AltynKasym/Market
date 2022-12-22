import {Link} from "react-router-dom";

import {ReactComponent as Logo} from "@/assets/icons/logo.svg";
import {Icon} from "./Icon";

import css from "./styles.module.scss";
import classNames from "classnames";
import {useEffect} from "react";


export const NotFound = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <div className={css.errorPage}>
            <div className={classNames("container", css.container)}>
                <div className={css.block}>
                    <Logo className={css.logo}/>
                    <p className={css.title}>Страница не найдена</p>
                    <p className={css.descr}>
                        Страницы, на которую вы попытались попасть не существует. Попробуйте её найти вернувшись
                        на {" "}
                        <Link to="/" className={css.link}>
                            главную страницу.
                        </Link>
                    </p>
                    <p className={css.descr2}>
                        Если вы уверены в том, что эта страница здесь должна быть, то {" "}
                        <Link to="/" className={css.link}>
                            напишите нам
                        </Link> {" "}
                        пожалуйста.
                    </p>
                    <Icon/>
                </div>
            </div>
        </div>
    );
};
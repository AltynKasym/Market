import {useState, useEffect} from "react";
import cn from "classnames";
import css from "./styles.module.scss";

import upArrow from "@/assets/icons/arrow/up.svg";


export const FloatButton = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        window.addEventListener("scroll", toggleVisibility);

        return () => {
            window.removeEventListener("scroll", toggleVisibility);
        };
    }, []);

    const toggleVisibility = () => {
        setIsVisible(window.scrollY > 150);
    };

    return (
        <div className={cn(css.floating, {[css.hidden]: !isVisible})}
            onClick={() => window.scrollTo(0, 0)}
        >
            <img className={css.iconUp} src={upArrow} alt="upArrow"/>
        </div>
    );
};
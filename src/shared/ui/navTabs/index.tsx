import {NavLink} from "react-router-dom";
import cn from "classnames";

import css from "./styles.module.scss";


interface Props {
    links: {
        title: string;
        src: string;
        icon: string;
    }[];
}


export const NavTabs = ({links}: Props) => {
    return (
        <nav>
            <ul className={css.root}>
                {
                    links.map((link, i) => (
                        <li key={i}>
                            <NavLink
                                end to={link.src}
                                className={({isActive}) => cn(isActive && css.active)}>
                                <span>{link.title}</span>
                                <img src={link.icon} alt="icon"/>
                            </NavLink>
                        </li>
                    ))
                }
            </ul>
        </nav>
    );
};
import {Link} from "react-router-dom";
import css from "./styles.module.scss";

import homeIcon from "@/assets/icons/home.svg";


interface Props {
    location: {
        folder: string;
        name: string;
    }[];
}


export const BreadCrumbs = ({location}: Props) => {
    const folders = location.map(item => item.folder);


    return (
        <div className={css.breadCrumbs}>
            <Link to={"/"} className={css.oneBlock}>
                <div className={css.circle}>
                    <img src={homeIcon} alt="home" className={css.home}/>
                </div>
                <span className={css.folder}>Zmall</span>
            </Link>
            {
                location.map((item, index) => (
                    <div key={index} className={css.crumb}>
                        <span className={css.divider}><div></div></span>
                        {
                            (index + 1 === location.length)
                                ? <span className={css.folder}>{item.name}</span>
                                : (
                                    <Link
                                        to={"/" + folders.filter((folder, i) => i <= index).join("/")}
                                    >
                                        <span className={css.folder}>{item.name}</span>
                                    </Link>
                                )
                        }
                    </div>
                ))
            }
        </div>
    );
};
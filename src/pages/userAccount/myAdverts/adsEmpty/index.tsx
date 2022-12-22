import {useNavigate} from "react-router-dom";

import css from "./styles.module.scss";

import {ReactComponent as AdsEmtyIcon} from "@/assets/icons/user_account/adsEmpty.svg";
import {ReactComponent as AdsEmtyBackIcon} from "@/assets/icons/user_account/back.svg";
import {ReactComponent as Plus} from "@/assets/icons/user_account/plus.svg";


export const AdsEmpty = () => {
    const navigate = useNavigate();
    return (
        <div>
            <h2 className={css.title}>Пусто</h2>
            <div className={css.adsEmpty}>
                <div className={css.icon}>
                    <AdsEmtyBackIcon className={css.backIcon} />
                    <AdsEmtyIcon className={css.frontIcon} />
                </div>
                <div className={css.btns}>
                    <button className={css.btn} onClick={() => navigate("/post-advert")}>
                        <Plus /> добавить объявление
                    </button>
                </div>
            </div>
        </div>
    );
};

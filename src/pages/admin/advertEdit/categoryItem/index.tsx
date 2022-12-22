import {DTO} from "@/shared/api";
import css from "./styles.module.scss";


export const CategoryItem = ({id, name, icon, advert_count}: DTO.Category) => {
    return (
        <div className={css.categoryItem}>
            <img src={icon} alt="img"/>
            <div className={css.info}>
                <p className={css.title}>{name}</p>
                <p className={css.subText}>
                    {advert_count.toLocaleString("ru")} объявления
                </p>
            </div>
        </div>
    );
};
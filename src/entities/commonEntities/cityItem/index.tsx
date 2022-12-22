import {DTO} from "@/shared/api";
import css from "./styles.module.scss";


export const CityItem = ({id, name}: DTO.City) => {
    return (
        <div className={css.cityItem}>
            <p className={css.title}>
                {name}
            </p>
        </div>
    );
};
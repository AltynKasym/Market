import {DTO} from "@/shared/api";
import css from "./styles.module.scss";


export const SubCategoryItem = ({id, name}: DTO.SubCategory) => {
    return (
        <div className={css.subCategoryItem}>
            <p className={css.subTitle}>
                {name}
            </p>
        </div>
    );
};
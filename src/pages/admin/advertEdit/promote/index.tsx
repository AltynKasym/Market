import {DTO} from "@/shared/api";
import css from "./styles.module.scss";


export const PromoteItem = ({id, title}: DTO.Promote) => {
    return (
        <div className={css.subCategoryItem}>
            <p className={css.subTitle}>
                {title}
            </p>
        </div>
    );
};
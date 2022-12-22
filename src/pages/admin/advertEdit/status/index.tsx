import css from "./style.module.scss";


interface Props {
    name : string;
}
export const StatusItem = ({name} : Props) => {
    return (
        <div className={css.subCategoryItem}>
            <p className={css.subTitle}>
                {name}
            </p>
        </div>
    );
};
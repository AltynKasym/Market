import css from "./styles.module.scss";


export const Spinner = () => {
    return (
        <div className={css.root}>
            <div className={css.loader}></div>
        </div>
    );
};
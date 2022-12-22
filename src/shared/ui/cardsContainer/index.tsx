import {ReactNode} from "react";
import css from "./styles.module.scss";


interface Props {
    children?: ReactNode;
}


export const CardsContainer = ({children}: Props) => {
    return (
        <div className={css.root}>
            {children}
        </div>
    );
};
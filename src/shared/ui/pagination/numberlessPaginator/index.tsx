import React from "react";
import css from "./styles.module.scss";

import {ReactComponent as ArrowLeftIcon} from "@/assets/icons/arrow/carousel-left.svg";
import {ReactComponent as ArrowRightIcon} from "@/assets/icons/arrow/carousel-right.svg";


interface Props {
    onNextClick: () => void;
    onPrevClick: () => void;
}


export const NumberlessPaginator = ({onNextClick, onPrevClick}: Props) => {
    return (
        <div className={css.root}>
            <ArrowLeftIcon className={css.button} onClick={onPrevClick}/>
            <ArrowRightIcon className={css.button} onClick={onNextClick}/>
        </div>
    );
};
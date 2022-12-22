import cn from "classnames";
import {DTO} from "@/shared/api";
import css from "./styles.module.scss";

import {ReactComponent as DiagramBarsIcon} from "@/assets/icons/diagram-bars.svg";


interface Props {
    sortType: DTO.AdvertsRequestOrdering;
    onChangeSortType: (sortType: DTO.AdvertsRequestOrdering) => void;
}


export const SortTypeSelector = ({sortType, onChangeSortType}: Props) => {
    const isSortByDate = (sortType === "created_date" || sortType === "-created_date");
    const isSortByPrice = (sortType === "start_price" || sortType === "-start_price");


    const sortByPrice = () => {
        if (!isSortByPrice)
            onChangeSortType("start_price");
        else {
            onChangeSortType(
                (sortType === "start_price")
                    ? "-start_price"
                    : "start_price"
            );
        }
    };

    const sortByDate = () => {
        if (!isSortByDate)
            onChangeSortType("created_date");
        else {
            onChangeSortType(
                (sortType === "created_date")
                    ? "-created_date"
                    : "created_date"
            );
        }
    };


    return (
        <div className={css.root}>
            <button
                className={cn(css.button, isSortByDate && css.buttonActive)}
                onClick={sortByDate}
                type="button"
            >
                <span>По дате</span>
                <DiagramBarsIcon
                    className={cn(css.icon, (sortType === "-created_date") && css.revertedIcon)}
                />
            </button>
            <button
                className={cn(css.button, isSortByPrice && css.buttonActive)}
                onClick={sortByPrice}
                type="button"
            >
                <span>По цене</span>
                <DiagramBarsIcon
                    className={cn(css.icon, (sortType === "-start_price") && css.revertedIcon)}
                />
            </button>
        </div>
    );
};
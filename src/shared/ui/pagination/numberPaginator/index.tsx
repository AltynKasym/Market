import _ from "lodash";
import css from "./styles.module.scss";

import {ReactComponent as ArrowRight} from "@/assets/icons/arrow/carousel-right.svg";
import {ReactComponent as ArrowLeft} from "@/assets/icons/arrow/carousel-left.svg";


interface Props {
    totalQty: number;
    pageSize: number;
    page: number;
    onChangePage: (page: number) => void;
}


export const NumberPaginator = ({totalQty, pageSize, page, onChangePage}: Props) => {
    const pageCount = Math.ceil(totalQty / pageSize);

    const nextPage = () => {
        if (page + 1 < pageCount)
            onChangePage(page + 1);
    };

    const prevPage = () => {
        if (page - 1 >= 0)
            onChangePage(page - 1);
    };

    const setPage = (page: number) => {
        onChangePage(page);
    };


    return (
        <div className={css.pagination}>
            <ArrowLeft className={css.paginationButton} onClick={prevPage}/>
            {
                _.range(pageCount)
                    .map((_, index) =>
                        <p
                            key={index}
                            className={page === index ? css.activePage : css.pages}
                            onClick={() => setPage(index)}
                        >
                            {index + 1}
                        </p>
                    )
            }
            <ArrowRight className={css.paginationButton} onClick={nextPage}/>
        </div>
    );
};
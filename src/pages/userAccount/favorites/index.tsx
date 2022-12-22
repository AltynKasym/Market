import {useState, useEffect} from "react";

import {advertModel, AdvertCard, SkeletonAdvertCard} from "@/entities/advert";
import {CardsContainer} from "@/shared/ui/cardsContainer";
import {NumberlessPaginator} from "@/shared/ui/pagination/numberlessPaginator";

import css from "./styles.module.scss";


const PAGE_SIZE = 15;


export const Favorites = () => {
    const [offset, setOffset] = useState(0);
    const [page, setPage] = useState(0);

    const {data: advertsData,
        isLoading,
        isFetching,
        error
    } = advertModel.advertApi.useGetFavoriteAdvertsQuery({
        limit: PAGE_SIZE,
        offset: offset,
        ordering: "-created_date"
    });

    const totalQty = advertsData?.count || 0;

    useEffect(() => {
        if (advertsData && advertsData.results.length === 0)
            onChangePage(0);
    }, [advertsData]);


    const onChangePage = (pageNum: number) => {
        if (pageNum < 0)
            return;
        if (pageNum * PAGE_SIZE >= totalQty)
            return;
        setPage(pageNum);
        setOffset(pageNum * PAGE_SIZE);
    };


    if (isLoading || error)
        return (
            <>
                <h2 style={{
                    font: "700 24px/24px Inter",
                    margin: "40px 0 20px 0"
                }}>Избранное</h2>
                <SkeletonAdvertCard count={5}/>
            </>);


    return (
        <div className={css.favorite}>
            {
                (advertsData?.results.length)
                    ? (
                        <div>
                            <div className={css.header}>
                                <h2 className={css.title}>Избранное</h2>
                                {
                                    (totalQty > PAGE_SIZE) && (
                                        <NumberlessPaginator
                                            onNextClick={() => onChangePage(page + 1)}
                                            onPrevClick={() => onChangePage(page - 1)}
                                        />
                                    )
                                }
                            </div>
                            <CardsContainer>
                                {
                                    advertsData?.results
                                        .map((item, i) => <AdvertCard key={i} adverts={item}/>)
                                }
                                {
                                    isFetching && <SkeletonAdvertCard count={1}/>
                                }
                            </CardsContainer>
                        </div>
                    )
                    : (
                        <div className={css.empty}>
                            <p>Пусто</p>
                        </div>
                    )
            }
        </div>
    );
};
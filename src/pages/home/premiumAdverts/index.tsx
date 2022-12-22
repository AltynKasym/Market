import {useState} from "react";

import {advertModel, AdvertCard, SkeletonAdvertCard} from "@/entities/advert";
import {NumberlessPaginator} from "@/shared/ui/pagination/numberlessPaginator";
import {CardsContainer} from "@/shared/ui/cardsContainer";

import css from "./styles.module.scss";


const PAGE_SIZE = 10;

export const PremiumAdverts = () => {
    const [page, setPage] = useState(0);
    const [offset, setOffset] = useState(0);

    const {
        data: advertsData,
        isLoading,
        isFetching,
        error
    } = advertModel.advertApi.useGetPremiumAdvertsQuery({
        limit: PAGE_SIZE,
        offset: offset,
        ordering: "-created_date"
    });

    const totalQty = advertsData?.count || 0;


    const onChangePage = (pageNum: number) => {
        if (pageNum < 0)
            return;
        if (pageNum * PAGE_SIZE >= totalQty)
            return;
        setPage(pageNum);
        setOffset(pageNum * PAGE_SIZE);
    };

    if (isLoading || error) {
        return (
            <div className={css.root}>
                <h2 className={css.title}>Премиум объявления в Бишкеке </h2>
                <SkeletonAdvertCard count={10}/>
            </div>
        );
    }


    return (
        <div className={css.root}>
            <div className={css.header}>
                <h2 className={css.title}>Премиум объявления в Бишкеке </h2>
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
                    !isFetching && (advertsData?.results
                        .map(advert => <AdvertCard key={advert.id} adverts={advert}/>))
                }
                {
                    isFetching && <SkeletonAdvertCard count={10}/>
                }
            </CardsContainer>
        </div>
    );
};

import {useState, useEffect, useRef} from "react";
import useInfiniteScroll from "react-infinite-scroll-hook";
import cn from "classnames";

import {advertModel, AdvertCard, SkeletonAdvertCard} from "@/entities/advert";
import {useAppSelector, useAppDispatch, slices} from "@/store";
import {CardsContainer} from "@/shared/ui/cardsContainer";

import css from "./styles.module.scss";


const PAGE_SIZE = 20;

export const NewAdverts = () => {
    const [offset, setOffset] = useState(0);

    const dispatch = useAppDispatch();
    const adverts = useAppSelector(state => state.newAdverts);

    useEffect(() => void dispatch(slices.newAdvertsSlice.actions.reset()), []);

    const {data: advertResponseData,
        isLoading,
        isFetching,
        error
    } = advertModel.advertApi.useGetAdvertsQuery({
        limit: PAGE_SIZE,
        offset: offset,
        ordering: "-created_date"
    });

    useEffect(() => {
        if (advertResponseData?.results.length)
            dispatch(slices.newAdvertsSlice.actions.push(advertResponseData.results));
    }, [advertResponseData]);


    const pageNumRef = useRef(0);
    const totalQty = advertResponseData?.count || 0;
    const hasNextPage = offset < totalQty;

    const loadNextPage = () => {
        setOffset(prev => {
            if (isFetching && hasNextPage)
                return prev;
            if (pageNumRef.current * PAGE_SIZE >= totalQty)
                return prev;

            pageNumRef.current += 1;
            return pageNumRef.current * PAGE_SIZE;
        });
    };

    const [sentryRef] = useInfiniteScroll({
        loading: isFetching,
        hasNextPage: hasNextPage,
        onLoadMore: loadNextPage,
    });


    if (isLoading || error)
        return <SkeletonAdvertCard count={10}/>;

    return (
        <div className={cn(css.root)}>
            <h2 className={css.title}>Новые объявления в Казахстане</h2>
            <CardsContainer>
                {
                    adverts.map((card, i) => (
                        <AdvertCard key={card.id} adverts={card}/>
                    ))
                }
                {
                    isFetching
                        ? <SkeletonAdvertCard count={1}/>
                        : <div ref={sentryRef}></div>
                }
            </CardsContainer>
        </div>
    );
};
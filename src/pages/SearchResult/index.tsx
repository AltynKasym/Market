import {useLocation} from "react-router-dom";

import {advertModel, AdvertCard} from "@/entities/advert";
import {BreadCrumbs} from "@/features/breadCrumbs";
import {CardsContainer} from "@/shared/ui/cardsContainer";

import css from "./styles.module.scss";


interface LocationArgs {
    categoryId: number;
    searchText: string;
}


export const SearchResult = () => {
    const locationArgs = useLocation().state as LocationArgs;

    const {data: advertsData} = advertModel.advertApi.useGetAdvertsQuery({
        categoryId: locationArgs.categoryId,
        search: locationArgs.searchText
    });

    return (
        <div className={css.searchRoot}>
            <div className={"container"}>
                <BreadCrumbs
                    location={[
                        {
                            folder: "/search",
                            name: "Результат поиска"
                        }
                    ]}
                />
                <h2 className={css.title}>Результат поиска</h2>
                <CardsContainer>
                    {
                        (advertsData?.results.length)
                            ? advertsData.results.map(ad =>
                                <AdvertCard key={ad.id} adverts={ad}/>
                            )
                            : <p className={css.description}>Ничего не найдено</p>
                    }
                </CardsContainer>
            </div>
        </div>

    );
};
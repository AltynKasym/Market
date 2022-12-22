import {useState, useEffect} from "react";
import cn from "classnames";

import {advertModel, UserAdvertCard} from "@/entities/advert";
import {DTO} from "@/shared/api";
import {Utils} from "@/shared/utils";
import {AdsEmpty} from "./adsEmpty";
import css from "./styles.module.scss";

import {ReactComponent as SearchIcon} from "@/assets/icons/user_account/search.svg";


export const MyAdverts = () => {
    const [activeAdverts, setActiveAdverts] = useState<DTO.MyAdvertsResp2[]>([]);
    const [inactiveAdverts, setInactiveAdverts] = useState<DTO.MyAdvertsResp2[]>([]);
    const [reviewAdverts, setReviewAdverts] = useState<DTO.MyAdvertsResp2[]>([]);

    const {data: allAdverts} = advertModel.advertApi.useGetUserAdvertsQuery(undefined, {
        refetchOnMountOrArgChange: true
    });

    const [advertStatus, setAdvertStatus] = useState<Optional<DTO.AdvertStatus>>(DTO.AdvertStatus.Active);
    const [searchText, setSearchText] = useState("");


    useEffect(() => {
        if (allAdverts) {
            const filterIf = Utils.Collection.filterIf;
            const text = searchText.toLowerCase();

            const result = filterIf(allAdverts, Boolean(text), x => x.name.toLowerCase().includes(text));
            setActiveAdverts(result.filter(x => x.status === DTO.AdvertStatus.Active));
            setInactiveAdverts(result.filter(x => x.status === DTO.AdvertStatus.Inactive));
            setReviewAdverts(result.filter(x => x.status === DTO.AdvertStatus.Review));
            console.log("SET");
        }
    }, [allAdverts, searchText]);


    const [adverts, setAdverts] = useState<DTO.MyAdvertsResp2[]>([]);
    useEffect(() => {
        if (advertStatus === DTO.AdvertStatus.Active)
            setAdverts(activeAdverts);
        else if (advertStatus === DTO.AdvertStatus.Inactive)
            setAdverts(inactiveAdverts);
        else if (advertStatus === DTO.AdvertStatus.Review)
            setAdverts(reviewAdverts);
        else
            setAdverts(allAdverts || []);

    }, [advertStatus, activeAdverts, inactiveAdverts, reviewAdverts]);


    return (
        <div>
            <div className={css.tabs}>
                <div className={css.statusFilter}>
                    <span
                        className={cn(css.inact, !advertStatus && css.active)}
                        onClick={() => setAdvertStatus(undefined)}
                    >
                        Все категории &nbsp; {allAdverts?.length}
                    </span>
                    <span
                        className={cn(css.inact, advertStatus === DTO.AdvertStatus.Active && css.active)}
                        onClick={() => setAdvertStatus(DTO.AdvertStatus.Active)}
                    >
                        Активные &nbsp; {activeAdverts.length}
                    </span>
                    <span
                        className={cn(css.inact, advertStatus === DTO.AdvertStatus.Review && css.active)}
                        onClick={() => setAdvertStatus(DTO.AdvertStatus.Review)}
                    >
                        На проверке &nbsp; {reviewAdverts.length}
                    </span>
                    <span
                        className={cn(css.inact, advertStatus === DTO.AdvertStatus.Inactive && css.active)}
                        onClick={() => setAdvertStatus(DTO.AdvertStatus.Inactive)}
                    >
                        Не активные &nbsp; {inactiveAdverts.length}
                    </span>
                    <select
                        name="status"
                        onChange={(e) => setAdvertStatus(e.currentTarget.value as DTO.AdvertStatus)}
                    >
                        <option value={DTO.AdvertStatus.Active.toString()}>Активные {activeAdverts.length}</option>
                        <option value={DTO.AdvertStatus.Review.toString()}>На проверке {reviewAdverts.length}</option>
                        <option value={DTO.AdvertStatus.Inactive.toString()}>Не
                            активные {inactiveAdverts.length}</option>
                    </select>
                </div>

                <div className={css.search}>
                    <input
                        type="text"
                        placeholder="Найти объявление"
                        className={css.inp}
                        onChange={e => setSearchText(e.target.value)}
                    />
                    <SearchIcon className={css.icon}/>
                </div>
            </div>
            {
                (adverts?.length)
                    ? (
                        <div className={css.cards}>
                            {
                                adverts.map(advert => (
                                    <div key={advert.id} className={css.card}>
                                        <UserAdvertCard advert={advert}/>
                                    </div>
                                ))
                            }
                        </div>)
                    : <AdsEmpty/>
            }
        </div>
    );
};

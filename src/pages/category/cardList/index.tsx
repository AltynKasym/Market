import React from "react";
import css from "./styles.module.scss";
import {AdvertCard, ViewType} from "@/entities/advert";
import {DTO} from "@/shared/api";


interface Props {
    viewType: ViewType;
    adverts: DTO.Advert[];
}


export const CardList = ({viewType, adverts}: Props) => {
    return (
        <div className={viewType === ViewType.Grid ? css.grid : css.list}>
            {
                adverts?.map((ad) =>
                    <AdvertCard key={ad.id} adverts={ad} viewType={viewType}/>
                )
            }
        </div>
    );
};
import sim from "./SimilarAdvert.module.scss";
import React from "react";

import {DTO} from "@/shared/api";
import {advertModel, AdvertCard} from "@/entities/advert";


interface Props {
    subcategory:number;
    id:number;
}


export const SimilarAdvert = ({id, subcategory}:Props) => {
    const {data: advertsData} = advertModel.advertApi.useGetAdvertsQuery({
        limit: 5,
        offset: 0,
        ordering: "-created_date",
        subCategoryId: subcategory
    });

    return (
        <div className={sim.root}>
            <div className={sim.title}>{advertsData && "Похожие обьявления"}</div>
            <div className={sim.list}>
                {advertsData && advertsData.results.filter(el => el.id != id).map((el:DTO.Advert, index:number) => {
                    return <AdvertCard viewType={1} adverts={el} key={index}/>;})}
            </div>
        </div>
    );
};
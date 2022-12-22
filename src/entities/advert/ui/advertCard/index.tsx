import {Link, useNavigate} from "react-router-dom";
import cn from "classnames";
import dayjs from "dayjs";

import {advertModel} from "@/entities/advert";
import {DTO, ApiUtil} from "@/shared/api";
import {userModel} from "@/entities/user"; // TODO: cross imports
import {commonEntitiesModel} from "@/entities/commonEntities"; // TODO: cross imports
import {AdMarker} from "@/shared/ui/AdMarker/AdMarker";

import css from "./styles.module.scss";

import inFavorite from "@/assets/icons/card/favorite-white.svg";
import cameraIcon from "@/assets/icons/card/camera.svg";
import favorite from "@/assets/icons/card/favorite.svg";
import emptyCardImg from "@/assets/images/empty-card-image.png";
import React from "react";


export const enum ViewType {
    Grid,
    List
}

interface Props {
    viewType?: ViewType;
    adverts: DTO.Advert;
}


export const AdvertCard = React.memo(({viewType = ViewType.Grid, adverts}: Props) => {
    const [toggleFavorite] = advertModel.advertApi.useSetFavoriteMutation();
    const navigate = useNavigate();
    const {user} = userModel.useAuth();

    const {getCity, getSubCategory} = commonEntitiesModel.useCommonEntities();

    const favoriteToggle = async () => {
        if (!user)
            return navigate("/auth/login"); // TODO: редирект
        try {
            await toggleFavorite({advertId: adverts.id, isFavorite: !adverts.isFavorite})
                .unwrap();
        } catch {
            ApiUtil.dropAuthAndRedirect();
        }
    };


    return (
        <div className={cn(css.root, viewType === ViewType.Grid ? css.grid : css.list, {
            [css.vip]: adverts?.promote === "vip",
            [css.highlighted]: adverts?.promote === "highlighted",
        })}>
            <div className={css.media}>
                <Link to={`/detail/${adverts.id}`}>
                    <img className={css.image}
                        src={adverts.advert_image?.length ? adverts.advert_image[0].image : emptyCardImg} alt="photo"/>
                </Link>
                <img src={adverts?.isFavorite ? favorite : inFavorite}
                    alt="favorite"
                    className={css.favorite}

                    onClick={() => favoriteToggle()}
                />
                <div className={css.adMarker}>
                    {adverts?.promote !== "highlighted" && <AdMarker adType={adverts?.promote}/>}
                </div>

                <div className={adverts?.advert_image_count > 1 ? css.numberOfPhotos : css.unVisable}>
                    <img src={cameraIcon} alt="Number of photos"/>
                    <p>{adverts?.advert_image_count}</p>
                </div>
            </div>

            <Link to={`/detail/${adverts?.id}`} className={css.info}>
                <div>
                    <h2 className={css.title}>{adverts?.start_price} ₸</h2>
                    <h3 className={css.subtitle}>
                        {adverts?.name}
                    </h3>
                    <p className={css.description}>
                        {adverts?.description}
                    </p>
                </div>
                <div className={css.category}>
                    <p className={css.text}>{getSubCategory(adverts?.sub_category)?.name}</p>
                    <p className={css.text}>{getCity(adverts?.city)?.name}</p>
                </div>

                <p className={css.text}>
                    {dayjs(adverts?.created_date).format("DD.MM.YYYY HH:MM")}
                </p>
            </Link>

        </div>
    );
});
import React from "react";

import css from "./adMarker.module.scss";

import hotIcon from "@/assets/icons/card/hot.svg";
import vipIcon from "@/assets/icons/card/vip.svg";
import highlight from "@/assets/icons/detail/whiteHighlight.svg";
import {PromoteType} from "@/shared/api/types";




interface Props {
    adType: PromoteType;
}

export const AdMarker = ({adType}: Props) => {

    
    return (
        <div>
            <div className={adType === "urgently" ? css.saleType : css.unVisable}>
                <img src={hotIcon} alt="hot" />
                <p className={css.saleTypeText}>Срочно</p>
            </div>

            <div className={adType === "vip" ? css.saleType : css.unVisable}>
                <img src={vipIcon} alt="VIP" />
                <p className={css.saleTypeText}>VIP</p>
            </div>

            <div className={adType === "highlighted" ? css.saleType : css.unVisable}>
                <img src={highlight} alt="highlight"/>
                <p>Выделение</p>
            </div>
        </div>
    );
};
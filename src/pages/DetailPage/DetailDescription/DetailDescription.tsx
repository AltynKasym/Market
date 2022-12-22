import d from "../DetailDescription/DetailDescription.module.scss";
import {DetailAbout} from "./DetailAbout/DetailAbout";
import {DetailBoost} from "./DetailBoost/DetailBoost";
import {AdMarker} from "@/shared/ui/AdMarker/AdMarker";
import {DTO} from "@/shared/api";


interface Props {
    data: DTO.ProductData;
    isMyAdvert:boolean;
}


export const DetailDescription = ({data, isMyAdvert}: Props) => {

    return (
        <div className={d.description}>
            <div className={d.status}>
                <AdMarker adType={data.promote} />
            </div>
            <div className={d.row}>
                <DetailAbout
                    cityId={data.city}
                    description={data.description}
                    views={data.views}
                    created_date={data.created_date}
                    advert_image={data.advert_image}
                    price={data.start_price}
                />
                {isMyAdvert && <DetailBoost/>}
            </div>
        </div>
    );
};


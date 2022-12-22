import c from "../DetailAbout/DetailAbout.module.scss";
import {DetailSlider} from "./DetailSlider/DetailSlider";
import  warn  from "@/assets/images/detail/warn.svg";
import  linksFriend  from "@/assets/icons/detail/shares.svg";
import {Report} from "./Report/Report";
import {useState} from "react";
import {DTO, commonEntitiesApi} from "@/shared/api";

import whatsApp from "@/assets/icons/detail/whatsAppDetail.svg";
import facebook from "@/assets/icons/detail/facebookDetail.svg";
import vk from "@/assets/icons/detail/vkDetail.svg";
import telegram from "@/assets/icons/detail/telegramDetail.svg";
import odnoclassniki from "@/assets/icons/detail/okDetail.svg";


const networksImg = [
    {logo: whatsApp, url: "whatsapp://send?text="},
    {logo: vk, url: "http://vk.com/share.php?url="},
    {logo: facebook, url: "https://www.facebook.com/sharer/sharer.php?u="},
    {logo: telegram, url: "https://telegram.me/share/url?url="},
    {logo: odnoclassniki, url: "https://connect.ok.ru/offer?url="},
];

interface Props {
    cityId:number;
    description:string;
    views:number;
    created_date:string;
    advert_image: DTO.images[];
    price:number;
}
export const DetailAbout = ({cityId, description, price,  views, created_date, advert_image}:Props) => {
    const {data: cities} = commonEntitiesApi.useGetCitiesQuery();
    const cityName = cities?.find(x => x.id === cityId)?.name;
    const [isReportActive, setIsReportActive] = useState(false);

    return (
        <div className={c.about}>
            <DetailSlider imgArray={advert_image} price={price}/>
            <div>
                <div className={c.statistics}>
                    <div className={c.statisticsList}>
                        <p>{created_date.slice(0, 10)}</p>
                        <p>№ 098603</p>
                        <p> просмотров: {views}</p>
                    </div>
                    <div className={c.geolocation}> {cityName}</div>
                </div>
                <div className={c.text}>
                    <p>
                        {description}
                    </p>
                    <div className={c.warning}>
                        <img src={warn} alt="err" />
                    </div>
                </div>
                <div className={c.share}>
                    <div className={c.links}>
                        <div className={c.shareFriend}>
                            <img src={linksFriend} alt="err" />
                            <div>Поделиться с другом</div>
                        </div>
                        <div className={c.networks}>
                            {networksImg.map((el, index:number) => {
                                return <div className={c.network} key={index}>
                                    <a target={"_blank"} href={`${el.url}${window.location.href}`}><img src={el.logo} alt="el"  /></a>
                                </div>;
                            })}
                        </div>
                    </div>
                    <div className={c.report}>
                        <p className={c.reportText} onClick={() => setIsReportActive(el => !el)}>Пожаловаться</p>
                        {isReportActive &&
                            <div className={c.reportWindow}>
                                <Report setIsReportActive={setIsReportActive}/>
                            </div>}
                    </div>
                    {/*  */}
                </div>
                <div className={c.line}></div>
            </div>
        </div>
    );
};


import React, {useState, Fragment} from "react";
import {Link} from "react-router-dom";
import cn from "classnames";
import dayjs from "dayjs";

import {advertModel} from "@/entities/advert";
import {commonEntitiesModel} from "@/entities/commonEntities";
import {DTO} from "@/shared/api";
import {Alerts} from "@/shared/ui/alerts";
import {Chart} from "@/components/chart/Chart";

import {AdCardsModal, VitModal} from "./modal/Modal";
import css from "./styles.module.scss";


import cameraIcon from "@/assets/icons/card/camera.svg";
import {ReactComponent as UpdateIcon} from "@/assets/icons/user_account/update.svg";
import {ReactComponent as DeactivateIcon} from "@/assets/icons/user_account/deactivate.svg";
import {ReactComponent as StatisticsIcon} from "@/assets/icons/user_account/statistics.svg";
import speaker from "@/assets/icons/user_account/speaker.svg";
import emptyCardImg from "@/assets/images/empty-card-image.png";
import {Button} from "@/shared/ui/Button";



interface Props {
    advert: DTO.MyAdvertsResp2;
}


export const UserAdvertCard = React.memo(({advert}: Props) => {
    const [isShowPromoteModal, setIsShowPromoteModal] = useState(false);
    const [vipIsOpen, setVipIsOpen] = useState(false);
    const [isShow, setIsShow] = useState(false);

    const {getCategory} = commonEntitiesModel.useCommonEntities();

    const [setAdvertStatusMutation] = advertModel.advertApi.useSetAdvertStatusMutation();


    const onPromoteClick = () => {
        setIsShowPromoteModal(!isShowPromoteModal);
    };

    const click2 = (e: React.SyntheticEvent) => {
        e.preventDefault();
        setVipIsOpen(!vipIsOpen);
    };

    const deactivate = async () => {
        try {
            await setAdvertStatusMutation({advertId: advert?.id, status: DTO.AdvertStatus.Inactive})
                .unwrap();
        } catch (e) {
            console.error(e);
            await Alerts.showError("Ошибка");
        }
    };

    const linkToDetailPage = (advert.status === DTO.AdvertStatus.Active) ? `/detail/${advert.id}` : "";
    console.log(advert);
    return (
        <Fragment>
            <div className={css.card}>
                <Link
                    to={linkToDetailPage}
                    className={css.imgContent}
                    style={!linkToDetailPage ? {cursor: "default"} : {}}
                >
                    <div className={css.imgWrap}>
                        <img
                            src={advert.advert_image?.length ? advert.advert_image[0].image : emptyCardImg}
                            className={css.img} alt="image"
                        />
                    </div>
                    {
                        advert.advert_image.length > 1 && <div className={css.cameraIcon}>
                            <img src={cameraIcon} alt="cameraIcon"/>
                            <span>{advert.advert_image.length}</span>
                        </div>
                    }
                </Link>
                <Link
                    to={linkToDetailPage}
                    className={css.cardInfo}
                    style={!linkToDetailPage ? {cursor: "default"} : {}}
                >
                    <h3 className={css.price}>
                        {advert.start_price} ₸ {advert?.status === "on_r" && <span>На проверке</span>}
                    </h3>
                    <p className={css.title}>{advert.name}.</p>
                    <p className={css.text}>{getCategory(advert.category)?.name}</p>
                    <p className={css.text}>
                        Дата публикации: <span>{dayjs(advert.created_date).format("DD.MM.YYYY HH:MM")}</span>
                    </p>
                    <div className={css.info}>
                        <p className={css.text}>
                            Просмотры:<span> {advert.views}</span>
                        </p>
                        <p className={css.text}>
                            Контакты: <span>{advert.contact_views}</span>
                        </p>
                    </div>
                    <div className={css.btnBox}>
                        {
                            (advert?.status !== DTO.AdvertStatus.Inactive) && (
                                <Button
                                    className={cn(css.btnPromote, advert?.status === DTO.AdvertStatus.Review && css.btnPromoteDisabled)}
                                    type="button"
                                    viewType="blue"
                                    disabled={advert?.status === DTO.AdvertStatus.Review}
                                    onClick={(e) => {
                                        e.preventDefault();
                                        onPromoteClick();
                                    }}
                                >
                                    Рекламировать
                                </Button>
                            )
                        }
                        {advert.promote === "vip" && advert?.status !== "inact" &&
                            <div className={css.vit} onClick={click2}>
                                <img src={speaker} alt="speaker"/>
                                <span>Активные рекламные услуги</span>
                            </div>}
                    </div>
                </Link>
                <div className={css.settings}>
                    {
                        (advert.status !== DTO.AdvertStatus.Inactive)
                            ? (<Fragment>
                                <Link to={`/admin/advert-edit/${advert.id}`} className={css.setting}>
                                    <UpdateIcon className={css.icon}/><span>Редактировать</span>
                                </Link>
                                <button className={css.setting} type="button" onClick={deactivate}>
                                    <DeactivateIcon className={css.icon}/><span> Деактивировать</span>
                                </button>
                            </Fragment>
                            )
                            : null
                    }
                    <div className={css.setting} onClick={() => setIsShow(true)}>
                        <StatisticsIcon className={css.icon}/><span> Статистика</span>
                    </div>
                    {isShow &&
                        <Chart onClick={() => setIsShow(false)} contact={advert.contact_views} views={advert.views} day={dayjs(advert.created_date)
                            .format("DD MMMM YYYY ")}/>
                    }
                </div>
            </div>
            {isShowPromoteModal && <AdCardsModal/>}
            {vipIsOpen && <VitModal/>}
        </Fragment>
    );
});

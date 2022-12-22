import {Fragment} from "react";
import {commonEntitiesApi} from "@/shared/api";
import css from "./styles.module.scss";

import matchIcon from "@/assets/icons/user_account/match.svg";
import fireIcon from "@/assets/icons/user_account/fire.svg";
import premiumIcon from "@/assets/icons/user_account/premiumIcon.svg";


export const AdCardsModal = () => {
    const {data: promotes} = commonEntitiesApi.useGetPromotesQuery();

    return (
        <div className={css.content}>
            <div className={css.block}>
                <h3 className={css.title}>Ускорить продажу</h3>
                {
                    promotes && (
                        <Fragment>
                            <button
                                className={css.info}
                                type="button"
                            >
                                <img src={matchIcon} alt="img"/>
                                <div>
                                    <h4 className={css.stitle}>{promotes[0].title} <span>{promotes[0].price} ₸</span></h4>
                                    <p className={css.desc}>{promotes[0].description}</p>
                                </div>
                            </button>
                            <button
                                className={css.info}
                                type="button"
                            >
                                <img src={fireIcon} alt="img"/>
                                <div>
                                    <h4 className={css.stitle}>{promotes[1].title} <span>{promotes[1].price} ₸</span></h4>
                                    <p className={css.desc}>{promotes[1].description}</p>
                                </div>
                            </button>
                            <button
                                className={css.info}
                                type="button"
                            >
                                <img src={premiumIcon} alt="img"/>
                                <div>
                                    <h4 className={css.stitle}>{promotes[2].title} <span>{promotes[2].price} ₸</span></h4>
                                    <p className={css.desc}>{promotes[2].description}</p>
                                </div>
                            </button>
                        </Fragment>
                    )
                }
            </div>
        </div>
    );
};

export const VitModal = () => {
    return (
        <div className={css.vitContent}>
            <div className={css.box}>
                <img src={premiumIcon} alt="premiumIcon"/>
                <h2 className={css.title}>премиум</h2>
            </div>
            <div className={css.date}>
                до
                <p>09.03.2020</p>{" "}
            </div>
        </div>
    );
};
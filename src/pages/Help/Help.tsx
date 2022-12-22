import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {BreadCrumbs} from "@/features/breadCrumbs";
import {Api} from "@/shared/api";
import {HelpCategory, HelpData} from "@/shared/api/types";
import {Faq} from "@/features/Faq/Faq";

import css from "./styles.module.scss";


export const Help = () => {


    const [data, setData] = useState([]);
    const [helpData, setHelpData] = useState([]);
    const getHelpCategoryData = async () => {
        await Api.Common.getHelpCategory().then((res) => setData(res.data));
    };

    const getHelpData = async () => {
        await Api.Common.getHelp().then((res) => setHelpData(res.data));
    };

    useEffect(() => {
        getHelpCategoryData();
        getHelpData();
    }, []);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <div className={css.help}>
            <div className="container">
                <BreadCrumbs
                    location={[
                        {
                            folder: "/help",
                            name: "Помощь"
                        }
                    ]}
                />
                <h1 className={css.title}>Помощь по сайту</h1>
                <div className={css.content}>
                    <div className={css.boxes}>
                        {data.map((el:HelpCategory) => (
                            <div key={el.id} className={css.box}>
                                <h2 className={css.subtitle}>{el.title}</h2>
                                {helpData.map((item:HelpData) => {
                                    if (el.id === item.help_category) {
                                        return (
                                            <Link to={`/help/${item.help_category}/${item.id}`} key={item.id}>
                                                <p className={css.quiz}>
                                                    {item.question}
                                                </p>
                                            </Link>
                                        );
                                    }
                                })}
                            </div>
                        ))}
                    </div>
                    <div className={css.faqContent}>
                        <Faq />
                    </div>
                </div>
            </div>
        </div>
    );
};

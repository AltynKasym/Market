import {useEffect, useState} from "react";
import {Link} from "react-router-dom";

import {Api} from "@/shared/api";
import {HelpData} from "@/shared/api/types";

import css from "./styles.module.scss";


export const Faq = () => {
    const [faqData, setFaqData] = useState([]);
    const getFaq = async () => {
        await Api.Common.faq().then(res => setFaqData(res.data)).catch(err => console.log(err));
    }; 

    useEffect(() => {
        getFaq();
    }, []);
    return (
        <div className={css.faq}>
            <div>
                <h1 className={css.title}>Частые вопросы</h1>
                {faqData.map((el:HelpData, idx) => (
                    <Link to={`/help/${el.help_category}/${el.id}`} key={idx}>
                        <p className={css.quiz} key={el.id} >{el?.question}</p>
                    </Link>
                ))}
            </div>
        </div>
    );
};
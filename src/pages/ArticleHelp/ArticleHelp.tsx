import {useEffect, useState} from "react";
import {useParams} from "react-router-dom";

import {BreadCrumbs} from "@/features/breadCrumbs";
import {Api} from "@/shared/api";
import {Faq} from "@/features/Faq/Faq";

import {AnotherQuestion} from "./AnotherQuestion/AnotherQuestion";
import css from "./styles.module.scss";


export const ArticleHelp = () => {
    const {helpId} = useParams<{ helpId: string}>();
    const [data, setData] = useState({
        id: 0,
        question: "",
        answer: "",
        view: 0,
        help_category: 0
    });
    const [anotherQuestion, setAnotherQuestion] = useState([]);
    const getHelpData = async () => {
        await Api.Common.getHelpDataById(helpId).then(res => setData(res.data)).catch(err => console.log(err));
    };

    const getAnotherQuestion = async () => {
        await Api.Common.getHelp().then(res => setAnotherQuestion(res.data));
    };

    useEffect(() => {
        getHelpData();
        getAnotherQuestion();
    }, [helpId]);

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <div className={css.articleHelp}>
            <div className="container">
                <div className={css.breadcrumb}>
                    <BreadCrumbs
                        location={[
                            {
                                folder: "help",
                                name: "Помощь"
                            },
                            {
                                folder: "/",
                                name: data.question
                            }
                        ]}
                    />
                </div>
                <h2 className={css.title}>{data.question}</h2>
                <div className={css.content}>
                    <div className={css.box}>
                        <div className={css.answer}>
                            {data.answer}
                        </div>
                        <AnotherQuestion anotherQuestion={anotherQuestion} data={data}/>
                    </div>
                    <div className={css.faqContent}>
                        <Faq/>
                    </div>
                </div>
            </div>
        </div>
    );
};

import {Link} from "react-router-dom";

import {HelpCategory, HelpData} from "@/shared/api/types";

import css from "./styles.module.scss";


type Props = {
    anotherQuestion: Array<HelpCategory>;
    data: HelpData;
}

export const AnotherQuestion = ({anotherQuestion, data}: Props) => {
    return (
        <div>
            <div className={css.line}></div>
            <h3 className={css.subtitle}>Другие вопросы из этого раздела</h3>
            <div className={css.quiz}>
                {anotherQuestion.map((el:any, idx) => {
                    if (el.help_category === data.help_category && el.id !== data.id) {
                        return (
                            <Link to={`/help/${el.help_category}/${el.id}`} key={idx} className={css.text} onClick={() => window.scrollTo(0, 0)}>
                                <p key={el.id}>{el.question}</p>
                            </Link>
                        );
                    }
                })}
            </div>
        </div>
    );};
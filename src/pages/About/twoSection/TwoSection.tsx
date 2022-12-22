import {Link} from "react-router-dom";

import {FadeInSection} from "@/shared/ui/fade/Fade";

import css from "./style.module.scss";


export const TwoSection = () => {
    return (
        <FadeInSection>
            <div className={css.two}>
                <p className={css.title}>В «Работе» всегда много «горящих» предложений от работадателей.</p>
                <p className={css.descr}>
                    Десятки новых вакансий ежедневно, сотни в месяц по различным направлениям от контент-менеджеров и экскаваторщиков до руководителей
                    отделом и директоров.
                </p>
                <Link to="/" className={css.btn}>
                    посмотреть раздел «работа»
                </Link>
            </div>
        </FadeInSection>
    );
};
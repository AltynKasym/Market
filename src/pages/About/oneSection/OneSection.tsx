import {Icon} from "./OneIcon";
import {FadeInSection} from "@/shared/ui/fade/Fade";

import css from "./style.module.scss";


export const OneSection = () => {
    return (
        <FadeInSection>
            <div className={css.one}>
                <div className={css.text}>
                    <p className={css.title}>По популярности, на Zmall, раздел «Работа» входит в</p>
                    <p className={css.descr}>ТОП-5</p>
                </div>
                <div className={css.img}>
                    <Icon />
                </div>
            </div>
        </FadeInSection>
    );
};
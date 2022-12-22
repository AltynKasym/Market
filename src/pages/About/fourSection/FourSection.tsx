import {FadeInSection} from "@/shared/ui/fade/Fade";
import {Icon} from "./FourIcon";

import css from "./styles.module.scss";


export const FourSection = () => {
    return (
        <FadeInSection>
            <div className={css.four}>
                <div className={css.icon}>
                    <Icon />
                </div>
                <div className={css.text}>
                    <p className={css.title}>Платные пакеты и промоуслуги</p>
                    <p className={css.descr}>
                        В это нелёгкое время мы решили, быть максимально дружественными к посетителям нашего сервиса и разработали для них антизисные
                        платные пакеты для размещения вакансий!
                    </p>
                </div>
            </div>
        </FadeInSection>
    );
};
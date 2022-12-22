import {FadeInSection} from "@/shared/ui/fade/Fade";
import {Icon} from "./ThreeIcon";

import css from "./style.module.scss";


export const ThreeSection = () => {
    return (
        <FadeInSection>
            <div className={css.three}>
                <div className={css.text}>
                    <p className={css.title}>Ищите работу и публикуйте вакансии</p>
                    <p className={css.descr}>
                        В отличии от конкурентов, мы позволяем разместить у себя одно <span>бесплатное объявление</span> в разделе «Работа» с одного
                        аккаунта, что позволяет как соискателям, так и работадателям быстро и без затрат закрыть срочные потребности в поиске работы
                        или вакансии.
                    </p>
                </div>
                <div className={css.icon}>
                    <Icon />
                </div>
            </div>
        </FadeInSection>
    );
};
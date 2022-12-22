import {FadeInSection} from "@/shared/ui/fade/Fade";
import {Icon} from "./FiveIcon";
import css from "./styles.module.scss";


export const FiveSection = () => {


    return (
        <FadeInSection>
            <div className={css.five}>
                <div className={css.oneBock}>
                    <div className={css.text}>
                        <p className={css.title}>Пакеты объявлений</p>
                        <p className={css.descr}>
                            В зависимости от того, сколько вы готовы размещать вакансий имеется есть широкий набор пакетов размещений объявлений: от
                            300 тенге за 1 объявление, до 10 000 тенге за 50!
                        </p>
                        <p className={css.price}>от 300 до 10 000 тенге</p>
                    </div>
                    <div className={css.icon}>
                        <Icon />
                    </div>
                </div>

            </div>
        </FadeInSection>
    );
};
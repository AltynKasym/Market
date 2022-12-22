import {FadeInSection} from "@/shared/ui/fade/Fade";
import {Icon} from "./SixIcon";

import css from "./styles.module.scss";
import {useState} from "react";
import cn from "classnames";


export const SixSection = () => {
    const [count, setCount] = useState(1);

    return (
        <FadeInSection>
            <div className={css.twoBlock}>
                <p className={cn(css.link, count === 1 ? css.linkActive : null)}
                    onClick={() => setCount(1)}>Платные пакеты</p>
                <p className={cn(css.link, count === 2 ? css.linkActive : null)}
                    onClick={() => setCount(2)}>Пакет «Турбо»</p>
                <p className={cn(css.link, count === 3 ? css.linkActive : null)}
                    onClick={() => setCount(3)}>Премиум</p>
                <p className={cn(css.link, count === 4 ? css.linkActive : null)}
                    onClick={() => setCount(4)}>Поднятие</p>
                <p className={cn(css.link, count === 5 ? css.linkActive : null)}
                    onClick={() => setCount(5)}>Выделение</p>
                <p className={cn(css.link, count === 6 ? css.linkActive : null)}
                    onClick={() => setCount(6)}>Срочно</p>
                <p className={cn(css.link, count === 7 ? css.linkActive : null)}
                    onClick={() => setCount(7)}>Топ</p>
            </div>
            <div className={cn(css.six,
                count === 1 ? css.animation : null,
            )}
            style={{
                display: `${count === 1 ? "flex" : "none"}`
            }}
            >
                <div className={css.icon}>
                    <Icon/>
                </div>
                <div className={css.text}>
                    <p className={css.title}>Персональная бизнес-страница</p>
                    <p className={css.descr}>
                        Благодаря разделу «Магазины» вы можете создать собственную страницу на Bazar.kz и размещать там
                        все свои вакансии. Для этого
                        вам необходимо <span>выбрать один из абонементов*</span> и вы получите страницу с названием,
                        логотипом, описанием компании,
                        списком ваших вакансий, контактной информацией, а так же всеми другими услугами доступными в
                        этом абонементе.
                    </p>
                    <p className={css.condition}>
                        <span>*</span> Более подробно ознакомиться со всеми возможностями «Магазинов» можно на отдельной
                        промо-странице.
                    </p>
                </div>
            </div>
            <div className={cn(css.six,
                count === 2 ? css.animation : null,
            )}
            style={{
                display: `${count === 2 ? "flex" : "none"}`
            }}
            >
                <div className={css.icon}>
                    <Icon/>
                </div>
                <div className={css.text}>
                    <p className={css.title}>Персональная бизнес-страница</p>
                    <p className={css.descr}>
                        Благодаря разделу «Магазины» вы можете создать собственную страницу на Bazar.kz и размещать там
                        все свои вакансии. Для этого
                        вам необходимо <span>выбрать один из абонементов*</span> и вы получите страницу с названием,
                        логотипом, описанием компании,
                        списком ваших вакансий, контактной информацией, а так же всеми другими услугами доступными в
                        этом абонементе.
                    </p>
                    <p className={css.condition}>
                        <span>*</span> Более подробно ознакомиться со всеми возможностями «Магазинов» можно на отдельной
                        промо-странице.
                    </p>
                </div>
            </div>
            <div className={cn(css.six,
                count === 3 ? css.animation : null,
            )}
            style={{
                display: `${count === 3 ? "flex" : "none"}`
            }}
            >
                <div className={css.icon}>
                    <Icon/>
                </div>
                <div className={css.text}>
                    <p className={css.title}>Персональная бизнес-страница</p>
                    <p className={css.descr}>
                        Благодаря разделу «Магазины» вы можете создать собственную страницу на Bazar.kz и размещать там
                        все свои вакансии. Для этого
                        вам необходимо <span>выбрать один из абонементов*</span> и вы получите страницу с названием,
                        логотипом, описанием компании,
                        списком ваших вакансий, контактной информацией, а так же всеми другими услугами доступными в
                        этом абонементе.
                    </p>
                    <p className={css.condition}>
                        <span>*</span> Более подробно ознакомиться со всеми возможностями «Магазинов» можно на отдельной
                        промо-странице.
                    </p>
                </div>
            </div>
            <div className={cn(css.six,
                count === 4 ? css.animation : null,
            )}
            style={{
                display: `${count === 4 ? "flex" : "none"}`
            }}
            >
                <div className={css.icon}>
                    <Icon/>
                </div>
                <div className={css.text}>
                    <p className={css.title}>Персональная бизнес-страница</p>
                    <p className={css.descr}>
                        Благодаря разделу «Магазины» вы можете создать собственную страницу на Bazar.kz и размещать там
                        все свои вакансии. Для этого
                        вам необходимо <span>выбрать один из абонементов*</span> и вы получите страницу с названием,
                        логотипом, описанием компании,
                        списком ваших вакансий, контактной информацией, а так же всеми другими услугами доступными в
                        этом абонементе.
                    </p>
                    <p className={css.condition}>
                        <span>*</span> Более подробно ознакомиться со всеми возможностями «Магазинов» можно на отдельной
                        промо-странице.
                    </p>
                </div>
            </div>
            <div className={cn(css.six,
                count === 5 ? css.animation : null,
            )}
            style={{
                display: `${count === 5 ? "flex" : "none"}`
            }}
            >
                <div className={css.icon}>
                    <Icon/>
                </div>
                <div className={css.text}>
                    <p className={css.title}>Персональная бизнес-страница</p>
                    <p className={css.descr}>
                        Благодаря разделу «Магазины» вы можете создать собственную страницу на Bazar.kz и размещать там
                        все свои вакансии. Для этого
                        вам необходимо <span>выбрать один из абонементов*</span> и вы получите страницу с названием,
                        логотипом, описанием компании,
                        списком ваших вакансий, контактной информацией, а так же всеми другими услугами доступными в
                        этом абонементе.
                    </p>
                    <p className={css.condition}>
                        <span>*</span> Более подробно ознакомиться со всеми возможностями «Магазинов» можно на отдельной
                        промо-странице.
                    </p>
                </div>
            </div>
            <div className={cn(css.six,
                count === 6 ? css.animation : null,
            )}
            style={{
                display: `${count === 6 ? "flex" : "none"}`
            }}
            >
                <div className={css.icon}>
                    <Icon/>
                </div>
                <div className={css.text}>
                    <p className={css.title}>Персональная бизнес-страница</p>
                    <p className={css.descr}>
                        Благодаря разделу «Магазины» вы можете создать собственную страницу на Bazar.kz и размещать там
                        все свои вакансии. Для этого
                        вам необходимо <span>выбрать один из абонементов*</span> и вы получите страницу с названием,
                        логотипом, описанием компании,
                        списком ваших вакансий, контактной информацией, а так же всеми другими услугами доступными в
                        этом абонементе.
                    </p>
                    <p className={css.condition}>
                        <span>*</span> Более подробно ознакомиться со всеми возможностями «Магазинов» можно на отдельной
                        промо-странице.
                    </p>
                </div>
            </div>
            <div className={cn(css.six,
                count === 7 ? css.animation : null,
            )}
            style={{
                display: `${count === 7 ? "flex" : "none"}`
            }}
            >
                <div className={css.icon}>
                    <Icon/>
                </div>
                <div className={css.text}>
                    <p className={css.title}>Персональная бизнес-страница</p>
                    <p className={css.descr}>
                        Благодаря разделу «Магазины» вы можете создать собственную страницу на Bazar.kz и размещать там
                        все свои вакансии. Для этого
                        вам необходимо <span>выбрать один из абонементов*</span> и вы получите страницу с названием,
                        логотипом, описанием компании,
                        списком ваших вакансий, контактной информацией, а так же всеми другими услугами доступными в
                        этом абонементе.
                    </p>
                    <p className={css.condition}>
                        <span>*</span> Более подробно ознакомиться со всеми возможностями «Магазинов» можно на отдельной
                        промо-странице.
                    </p>
                </div>
            </div>
        </FadeInSection>
    );
};
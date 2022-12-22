import {NavTabs} from "@/shared/ui/navTabs";
import css from "./styles.module.scss";


export const AdminTabs = () => {
    return (
        <div className={css.root}>
            <div className="container">
                <NavTabs links={tabLinks}/>
            </div>
        </div>
    );
};


// TODO: добавить иконки
const tabLinks = [
    {
        title: "Объявления",
        src: "/admin/adverts",
        icon: "https://cdn-icons-png.flaticon.com/512/6317/6317510.png"
    },
    {
        title: "Пользователи",
        src: "/admin/users",
        icon: "https://cdn-icons-png.flaticon.com/512/681/681443.png"
    },
    {
        title: "Обратная связь",
        src: "/admin/feedback",
        icon: "https://cdn-icons-png.flaticon.com/512/1972/1972461.png"
    }
];
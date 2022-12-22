import React from "react";
import {Link} from "react-router-dom";
import cn from "classnames";
import dayjs from "dayjs";

import {feedbackApi} from "@/shared/api";
import {Alerts} from "@/shared/ui/alerts";

import css from "./styles.module.scss";

import {ReactComponent as DeleteIcon} from "@/assets/icons/card/delete.svg";


const data = [
    {title: "№", dataset: "#", type: "number"},
    {title: "ФИО", dataset: "first_name"},
    {title: "Тема сообщения", dataset: "phone_number"},
    {title: "Электронная почта", dataset: "email"},
    {title: "Дата", dataset: "date"},
];

export const Complaint = () => {
    const {data: feedbacks} = feedbackApi.useGetFeedbacksQuery();
    const [deleteFeedback] = feedbackApi.useDeleteFeedbackByIdMutation();

    const removeFeedback = async (e: React.MouseEvent<HTMLDivElement>, id: number) => {
        e.preventDefault();
        const result = await Alerts.confirm();

        if (result.isConfirmed) {
            await Alerts.showSuccess("Успешно удалён");
            await deleteFeedback(id).then(() => {
            }).catch(err => console.log("err", err));
        }
    };

    return (
        <div className={css.complaint}>
            <div>
                {feedbacks?.length ? (
                    <div className={css.content}>
                        <div className={css.table}>
                            <div className={cn(css.data, css.head)}>
                                {
                                    data.map((el, idx) => <span
                                        className={css.subtitle}
                                        key={idx} data-name={el.dataset}>
                                        {el.title}
                                    </span>)
                                }
                            </div>
                            {
                                feedbacks?.map((comp, idx) => (
                                    <Link to={`/admin/complaint/${comp.id}`}>
                                        <div className={css.row} key={idx}>
                                            <div className={css.data}>
                                                <span>{idx + 1}</span>
                                                <span>{comp.name}</span>
                                                <span>{comp.feedback_title}</span>
                                                <span>{comp.email}</span>
                                                <span>{dayjs(comp.date)
                                                    .format("DD.MM.YYYY HH:MM")}</span>
                                            </div>
                                            <div className={css.control} onClick={e => removeFeedback(e, comp.id)}>
                                                <button className={css.settingBtn}>Delete</button>
                                                <button className={css.settingBtn}><DeleteIcon/></button>
                                            </div>
                                        </div>
                                    </Link>
                                ))
                            }
                        </div>
                    </div>
                ) : <h4 className={css.empty}>Нет жалоба</h4>}
            </div>
        </div>
    );
};
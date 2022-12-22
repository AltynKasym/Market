import {feedbackApi} from "@/shared/api/rtk-queries/feedbackApi";
import {useParams} from "react-router-dom";
import css from "./styles.module.scss";


export const FeedbackDetailPage = () => {
    const {feedId} = useParams();
    const {data: feedback} = feedbackApi.useGetFeedbackByIdQuery(feedId);

    return (
        <div className={css.root}>
            <div className="container">
                <h3 className={css.title}>{feedback?.feedback_title}</h3>
                <p className={css.text}>{feedback?.message}</p>
                <div className={css.infoBox}>
                    <p className={css.email}>{feedback?.email}</p>
                    <h2 className={css.fromUser}>{feedback?.name}</h2>
                </div>
            </div>
        </div>
    );
};
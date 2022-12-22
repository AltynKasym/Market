import {useState, useEffect} from "react";

import {BreadCrumbs} from "@/features/breadCrumbs";
import {Api} from "@/shared/api";

import {Validation} from "./validation/Validation";
import css from "./styles.module.scss";


export const ContactTheAdministration = () => {
    const [description, setDescription] = useState("");

    const feedbackMessage = async () => {
        await Api.Common.getFeedbackMessage().then(res => setDescription(res.data[0].text));
    };

    useEffect(() => {
        void feedbackMessage();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <div className={css.contactAdministraion}>
            <div className="container">
                <BreadCrumbs
                    location={[
                        {
                            folder: "contact-administration",
                            name: "Связаться с администрацией"
                        }
                    ]}
                />
                <h2 className={css.title}>Связаться с администрацией</h2>
                <div className={css.content}>
                    <p className={css.text}>{description}</p>
                    <Validation/>
                </div>
            </div>
        </div>
    );
};

import {BreadCrumbs} from "@/features/breadCrumbs";
import css from "./styles.module.scss";
import {useEffect, useState} from "react";
import {Api} from "@/shared/api";


export const PrivacyPolicy = () => {
    const [data, setData] = useState({
        title: "", 
        text: ""
    });

    const getPrivacyPolicyText = async () => {
        await Api.Common.getPrivacyPolicy().then(res => setData(res.data[0]));
    };

    useEffect(() => {
        getPrivacyPolicyText();
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <div className={css.privacyPolicy}>
            <div className="container">
                <BreadCrumbs
                    location={[{
                        folder: "/privacy-policy",
                        name: data.title
                    }]}
                />
                <h2 className={css.title}>{data.title}</h2>
                <p className={css.text}>{data?.text}</p>
            </div>
        </div>
    );
};

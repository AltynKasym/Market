import React, {useEffect, useState} from "react";
import r from "./Report.module.scss";
import close from "@/assets/icons/detail/close.svg";
import {reportData} from "@/pages/DetailPage/DetailDescription/DetailAbout/Report/models/reportData";
import {useParams} from "react-router-dom";
import axios from "axios";
import {Alerts} from "@/shared/ui/alerts";


interface reportDataType {
    name:string;
    rusName:string;
}
type Props = {
    setIsReportActive: (value: boolean) => void;
}

export const Report = ({setIsReportActive}: Props) => {
    const [activeItem, setActiveItem] = useState("");
    const [text, setText] = useState("");
    const [validationText, setValidationText] = useState("");
    const advertId = useParams().id;

    const closeForm = () => {
        setIsReportActive(false);
        setActiveItem("");
    };


    useEffect(() => {
        if (activeItem !== "") return setValidationText("");
    }, [activeItem]);

    const sendReport = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault();
        const obj = {
            report: "",
            advert: advertId,
            report_message: ""
        };

        if (activeItem === "other") obj["report_message"] = text;
        else if (activeItem === ""){
            setValidationText("Чтобы отправить выберите один из вариантов");
            return;
        } else obj["report"] = activeItem;

        axios.post("http://188.225.83.42/api/v1/advert_report/", obj)
            .then(el => {
                Alerts.showSuccess("Успешно отправлено");
                closeForm();
            })
            .catch(el => {
                Alerts.showError("Возможны технические неполадки попробуйте позже");
                closeForm();
            });
    };

    return (
        <div className={r.reportWindow}>
            <div className={r.title}>
                <p>Уажите причины, по которым вы считаете это обьявление неккоректным</p>
                <div className={r.close} onClick={() => setIsReportActive(false)}>
                    <img src={close} alt="close" />
                </div>
            </div>
            <form action="">
                {reportData.map((el:reportDataType, index:number) => {
                    return   <div className={r.item} key={index} >
                        <input className={r.check}
                            onChange={() => setActiveItem(el.name)}
                            checked={activeItem === el.name}
                            type="radio" id={el.name} name={"report"} />
                        <label htmlFor={el.name}>{el.rusName}</label>
                    </div>;
                })}
                <div className={r.item}>
                    <input className={r.check} checked={activeItem === "other"}
                        name={"report"} type="radio" id="other"
                        onChange={() => {setActiveItem("other");}}/>
                    <label htmlFor="other" >Другое</label>
                </div>
                {activeItem === "other" &&
                    <div className={r.item}>
                        <textarea className={r.area}
                            rows={3} autoCapitalize='off'
                            placeholder="Опишите причину"
                            onChange={(e) => {setText(e.target.value);}} />
                    </div>}
                <button className={r.submit} onClick={sendReport}>Отправить жалобу</button>
                <p className={r.errorText}>{validationText}</p>
            </form>
        </div>
    );
};


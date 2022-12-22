import c from "./style.module.scss";
import download from "@/assets/icons/detail/download.png";
import React from "react";


interface user {
    user_id:number;
    first_name:string;
    last_name:string;
}

interface MessagesType {
    "id": number;
    "from_user": number;
    "message": string;
    "date": string;
    "room": number;
    "file"?: File;
}
interface Props {
    user: user | null;
    message:MessagesType;
}

export const Message = ({user, message}: Props) => {

    return <div className={`${c.mess} ${message.from_user == user?.user_id ? c.myMess : c.otherMess}`}>
        {message?.file &&
            <div className={c.imgBlock}>
                {/*    TODO сделать env*/}
                <img src={`http://188.225.83.42${message.file}`} alt="er"/>
                <a href={message.file} download={""}>
                    <div className={c.download}>
                        <img src={download} alt="eror"/>
                    </div>
                </a>
            </div>}
        <p>{message.message}</p>
    </div>;
};
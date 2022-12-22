import c from "./style.module.scss";
import {addFile} from "@/features/messages/Chat/model/validation";
import React, {useState} from "react";


interface Props {
    addMessage:any;
    setMessage: (value: string) => void;
    message: string;
    setImgFile: (value: File) => void;
    imgFile?:Nullable<File>;
}

export const SendMessage = ({addMessage, imgFile, setMessage, message, setImgFile}: Props) => {
    const [isValid, setIsValid] = useState(false);

    // console.log('mess', message);
    

    const sendFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (files?.length) setImgFile(files[0]);
        addFile(files, setIsValid);
    };
    return (
        <div className={c.sendBlock}>
            <form action="" onSubmit={addMessage}>
                <div className={c.text}>
                    <textarea
                        placeholder={"Ведите сообщение"}
                        onChange={(e) => {
                            setMessage(e.target.value);
                        }}
                        value={message}
                    />
                </div>
                <div className={c.send}>
                    <button type={"submit"}>ОТПРАВИТЬ СООБЩЕНИЕ</button>
                    <div className={c.fileBlock}>
                        <input type="file" id={"file"} className={c.sendFile} accept="image/jpeg, image/png, image/jpg"
                            onChange={sendFile}/>
                        <label htmlFor="file" className={c.fileLabel}>
                            {imgFile  ? "файл прикреплен" : "Прикрепить файл (до 5мб)"  }
                        </label>
                        {isValid !== false ? <p className={c.error}>*файл не должен превышать 5мб</p> : null}
                    </div>
                </div>
            </form>
        </div>
    );
};
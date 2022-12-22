import c from "./Chat.module.scss";
import React, {useEffect, useRef, useState} from "react";
import {useLocation} from "react-router-dom";
import Pusher from "pusher-js";

import {Api} from "@/shared/api";
import {userModel} from "@/entities/user";
import {ChatHead} from "@/features/messages/Chat/ChatHead/ChatHead";
import {SendMessage} from "@/features/messages/Chat/SendMessage/SendMessage";
import {Message} from "@/features/messages/Chat/Message/Message";


interface messagesType {
    "id": number;
    "from_user": number;
    "message": string;
    "date": string;
    "room": number;
    "file"?: File;
}

interface headDataType {
    advert_id:number;
    advert:string;
    name:string;
    advert_price:number;
}

interface locStateType {
    owner:number;
    id:number;
}

export const Chat = () => {
    const {user} = userModel.useAuth();
    const loc = useLocation().state as locStateType;
    const [messages, setMessages] = useState<messagesType[]>([]);
    const [message, setMessage] = useState("");
    const [imgFile, setImgFile] = useState<Nullable<File>>();
    const [headData, setHeadData] = useState<headDataType>();


    const addMessage = async (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault();

        if (message.trim()) {

            const form = new FormData();
            form.append("message", message);
            form.append("room", String(loc.id));
            form.append("from_user", String(user?.user_id));
            form.append("to_user", String(loc.owner));
            imgFile && form.append("file", imgFile);
            setMessage("");

            await Api.Chat.sendMessage(form, user?.access);
            
            setImgFile(null);
        }

    };

    /*CONNECT TO CHANNEL*/
    useEffect(() => {
        Pusher.logToConsole = true;

        const pusher = new Pusher("fac24ed4d8f178c400a0", {
            cluster: "ap2"
        });

        const channel = pusher.subscribe(`${loc.id}`);
        channel.bind("message_create", (data:messagesType) => {
            setMessages((el) => el = [...el, data]);
        });
    }, []);

    /*GET OFFLINE MESSAGES*/
    useEffect( () => {
        Api.Chat.getChatRoom(`${loc.id}`)
            .then(elem => {
                const userData = {
                    advert: elem.data.advert,
                    advert_price: elem.data.advert_price,
                    advert_id: elem.data.advert_id,
                    name: elem.data.from_user.id === user?.user_id ? elem.data.to_user.first_name :elem.data.from_user.first_name
                };
                setMessages((el) => el = el.concat(elem.data.messages));
                setHeadData(userData);
            });
    }, []);

    /*скролл*/
    const refMessages = useRef<HTMLDivElement>(null);

    useEffect(() => {
        /* eslint-disable @typescript-eslint/no-explicit-any */
        if (refMessages) {
            refMessages.current?.addEventListener("DOMNodeInserted", (event: any) => {
                const {currentTarget: target} = event;
                target?.scroll({top: target.scrollHeight, behavior: "smooth"});
            });
        }
        /* eslint-enable @typescript-eslint/no-explicit-any */
    }, []);

    return (
        <div className={c.root}>
            <ChatHead headerData={headData}/>
            <div className={c.messageBlock} ref={refMessages}>
                {messages.length >= 1 && messages.map((el:messagesType, index:number) => {
                    return  <Message message={el} user={user} key={index} />;
                })}
            </div>
            <SendMessage addMessage={addMessage} setMessage={setMessage} imgFile={imgFile} setImgFile={setImgFile} message={message}/>
        </div>
    );
};

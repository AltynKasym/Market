import l from "./ChatList.module.scss";
import {ChatUserItem} from "./ChatUserItem/ChatUserItem";
import {useEffect, useState} from "react";
import {Api} from "@/shared/api";


interface UserDataType {
    id:number;
    first_name:string;
}
interface ChatListType {
    id:number;
    owner:UserDataType;
    user: UserDataType;
    advert:string;
    message:string;
    date:string;
    advert_id:string;
}
export const ChatList = () => {
    const [list, setList] = useState<ChatListType[]>();
    useEffect(() => {
        Api.Chat.getChatList()
            .then(el => {setList(el.data);});
    }, []);
    return (
        <div className={l.root}>
            {list && list.map((el, index:number) => {
                return <ChatUserItem obj={el} key={index} />;
            })}
        </div>
    );
};


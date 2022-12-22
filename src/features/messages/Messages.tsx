import m from "./Messages.module.scss";
import cn from "classnames";
import {Chat} from "@/features/messages/Chat/Chat";
import {Route, Routes} from "react-router-dom";
import {ChatList} from "@/features/messages/ChatList/ChatList";


export const Messages = () => {
    return (
        <div className={cn(m.root, "container")}>
            <Routes>
                <Route path="/" element={<ChatList/>}/>
                <Route path="/detailChat" element={<Chat/>}/>
            </Routes>
        </div>
    );
};

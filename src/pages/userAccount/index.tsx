import {Route, Routes} from "react-router-dom";

import {UserAccountTabs} from "./userAccountTabs";

import {MyAdverts} from "./myAdverts";
import {Favorites} from "./favorites";
import {TransactionHistory} from "./TransactionHistory/TransactionHistory";
import {SettingUser} from "./Settings/SettingUser";
import {Messages} from "@/features/messages/Messages";

import css from "./styles.module.scss";


export const UserAccount = () => {
    return (
        <div className={css.userAccount}>
            <UserAccountTabs/>
            <div className="container">
                <Routes>
                    <Route path="/" element={<MyAdverts/>}/>
                    <Route path="/transaction" element={<TransactionHistory/>}/>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/announcements/*" element={<Messages />} />
                    <Route path="/settings" element={<SettingUser/>}/>
                </Routes>
            </div>
        </div>
    );
};
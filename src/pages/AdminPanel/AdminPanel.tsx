import React from "react";
import css from "./admin.module.scss";
import {Adverts} from "./Adverts/Adverts";
import {Users} from "./Users/Users";
import {AdminTabs} from "./AdminTabs/AdminTabs";
import {Route, Routes} from "react-router-dom";
import {Complaint} from "./Feedback/Feedback";


export const AdminPanel = () => {  
    return (
        <div className={css.root}>
            <AdminTabs/>
            <div className="container">
                <Routes>
                    <Route path="/adverts" element={<Adverts/>}/>
                    <Route path="/users" element={<Users/>}/>
                    <Route path="/feedback" element={<Complaint/>}/>
                </Routes> 
            </div>
        </div>
    );
};
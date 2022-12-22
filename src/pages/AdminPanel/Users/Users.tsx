import cn from "classnames";
import {Link} from "react-router-dom";

import {UsersProps} from "@/shared/api/types";
import {userApi} from "@/shared/api/rtk-queries/userApi";
import {Alerts} from "@/shared/ui/alerts";

import css from "./styles.module.scss";
import React, {useEffect, useState} from "react";
import {toLower} from "lodash";

import {ReactComponent as DeleteIcon} from "@/assets/icons/card/delete.svg";
import {ReactComponent as EditIcon} from "@/assets/icons/card/edit.svg";


const data = [
    {title: "№", dataset: "#", type: "number"},
    {title: "ФИО", dataset: "first_name"},
    {title: "Телефон номер", dataset: "phone_number"},
    {title: "Электронная почта", dataset: "email"},
];

export const Users = () => {
    const [sortedData, setSortedData] = useState([]);
    const [reverse, setReverse] = useState(false);
    const {data: allUsers} = userApi.useGetUsersQuery();
    const [deleteUser] = userApi.useDeleteUserByIdMutation();

    useEffect(() => {
        setSortedData(allUsers?.filter((el: { id: number }) => el.id !== 1));
    }, [allUsers]);

    const dynamicSort = (property: string) => {
        const sortOrder = 1;
        return function (a: { [x: string]: number }, b: { [x: string]: number }) {
            if (property === "first_name" || property === "email" ) {
                const result = (toLower(a[property]) < toLower(b[property]) ) ? -1 : (toLower(a[property])  > toLower(b[property]) ) ? 1 : 0;
                return result * sortOrder;
            } 
            const result = (a[property] <b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        };
    };
    const sortData = (e: React.SyntheticEvent<EventTarget>) => {
        if (!(e.target instanceof HTMLSpanElement)) {
            return;
        }
        const element = e.target.id;
        setReverse(!reverse);
        reverse ? setSortedData([...sortedData].sort(dynamicSort(element))) : setSortedData([...sortedData].sort(dynamicSort(element)).reverse());
    };

    const deleteUserFunc = async (id: number) => {
        const result = await Alerts.confirm();
        
        if (result.isConfirmed) 
        {Alerts.showSuccess("Успешно удалён"); 
            await deleteUser(id).then(() => {
            }).catch(err => console.log("err", err));
        }
    };
    
    return (
        <div>
            {sortedData?.length ? (
                <div className={css.content}>
                    <div id={css.table}>
                        <div className={cn(css.data, css.head)}>
                            {
                                data.map((el, idx) => <span 
                                    className={css.subtitle} 
                                    key={idx} data-name={el.dataset} 
                                    id={el.dataset}
                                    onClick={sortData}>
                                    {el.title}
                                </span>)
                            }
                        </div>
                        {
                            sortedData?.map((user: UsersProps, idx: number) => (
                                <div className={css.row} key={idx}>
                                    <div className={css.data}>
                                        <span>{idx +1}</span>
                                        <span>{`${user.first_name} ${user.last_name}`}</span>
                                        <span>{user.phone_number}</span>
                                        <span>{user.email}</span>
                                    </div>
                                    {/* <div className={css.control}>
                                        <Link to={`/user/${user.id}`}>
                                            <button className={css.settingBtn}>Edit</button>
                                        </Link>
                                        <button className={css.settingBtn} onClick={() => deleteUserFunc(user.id)}>Delete</button>
                                    </div> */}

                                    <div className={css.control}>
                                        <Link to={`/user/${user.id}`}>
                                            <div className={css.buttons}>
                                                <button>Edit</button>
                                                <button><EditIcon/></button>
                                            </div>

                                        </Link>
                                        <div className={css.buttons} onClick={() => deleteUserFunc(user.id)}>
                                            <button >Delete</button>
                                            <button ><DeleteIcon/></button>
                                        </div>
                                    
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ):<h4 className={css.empty}>Нет пользователя</h4>}
        </div>
    );
};
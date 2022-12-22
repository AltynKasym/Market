import cui from  "./style.module.scss";
import avatar from "@/assets/icons/chat/image 10.svg";
import {useNavigate} from "react-router-dom";
import {userModel} from "@/entities/user";
import {useEffect, useState} from "react";


interface partnerType {
    id:number;
    first_name:string;
}


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

interface Props {
    obj:ChatListType;
}

export const ChatUserItem = ({obj}:Props) => {
    const navigate = useNavigate();
    const {user} = userModel.useAuth();
    const [partner, setPartner] = useState<partnerType>();

    useEffect(() => {
        const partnerData = user?.first_name === obj.owner.first_name ? obj.user : obj.owner;
        setPartner(partnerData);
    }, []);

    const redirect = () => {
        navigate("detailChat", {state: {owner: partner?.id, id: obj.id}});
    };

    return (
        <div className={cui.root} onClick={redirect}>
            <div className={cui.left}>
                <div className={cui.logo}>
                    <div className={cui.numberOfMessages}>1</div>
                    <img src={avatar} alt="ava" className={cui.img}/>
                </div>
                <div className={cui.description}>
                    <div className={cui.name}>{partner?.first_name}</div>
                    <div className={cui.productName}>{obj.advert}</div>
                    <div className={cui.lastMessage}>{obj.message && obj.message}</div>
                </div>
            </div>
            <div className={cui.time}>
                {obj.date && `${obj.date.slice(0, 10)} в ${obj.date.slice(11, 16)}` }
            </div>
        </div>
    );
};



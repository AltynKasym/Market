import c from "./DetailContact.module.scss";
import tele from "@/assets/icons/detail/telegram.svg";
import whatsapp from "@/assets/icons/detail/whatsapp.svg";
import userImg from "@/assets/icons/detail/avatar.svg";
import {useState} from "react";
import {userModel} from "@/entities/user";
import {Api} from "@/shared/api";
import {useNavigate} from "react-router-dom";



interface phoneNumber {
    phone_number: string;
}
interface owner {
    id: number;
    first_name:string;
}
interface contactsType {
    price: number;
    advert_contact: phoneNumber[];
    wa_number: string;
    owner:owner;
    id:number;
}


export const DetailContact = ({price, owner, id, advert_contact, wa_number}: contactsType) => {
    const [isStels, setIsStels] = useState(false);
    // const [isFavorite, setIsFavorite] = useState(false);
    // const [toggleFavorite] = advertApi.useSetFavoriteMutation();
    const {user} = userModel.useAuth();
    const navigate = useNavigate();

    // useEffect(() => {
    //     setIsStels(false);
    //     Api.Advert.getFavoriteIds()
    //         .then(el => {
    //             const advertIsFavorite = el.data.adverts.find((el:number) => el === id);
    //             setIsFavorite(advertIsFavorite ? true : false);
    //         });
    // }, [id]);


    const hideNumber = (num: string) => {
        return num.slice(0, -6) + "xxxxxx";
    };

    const sendUser = async () => {
        if (user !== null) {
            const obj = {
                "owner": user?.user_id,
                "user": owner.id,
                "advert": id
            };

            await  Api.Chat.createChatRoom(obj)
                .then(el => {
                    navigate("/user-account/announcements/detailChat", {state: {owner: el.data.user.id, id: el.data.id}});
                });
        } else {
            navigate("/auth/login");
        }
    };

    const showContacts = () => {
        Api.Statistics.showContacts(id);
        setIsStels(true);
    };


    // const favoriteToggle = async () => {
    //     if (!user)
    //         return navigate("/auth/login"); // TODO: редирект
    //     try {
    //         setIsFavorite(!isFavorite);
    //         await toggleFavorite({advertId: id, isFavorite: !isFavorite})
    //             .unwrap();
    //     } catch {
    //         ApiUtil.dropAuthAndRedirect();
    //     }
    // };

    return (
        <div className={c.root}>
            {/*<div className={c.favorite} onClick={favoriteToggle}>*/}
            {/*    <img src={isFavorite ? favorite : inFavorite} alt="favorite" className={c.favoriteImg}/>*/}
            {/*    <p className={c.favoriteText}>Добавить в избранное</p>*/}
            {/*</div>*/}
            <div className={c.price}>{price} ₸</div>
            <div className={c.saler}>
                <div className={c.img}>
                    <img src={userImg} alt="user"/>
                </div>
                <div className={c.name}>Константинопольский Александр</div>
            </div>
            <div className={c.contact}>
                <div className={c.contactTitle}>
                    <div>Контакты продавца</div>
                    <div className={isStels ? c.showBtnTrue : c.showBtn} onClick={showContacts}>
                        показать контакты
                    </div>
                </div>
                <div className={c.list}>
                    {advert_contact.length >= 1 &&
                        <div className={c.item}>
                            <div className={c.itemTitle}>Телефон:</div>
                            <div className={c.numbers}>
                                {
                                    advert_contact.slice(0, isStels ? advert_contact.length : 1).map((el, i) =>
                                        <div
                                            key={i}
                                            className={c.number}
                                        >
                                            {isStels && el.phone_number ? el.phone_number : hideNumber(el.phone_number)}
                                        </div>
                                    )
                                }
                            </div>
                        </div>
                    }
                    <div className={c.item}>
                        <div className={c.itemTitle}>WhatsApp</div>
                        <div className={c.numbers}>
                            <div className={c.number}>{isStels ? wa_number : hideNumber(wa_number)}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={c.buttons}>
                <button className={c.telegram} onClick={sendUser}>
                    <img src={tele} alt="err"/>
                    <p>НАПИСАТЬ ПРОДАВЦУ</p>
                </button>
                <button className={c.whats}>
                    <img src={whatsapp} alt="err"/>
                    <a href={`https://wa.me/${wa_number}`} target={"_blank"}>НАПИСАТЬ НА WHATSAPP</a>
                </button>
            </div>
        </div>
    );
};

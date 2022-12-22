import c from "./style.module.scss";
import avatar from "@/assets/icons/chat/image 10.svg";


interface headDataType {
    advert_id:number;
    advert:string;
    name:string;
    advert_price:number;
}
interface Props {
    headerData:headDataType | undefined;
}
export const ChatHead = ({headerData}: Props) => {
    // console.log(headerData);
    return (
        <div className={c.head}>
            <div className={c.description}>
                <div className={c.logo}>
                    <img src={avatar} alt="ava" className={c.logoImg}/>
                </div>
                <div className={c.name}>{headerData?.name}</div>
            </div>
            <div className={c.link}>
                <div className={c.allMessage}>{headerData?.advert}</div>
                <div className={c.allAdvert}>{headerData?.advert_price}</div>
            </div>
        </div>
    );
};
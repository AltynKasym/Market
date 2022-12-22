import b from "./style.module.scss";


type data = {
    img:string;
    subtitle:string;
    text:string;
    price:number;
}
type Props = {
    data:data;
}

export const BoostItem = ({data}: Props) => {
    return (
        <div className={b.item}>
            <div className={b.img}>
                <img src={data.img} alt="err" />
            </div>
            <div className={b.about}>
                <div className={b.subtitle}>
                    {data.subtitle} <span>{data.price} ₸</span>
                </div>
                <div className={b.text}>{data.text}</div>
            </div>
        </div>
    );
};


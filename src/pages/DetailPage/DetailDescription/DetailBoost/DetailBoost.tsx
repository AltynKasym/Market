import {BoostItem} from "./component/BoostItem";
import b from "./DetailBoost.module.scss";
import {boostData} from "@/pages/DetailPage/DetailDescription/DetailBoost/assets/boostData";


export const DetailBoost = () => {
    return (
        <div className={b.root}>
            <div className={b.title}>Ускорить продажу</div>
            <div className={b.list}>
                {boostData.map((el, index) =>  {
                    return <BoostItem data={el} key={index} />;
                })}
            </div>
        </div>
    );
};


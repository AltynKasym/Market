import classNames from "classnames";
import css from "./style.module.scss";
import {useRef} from "react";
import {useOutsideAlerter} from "@/shared/hooks";
import {DTO} from "@/shared/api";


interface Props {
    citys: DTO.City[];
    selectCity: Optional<number>;
    onSelectCity: (city: DTO.City) => void;
    onClose: () => void;
}


export const SelectLocation = ({citys, selectCity, onSelectCity, onClose}: Props) => {
    const ref = useRef<HTMLDivElement>(null);
    useOutsideAlerter(ref, () => onClose());

    return (
        <div className={css.selectLocation} ref={ref}>
            <div className={classNames("container", css.container)}>
                <div className={css.location}>
                    <p className={css.title}>
                        Искать объявления по:
                        {citys.filter(x => x.id === selectCity)
                            .map((item, index) => (
                                <span>{item.name ? item.name : "По всей стране"}</span>
                            ))}
                    </p>
                    <div className={css.text}>
                        {citys.map((item, index) => (
                            <p
                                key={index}
                                onClick={(e) => {
                                    onClose();
                                    onSelectCity(item);
                                }}
                            >
                                {item.name}
                            </p>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

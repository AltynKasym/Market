import {ReactComponent as Arrow} from "@/assets/icons/arrow/arrow-right.svg";
import close from "@/assets/icons/close.svg";

import css from "./styles.module.scss";
import {Link} from "react-router-dom";
import {useOutsideAlerter} from "@/shared/hooks";
import {useMemo, useRef} from "react";
import {DTO} from "@/shared/api";


interface Props {
    categories: DTO.Category[];
    selectedCategory: Optional<DTO.Category>;
    onSelectCategory: (category: DTO.Category) => void;
    onClose: () => void;
}


export const SelectCategory = ({categories, onClose, selectedCategory, onSelectCategory}: Props) => {
    console.log(selectedCategory);
    const ref = useRef<HTMLDivElement>(null);
    useOutsideAlerter(ref, () => onClose());

    const advertsCount = useMemo(() => {
        return categories.reduce((acc, category) =>
            acc + category.advert_count, 0
        );
    }, [categories]);

    return (
        <div className={css.selectCategories} ref={ref}>
            <div className={css.text}>
                <div className={css.titleBlock}>
                    <p className={css.title}>Выберите категорию</p>
                    <Link to="/category/1" className={css.descr} onClick={() => onClose()}>
                        смотреть все объявления <Arrow className={css.arrow}/>
                    </Link>
                </div>
                <p className={css.number}>{advertsCount} объявления</p>
                <img src={close} alt="close" onClick={() => onClose()}/>
            </div>
            <div className={css.categories}>
                {categories && categories.map((item, index) => (
                    <div
                        className={css.item}
                        key={index}
                        onClick={(e) => {
                            onClose();
                            onSelectCategory(item);
                        }}
                    >
                        <img src={item.icon} alt="icon"/>
                        <p>{item.name}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

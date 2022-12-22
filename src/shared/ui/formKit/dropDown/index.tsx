import React, {useState, useEffect, useRef} from "react";
import cn from "classnames";

import {useOutsideAlerter} from "@/shared/hooks/ui-hooks";
import css from "./styles.module.scss";

import arrowIcon from "@/assets/icons/arrow/arrow-down.svg";


interface Props<T extends JSX.IntrinsicAttributes> {
    items: T[];
    initialValue?: T;
    onSelectedItem: (item: Optional<T>) => void;
    ItemComponent: React.ComponentType<T>;
    id?: string;
    options?: {
        className?: string;
        triggerClassName?: string;
        listClassName?: string;
    };
}


export const DropDown = <T extends object | JSX.IntrinsicAttributes>(props: Props<T>) => {
    const {items, onSelectedItem, ItemComponent, id, options} = props;

    const [isShowList, setIsShowList] = useState(false);
    const [selectedItem, setSelectedItem] = useState<Optional<T>>();
    useEffect(() => {
        setSelectedItem(props.initialValue );
    }, [props.initialValue]);

    useEffect(() => {
        setSelectedItem(items && items[0]);
    }, [items]);

    useEffect(() => {
        onSelectedItem(selectedItem);
    }, [selectedItem]);


    const preventRef = useRef(false);
    const dropListRef = useRef<HTMLUListElement>(null);
    useOutsideAlerter(dropListRef, () => {
        preventRef.current = true;
        setIsShowList(false);
    });


    return (
        <div className={cn(css.selectCategories, options?.className)} id={id}>
            <button
                className={cn(css.trigger, options?.triggerClassName)}
                onClick={() => {
                    if (!preventRef.current)
                        setIsShowList(prev => !prev);
                    preventRef.current = false;
                }}
                type="button"
            >
                {selectedItem && <ItemComponent {...selectedItem}/>}
                <img
                    src={arrowIcon}
                    alt="arrow"
                    style={{
                        transform: isShowList ? "rotate(0deg)" : "rotate(180deg)",
                        transition: "0.2s"
                    }}
                />
            </button>
            {
                isShowList && (
                    <ul ref={dropListRef} className={cn(css.list, options?.listClassName)}>
                        {
                            items.map((item, i) => (
                                <li
                                    key={i}
                                    className={css.itemWrap}
                                    onClick={() => {
                                        setSelectedItem(item);
                                        setIsShowList(false);
                                    }}
                                >
                                    {item && <ItemComponent {...item}/>}
                                </li>
                            ))
                        }
                    </ul>
                )
            }
        </div>
    );
};
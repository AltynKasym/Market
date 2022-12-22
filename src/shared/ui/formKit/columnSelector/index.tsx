import {useState, useEffect, useRef, Fragment} from "react";
import cn from "classnames";

import {useOutsideAlerter} from "@/shared/hooks/ui-hooks";

import {CheckBox} from "./checkBox";
import {Trigger} from "./trigger";
import css from "./styles.module.scss";

import {ReactComponent as XMarkIcon} from "@/assets/x-mark.svg";


interface Props {
    initialColumns: Column[];
    onClose: (selectedColumns: Column[]) => void;
}

interface Column {
    title: string;
    checked: boolean;
    value: string;
}


export const ColumnSelector = ({initialColumns, onClose}: Props) => {
    const [columns, setColumns] = useState<Column[]>(initialColumns);
    const [isShowDropDown, setIsShowDropDown] = useState(false);
    const [selectedCount, setSelectedCount] = useState(0);


    // TODO: хз для чего
    useEffect(() => {
        setColumns(initialColumns);
    }, [initialColumns]);

    const resetAllChecked = () => {
        setColumns(prev => prev.map(x => ({...x, checked: false})));
    };

    const onColumnCheckChange = (columnValue: string, checked: boolean) => {
        setColumns(prev => updateColumn(prev, columnValue, checked));
    };

    useEffect(() => {
        setSelectedCount(columns.filter(x => x.checked).length);
    }, [columns]);

    const preventRef = useRef(false);
    const ref = useRef<HTMLDivElement>(null);
    useOutsideAlerter(ref, () => {
        preventRef.current = true;
        setIsShowDropDown(false);
    });

    useEffect(() => {
        if (!isShowDropDown)
            onClose(columns.filter(x => x.checked));
    }, [isShowDropDown]);


    return (
        <Fragment>
            <Trigger
                isActive={isShowDropDown}
                onClick={() => {
                    if (!preventRef.current)
                        setIsShowDropDown(prev => !prev);
                    preventRef.current = false;
                }}
            />
            {
                isShowDropDown && (
                    <div className={css.dropDown} ref={ref}>
                        <div className={css.columnAppliedCount}>
                            <span className={css.title}>Columns applied:</span>
                            <span className={css.value} onClick={resetAllChecked}>
                                {selectedCount}
                                <XMarkIcon width={11} height={11} stroke="white"/>
                            </span>
                        </div>
                        <div>
                            <p className={css.columnListLabel}>
                                Columns:
                            </p>
                            <ul className={css.columnList}>
                                {
                                    columns?.map((col, i) => (
                                        <li
                                            key={col.value}
                                            className={cn(css.columnItem, col.checked && css.selectedColumnItem)}
                                        >
                                            <span>{col.title}</span>

                                            <CheckBox
                                                checked={col.checked}
                                                onChange={checked => onColumnCheckChange(col.value, checked)}
                                            />
                                        </li>
                                    ))
                                }
                            </ul>
                        </div>
                    </div>
                )
            }
        </Fragment>
    );
};


const updateColumn = (prev: Column[], columnValue: string, checked: boolean) => {
    const cols = prev.map(col => {
        if (col.value === columnValue)
            return {...col, checked};
        return col;
    });

    cols.sort(columnComparator);
    return cols;
};


const columnComparator = (a: Column, b: Column) => {
    if (a.checked === b.checked)
        return 0;
    if (!a.checked)
        return 1;
    return -1;
};
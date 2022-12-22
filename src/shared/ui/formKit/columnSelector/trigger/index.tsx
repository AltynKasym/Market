import css from "./styles.module.scss";

import {ReactComponent as PlusIcon} from "@/assets/plus.svg";
import {ReactComponent as ArrowUpIcon} from "@/assets/arrow-up.svg";


interface Props {
    isActive: boolean;
    onClick: () => void;
}


export const Trigger = ({isActive, onClick}: Props) => {
    return (
        <div className={css.trigger} onClick={onClick}>
            <PlusIcon width={11} height={20} stroke="#EADDCB"/>
            <span className={css.title}>Show other columns</span>
            <ArrowUpIcon
                width={14}
                height={7}
                fill="#EADDCB"
                style={{
                    transform: isActive ? "rotate(0deg)" : "rotate(180deg)",
                    transition: "0.2s"
                }}
            />
        </div>
    );
};
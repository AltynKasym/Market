import cn from "classnames";
import css from "./styles.module.scss";

import {ReactComponent as CheckMarkIcon} from "@/assets/check-mark.svg";


interface Props {
    checked: boolean;
    onChange: (checked: boolean) => void;
}


export const CheckBox = ({checked, onChange}: Props) => {
    return (
        <div
            className={cn(css.checkBox, checked && css.checked)}
            onClick={() => onChange(!checked)}
        >
            {checked && <CheckMarkIcon width={11.71} height={8.52}/>}
        </div>
    );
};
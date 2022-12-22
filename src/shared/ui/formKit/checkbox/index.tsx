import React, {useState, useRef, forwardRef, Fragment} from "react";
import * as CheckboxPrimitive from "@radix-ui/react-checkbox";
import {CheckIcon} from "@radix-ui/react-icons";
import cn from "classnames";

import css from "./styles.module.scss";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string | boolean;
}


export const Checkbox = forwardRef<React.Ref<HTMLInputElement>, Props>((props, ref) => {
    const [checked, setChecked] = useState(!!props.value);
    const inputRef = useRef<HTMLInputElement>(null);

    return (
        <Fragment>
            <div className={cn(css.root, props.className)}>
                <div className={css.wrap}>
                    <CheckboxPrimitive.Root
                        className={css.checkBox}
                        checked={checked}
                        onCheckedChange={(e: boolean) => {
                            setChecked(e);
                            inputRef.current?.click();
                        }}
                    >
                        <CheckboxPrimitive.Indicator className={css.indicator}>
                            <CheckIcon color="white" width={20} height={20}/>
                        </CheckboxPrimitive.Indicator>
                    </CheckboxPrimitive.Root>
                </div>
                {props.children}
            </div>
            <div className={css.errorLabel}>
                {props.error}
            </div>

            {/* скрытый инпут только для того чтобы хендлить значение формы */}
            <input
                ref={inputRef}
                style={{display: "none"}}
                type="checkbox"
                name={props.name}
                checked={checked}
                onBlur={props.onBlur}
                onChange={(e) => {
                    setChecked(e.target.checked);
                    props.onChange?.(e);
                }}
            />
        </Fragment>
    );
});

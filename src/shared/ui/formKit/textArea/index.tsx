import React, {forwardRef, useState} from "react";
import cn from "classnames";
import css from "./styles.module.scss";


interface Props extends React.InputHTMLAttributes<HTMLTextAreaElement> {
    error?: string | boolean;
    options?: {
        maxLength?: number;
        showCharCounter?: boolean;
    };
}


export const TextArea = forwardRef((props: Props, ref: React.Ref<HTMLTextAreaElement>) => {
    const {options, error, className, id, ...restProps} = props;
    const [restCharQty, setRestCharQty] = useState(options?.maxLength);
    const isError = Boolean(error);


    return (
        <div className={css.root}>
            <textarea
                className={cn(css.textarea, isError && css.errorBorder, className)}
                maxLength={options?.maxLength}
                id={id}
                ref={ref}
                placeholder={props.placeholder}
                onChange={(e) => {
                    restProps.onChange?.(e);
                    if (options?.maxLength)
                        setRestCharQty(options?.maxLength - e.target.value.length);
                }}
                {...restProps}
            >
            </textarea>
            {
                (isError) && (
                    <p className={css.errorLabel}>
                        {error}
                    </p>
                )
            }
            {
                (!isError && options?.showCharCounter) && (
                    <p className={css.countLabel}>
                        {restCharQty} знаков осталось
                    </p>
                )
            }
        </div>
    );
});
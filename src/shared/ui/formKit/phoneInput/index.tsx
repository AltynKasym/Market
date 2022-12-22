import React from "react";
import cn from "classnames";
import css from "./styles.module.scss";
import {Input} from "@/shared/ui/formKit/input";
import {ReactComponent as WhatsAppIcon} from "@/assets/icons/whatsapp.svg";
import {ReactComponent as PhoneIcon} from "@/assets/icons/phone.svg";


interface Props extends React.InputHTMLAttributes<HTMLInputElement> {
    error?: string;
    className?: string;
    type?: "phone" | "whatsapp";
}


export const PhoneInput = (props: Props) => {
    const {error, className, type, ...restProps} = props;

    let IconComponent;
    if (type === "whatsapp")
        IconComponent = WhatsAppIcon;
    else
        IconComponent = PhoneIcon;


    return (
        <div className={css.root}>
            <Input
                mask={/^\+[\-()\d ]*$/}
                id="phone"
                type="tel"
                className={cn(css.input, className)}
                {...restProps}
                error={error}
            />
            <div className={css.iconWrap}>
                <IconComponent className={css.icon} width={24} height={24}/>
            </div>
        </div>
    );
};
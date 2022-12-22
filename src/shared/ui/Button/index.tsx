import React, {ReactNode} from "react";
import {Link} from "react-router-dom";
import cn from "classnames";

import {ConditionalWrap} from "@/shared/ui/ConditionalWrap";
import css from "./styles.module.scss";


interface Props {
    className?: string | undefined;
    children?: ReactNode;
    linkTo?: string;
    type?: "submit" | "reset" | "button";
    onClick?: (e:  React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
    disabled?: boolean;
    viewType?: "default" | "blue";
    Icon?: ReactNode;
    tabIndex?: number;
}


export const Button = (props: Props) => {
    const viewType = props.viewType || "default";

    return (
        <ConditionalWrap
            condition={Boolean(props.linkTo)}
            wrap={child => <Link to={String(props.linkTo)}>{child}</Link>}
        >
            <button
                className={cn(css.button, {
                    [css.viewTypeDefault]: viewType === "default",
                    [css.viewTypeBlue]: viewType === "blue"
                }, props.className)}
                disabled={props.disabled}
                onClick={props.onClick}
                type={props.type || "button"}
                tabIndex={props.tabIndex}
            >
                {props.Icon}{props.children}
            </button>
        </ConditionalWrap>
    );
};
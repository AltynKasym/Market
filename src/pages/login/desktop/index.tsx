import {useRef} from "react";
import cn from "classnames";

import {FormTypes} from "@/shared/ui/formKit";
import {SignUpForm} from "@/features/auth/signUpForm";
import {SignInForm} from "@/features/auth/signIn";
import css from "./styles.module.scss";

import {ReactComponent as Logo} from "@/assets/icons/zmall-logo.svg";
import {useNavigate} from "react-router-dom";


export const Desktop = () => {
    const signUpRef = useRef<FormTypes.FormRef>(null);
    const signInRef = useRef<FormTypes.FormRef>(null);
    const navigate = useNavigate();

    return (
        <div className={css.root}>
            <div className={cn("container", css.container)}>
                <div className={css.content}>
                    <button onClick={() => navigate(-1)} className={css.closeBtn}>
                        {/* TODO: иконку в файл */}
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path 
                                fillRule="evenodd"
                                clipRule="evenodd"
                                d="M0 16C0 24.8366 7.16344 32 16 32C24.8366 32 32 24.8366 32 16C32 
                                7.16344 24.8366 0 16 0C7.16344 0 0 7.16344 0 16ZM29.0909 16C29.0909 
                                23.2299 23.2299 29.0909 15.9999 29.0909C8.77004 29.0909 2.90904 23.2299 2.90904 
                                16C2.90904 8.77007 8.77004 2.90908 15.9999 2.90908C23.2299 2.90908 29.0909 8.77007 29.0909 
                                16ZM21.8182 12.4237L19.5763 10.1818L16 13.7581L12.4237 10.1818L10.1818 12.4237L13.7581 16L10.1819 
                                19.5763L12.4238 21.8182L16 18.2419L19.5762 21.8182L21.8181 19.5763L18.2419 16L21.8182 12.4237Z" 
                                fill="#BDBDBD"
                            />
                        </svg>
                    </button>
                    <Logo className={css.logo} width={145} height={58}/>
                    <div className={css.forms}>
                        <SignUpForm
                            ref={signUpRef}
                            onValidate={() => signInRef.current?.resetForm()}
                        />
                        <div className={css.line}></div>
                        <SignInForm
                            ref={signInRef}
                            onValidate={() => signUpRef.current?.resetForm()}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
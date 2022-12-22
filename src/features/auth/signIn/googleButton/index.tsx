import css from "./styles.module.scss";

import {ReactComponent as GoogleIcon} from "@/assets/icons/social/google.svg";


interface Props {
    disabled: boolean;
    onClick: () => void;
}


export const GoogleButton = ({onClick, disabled}: Props) => {
    return (
        <button
            className={css.btnGoogle}
            type="button"
            onClick={onClick}
            disabled={disabled}
        >
            <GoogleIcon className={css.googleIcon} width={29} height={30}/>
            Войти через Google
        </button>
    );
};
import css from "./styles.module.scss";

import {ReactComponent as FacebookIcon} from "@/assets/icons/social/facebook.svg";


interface Props {
    onClick?: () => void;
}


export const FacebookButton = ({onClick}: Props) => {
    return (
        <button
            className={css.btnFacebook}
            type="button"
            onClick={onClick}
        >
            <FacebookIcon className={css.facebookIcon} width={16} height={30}/>
            Войти через Facebook
        </button>
    );
};

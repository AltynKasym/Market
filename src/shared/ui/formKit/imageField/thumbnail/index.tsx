import css from "./styles.module.scss";

import {ReactComponent as XMarkIcon} from "@/assets/icons/x-mark.svg";


interface Props {
    imgUrl: string;
    onRemove: (objectUrl: string) => void;
}


export const Thumbnail = ({imgUrl, onRemove}: Props) => {
    return (
        <div className={css.root}>
            <img  className={css.image} src={imgUrl} alt="img"/>
            <button
                className={css.btnRemove}
                type="button"
                onClick={() => onRemove(imgUrl)}
            >
                <XMarkIcon width={10} height={10}/>
            </button>
        </div>
    );
};
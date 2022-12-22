import css from "./styles.module.scss";
import {ReactComponent as XMarkIcon} from "@/assets/icons/x-mark.svg";


interface Props {
    imgUrl: string;
    onDelete: (objectUrl: string) => void;
}


export const PhotoThumbnail = ({imgUrl, onDelete}: Props) => {
    return (
        <div className={css.root}>
            <img  className={css.image} src={imgUrl} alt="img"/>
            <button
                className={css.btnClose}
                type="button"
                onClick={() => onDelete(imgUrl)}
            >1
                <XMarkIcon width={10} height={10}/>
            </button>
        </div>
    );
};
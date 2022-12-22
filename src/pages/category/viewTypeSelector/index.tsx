import css from "./styles.module.scss";

import {ViewType} from "@/entities/advert";

import {ReactComponent as ListIcon} from "@/assets/icons/card/list.svg";
import {ReactComponent as GridIcon} from "@/assets/icons/card/grid.svg";




interface Props {
    type: ViewType;
    onChangeType: (mode: ViewType) => void;
}


export const ViewTypeSelector = ({type, onChangeType}: Props) => {
    return (
        <div className={css.view}>
            <button
                className={type === ViewType.Grid ? css.buttonActive : css.button}
                type="button"
                onClick={() => onChangeType(ViewType.Grid)}
            >
                <p>Галереей</p>
                <GridIcon className={css.buttonIcon}/>
            </button>
            <button
                className={type === ViewType.List ? css.buttonActive : css.button}
                type="button"
                onClick={() => onChangeType(ViewType.List)}
            >
                <p>Списком</p>
                <ListIcon className={css.buttonIcon}/>
            </button>
        </div>
    );
};
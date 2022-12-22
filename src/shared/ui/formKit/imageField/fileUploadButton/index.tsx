import React, {useState, useRef, Fragment} from "react";
import css from "./styles.module.scss";

import {ReactComponent as PhotoPlusIcon} from "@/assets/icons/photo-plus.svg";


interface Props {
    handleFiles: (files: File[]) => void;
}


export const FileUploadButton = ({handleFiles}: Props) => {
    // стейт добавил только чтобы инпут триггерился когда повторно выбирается один и тот же файл
    const [fileValue, setFileValue] = useState("");

    const hiddenFileInput = useRef<HTMLInputElement>(null);

    const handleClick = () => {
        hiddenFileInput?.current?.click();
    };

    const fileHandle = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFileValue("");
        const files = Array.from(e.target.files as Iterable<File>);
        if (files.length)
            handleFiles(files);
    };

    return (
        <Fragment>
            <button className={css.button} type="button" onClick={handleClick}>
                <PhotoPlusIcon className={css.icon} width={24} height={24}/>
                <p className={css.text}>
                    Добавить фото
                </p>
            </button>
            <input
                type="file"
                accept=".jpg, .png, .jpeg, .gif, .bmp, .tif, .tiff|image/*"
                multiple
                ref={hiddenFileInput}
                onChange={fileHandle}
                value={fileValue}
                style={{display: "none"}}
            />
        </Fragment>
    );
};

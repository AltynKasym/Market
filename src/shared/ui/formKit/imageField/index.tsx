import React from "react";

import {Thumbnail} from "./thumbnail";
import {FileUploadButton} from "./fileUploadButton";

import css from "./styles.module.scss";


interface Props extends React.HTMLAttributes<HTMLDivElement>{
    images: {
        file: File;
        objectUrl: string;
    }[];
    onAdd: (files: File[]) => void;
    onRemove: (objectUrl: string) => void;
}


export const ImageField = ({images, onAdd, onRemove, ...props}: Props) => {
    return (
        <div className={css.root} id={props.id}>
            {
                images.map((imgInfo, i) =>
                    <Thumbnail
                        key={imgInfo.objectUrl}
                        imgUrl={imgInfo.objectUrl}
                        onRemove={() => onRemove(imgInfo.objectUrl)}
                    />
                )
            }
            <FileUploadButton handleFiles={onAdd}/>
        </div>
    );
};
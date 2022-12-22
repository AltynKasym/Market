import {useState, useEffect, useLayoutEffect, RefObject} from "react";


export const useWindowSize = () => {
    const [size, setSize] = useState({width: 0, height: 0});


    const updateSize = () => {
        setSize({width: window.innerWidth, height: window.innerHeight});
    };

    useLayoutEffect(() => {
        updateSize();
        window.addEventListener("resize", updateSize);
        return () => window.removeEventListener("resize", updateSize);
    }, []);

    return size;
};


/**
 * Хук который вызывает колбек при клике за границы html элемента {@param ref}.
 * @param ref
 * @param callback
 *
 * @example
 * const FormDropDown = () => {
 *     const [isShowList, setIsShowList] = useState(false)
 *     const dropListRef = useRef<HTMLUListElement>(null);
 *     useOutsideAlerter(dropListRef, () => setIsShowList(false))
 *
 *     return (
 *         <div>
 *         {
 *             isShowList && (
 *                 <ul ref={dropListRef} className={css.list}>
 *                 </ul>
 *             )
 *         }
 *         </div>
 *     );
 * };
 */
export const useOutsideAlerter = (ref: RefObject<HTMLElement>, callback: () => void) => {
    useEffect(() => {
        // TODO:типизировать
        const handleClickOutside = (e: any) => {
            if (ref.current && !ref.current.contains(e.target))
                callback?.();
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);
};
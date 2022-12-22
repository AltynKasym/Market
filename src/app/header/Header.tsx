import {LinkButtnos} from "./linkBtns/LinkBnts";
import {Mobile} from "./mobile/Mobile";
import {SearchBlock} from "./searchBlock";
import {useEffect} from "react";
import {useAppDispatch, slices} from "@/store";


export const Header = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(slices.fetchFavoriteIds());
    }, []);

    return (
        <div>
            <LinkButtnos />
            <SearchBlock />
            <Mobile />
        </div>
    );
};


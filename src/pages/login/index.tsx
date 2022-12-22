import {useWindowSize} from "@/shared/hooks";
import {Mobile} from "./mobile";
import {Desktop} from "./desktop";


export const Login = () => {
    const {width} = useWindowSize();

    return (width < 768)
        ? <Mobile/>
        : <Desktop/>;
};
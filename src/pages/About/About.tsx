import {FiveSection} from "./fiveSection/FiveSection";
import {FourSection} from "./fourSection/FourSection";
import {OneSection} from "./oneSection/OneSection";
import {SevenSection} from "./sevenSection/SevenSection";
import {SixSection} from "./sixSection/SixSection";
import css from "./styles.module.scss";
import {ThreeSection} from "./threeSection/ThreeSection";
import {TwoSection} from "./twoSection/TwoSection";
import {useEffect} from "react";


export const About = () => {
    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);
    return (
        <div className={css.about}>
            <OneSection />
            <TwoSection />
            <ThreeSection/>
            <FourSection/>
            <FiveSection/>
            <SixSection/>
            <SevenSection/>
        </div>
    );
};



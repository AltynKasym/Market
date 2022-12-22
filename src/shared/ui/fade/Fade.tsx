import {JSXElementConstructor, ReactElement, ReactFragment, ReactPortal, useEffect, useRef, useState} from "react";
import "./fadeInSection.scss";


// TODO: отрефакторить, еще на vercel недеплоится из-за этого
export const FadeInSection = (props: { children: string | number | boolean |
        ReactElement<any, string | JSXElementConstructor<any>> | ReactFragment |
        ReactPortal | null | undefined; }) =>
{
    const [isVisible, setVisible] = useState<boolean>(false);
    const [loaded, setLoaded] = useState<boolean>(false);
    const domRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (isVisible) setLoaded(true);
    }, [isVisible]);

    useEffect(() => {
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => setVisible(entry.isIntersecting));
        });
        if (domRef.current)
            observer.observe(domRef.current as Element);
    }, []);
    return (
        <div
            className={`fade-in-section ${isVisible || loaded ? "is-visible" : ""}`}
            ref={domRef}
        >
            {props.children}
        </div>
    );
};
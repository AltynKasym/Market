const disableScrolling = () => {
    document.body.style.overflow = "hidden";
};

const enableScrolling = () => {
    document.body.style.overflow = "auto";
};

const scrollToTop = () => {
    window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth"
    });
};


const filterIf = <T>(seq: T[], condition: boolean, predicate: (x: T) => boolean): T[] => {
    if (condition)
        return seq.filter(predicate);
    return seq;
};


export const Utils = {
    DOM: {
        disableScrolling,
        enableScrolling
    },
    Window: {
        scrollToTop
    },
    Collection: {
        filterIf
    }
};
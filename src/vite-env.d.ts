/// <reference types="vite/client" />

/* eslint-disable no-unused-vars */

declare type PropsWithClassName<T> = T & {
    className?: string;
};


declare type FCProps<T> = PropsWithClassName<PropsWithChildren<T>>;

declare type Callback = () => void;

declare type Nullable<T> = T | null;
declare type Optional<T> = T | undefined;
declare type Voidable<T> = T | void;




declare type Component<P = any> = (props?: P) => JSX.Element;


type Comparator<T> = (x: T, y: T) => number;


/* eslint-enable no-unused-vars */

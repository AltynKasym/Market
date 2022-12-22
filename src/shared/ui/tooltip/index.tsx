// import {ReactNode, useLayoutEffect, useState} from "react";
// import * as TooltipPrimitive from "@radix-ui/react-tooltip";
//
// import css from "./styles.module.scss";
// import {createPortal} from "react-dom";
//
//
// interface Props {
//     children: ReactNode;
//     message: string;
// }
//
//
// export const Tooltip = ({children, message}: Props) => {
//     return (
//         <div>
//             <TooltipPrimitive.Provider delayDuration={300}>
//                 <TooltipPrimitive.Root>
//                     <TooltipPrimitive.Trigger>
//                         {children}
//                     </TooltipPrimitive.Trigger>
//                     <Content sideOffset={5}>
//                         {message}
//                     </Content>
//                 </TooltipPrimitive.Root>
//             </TooltipPrimitive.Provider>
//         </div>
//     );
// };
//
//
// interface ContentProps extends TooltipPrimitive.TooltipContentProps {
//     children: ReactNode;
// }
//
//
// function ReactPortal({children, wrapperId = "react-portal-wrapper"}) {
//     const [wrapperElement, setWrapperElement] = useState(null);
//
//     useLayoutEffect(() => {
//         const element: any = document.getElementById("portal-root");
//         // if element is not found with wrapperId or wrapperId is not provided,
//         // create and append to body
//         setWrapperElement(element);
//     }, [wrapperId]);
//
//     // wrapperElement state will be null on the very first render.
//     if (wrapperElement === null) return null;
//
//     return createPortal(children, wrapperElement);
// }
//
// const Content = ({children, ...props}: ContentProps) => {
//     return (
//         <>
//             <div className={css.content} {...props}>
//                 {children}
//                 {/*<TooltipPrimitive.Arrow fill="white"/>*/}
//             </div>
//         </>
//     );
// };
//
//
// export const Tooltip2 = (props: any) => {
//     let timeout;
//     const [active, setActive] = useState(false);
//
//     const showTip = () => {
//         timeout = setTimeout(() => {
//             setActive(true);
//         }, props.delay || 400);
//     };
//
//     const hideTip = () => {
//         clearInterval(timeout);
//         setActive(false);
//     };
//
//     return (
//         <div
//             className="Tooltip-Wrapper"
//             // When to show the tooltip
//             onMouseEnter={showTip}
//             onMouseLeave={hideTip}
//         >
//             {/* Wrapping */}
//             {props.children}
//             {active && (
//                 <div className={`Tooltip-Tip ${props.direction || "top"}`}>
//                     <ReactPortal wrapperId={"react-portal-modal-container"}>
//                         <Content>
//                             lol kek
//                         </Content>
//                     </ReactPortal>
//                     {props.content}
//                 </div>
//             )}
//         </div>
//     );
// };
//
//

// TODO: сделать тултип https://paladini.dev/posts/how-to-make-an-extremely-reusable-tooltip-component-with-react--and-nothing-else/

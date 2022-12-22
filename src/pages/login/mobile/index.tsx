import * as TabsPrimitive from "@radix-ui/react-tabs";

import {SignUpForm} from "@/features/auth/signUpForm";
import {SignInForm} from "@/features/auth/signIn";
import css from "./styles.module.scss";


const TabTrigger = TabsPrimitive.Trigger;
const TabContent = TabsPrimitive.Content;
const TabList = TabsPrimitive.List;


export const Mobile = () => {
    return (
        <TabsPrimitive.Root className={css.root} defaultValue="signIn">
            <TabList className={css.tabList}>
                <TabTrigger className={css.tabTrigger} value="signUp">
                    Регистрация
                </TabTrigger>
                <TabTrigger className={css.tabTrigger} value="signIn">
                    Вход
                </TabTrigger>
            </TabList>
            <TabContent className={css.tabContent} value="signUp">
                <div className={css.wrap}>
                    <SignUpForm/>
                </div>
            </TabContent>
            <TabContent className={css.tabContent} value="signIn">
                <div className={css.wrap}>
                    <SignInForm/>
                </div>
            </TabContent>
        </TabsPrimitive.Root>
    );
};
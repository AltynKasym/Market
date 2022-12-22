import React, {forwardRef, useImperativeHandle} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import GoogleLogin, {GoogleLoginResponse, GoogleLoginResponseOffline} from "@leecheuk/react-google-login";
import FacebookLogin from "@greatsumini/react-facebook-login";

import {DTO} from "@/shared/api";
import {userModel} from "@/entities/user";
import {Alerts} from "@/shared/ui/alerts";
import {FormKit, FormTypes} from "@/shared/ui/formKit";
import {BlockingLoader} from "@/shared/ui/BlockingLoader";
import {Button} from "@/shared/ui/Button";

import {validationSchema} from "./model/validation";
import css from "./styles.module.scss";

import {GoogleButton} from "./googleButton";
import {FacebookButton} from "./facebookButton";


interface Props {
    onValidate?: () => void;
}


export const SignInForm = forwardRef<FormTypes.FormRef, Props>(({onValidate}, ref) => {
    const {signInWithEmailAndPassword, signInWithGoogle} = userModel.useAuth();
    const navigate = useNavigate();

    const onGoogleLoginSuccess = async (response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
        if (!("tokenId" in response))
            return;

        try {
            BlockingLoader.show();
            const result = await signInWithGoogle(response.tokenId);
            if (result.status === 200)
                navigate("/");
            else
                await Alerts.showError(result.message);
        } finally {
            BlockingLoader.hide();
        }
    };

    const onGoogleLoginFailure = (response: GoogleLoginResponse) => {
        console.log("GOOGLE Failure", response);
        // TODO: сделать google login
    };


    const formik = useFormik({
        initialValues: {
            email: "",
            password: ""
        } as DTO.LoginData,
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: true,
        validate: onValidate,
        onSubmit: async (values, {setSubmitting, setFieldError}) => {
            try {
                BlockingLoader.show();
                const result = await signInWithEmailAndPassword(values.email, values.password);
                if (result.status === 200)
                    navigate("/");
                else if (result.status === 401)
                    setFieldError("password", "Неверный пароль");
                else
                    await Alerts.showError(result.message);
            } finally {
                BlockingLoader.hide();
                setSubmitting(false);
            }
        }
    });

    useImperativeHandle(ref, () => ({
        resetForm: () => formik.resetForm()
    }));


    return (
        <div className={css.container}>
            <h2 className={css.title}>
                Вход
            </h2>
            <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
                <FormKit.Input
                    type="email"
                    placeholder="Электронная почта"
                    {...formik.getFieldProps("email")}
                    error={formik.touched.email && formik.errors.email}
                />
                <FormKit.Input
                    isPassword
                    placeholder="Пароль"
                    {...formik.getFieldProps("password")}
                    error={formik.touched.password && formik.errors.password}
                />
                <Link className={css.link} to="/auth/forgot-password">
                    Забыли пароль?
                </Link>
                <Button className={css.submitBtn} type="submit" disabled={formik.isSubmitting}>
                    Войти
                </Button>
            </form>

            <p className={css.helpMsg}>
                или сделайте вход <br/>
                используя социальные сети
            </p>
            <FacebookLogin
                appId={import.meta.env.VITE_FACEBOOK_AUTH_CLIENT_ID}
                onSuccess={e => {
                    console.log("FACEBOOK");
                }}
                // callback={onFacebookLogin}
                render={renderProps => (
                    <FacebookButton onClick={renderProps.onClick}/>
                )}
            />
            <GoogleLogin
                clientId={import.meta.env.VITE_GOOGLE_AUTH_CLIENT_ID}
                buttonText="Login"
                onSuccess={onGoogleLoginSuccess}
                onFailure={onGoogleLoginFailure}
                cookiePolicy={"single_host_origin"}
                render={
                    renderProps => <GoogleButton
                        disabled={renderProps.disabled || false}
                        onClick={renderProps.onClick}
                    />
                }
            />
        </div>
    );
});
import {useState, forwardRef, useImperativeHandle} from "react";
import {Link, useNavigate} from "react-router-dom";
import {useFormik} from "formik";
import {AxiosError} from "axios";

import {DTO} from "@/shared/api";
import {userModel} from "@/entities/user";
import {FormKit, FormTypes} from "@/shared/ui/formKit";
import {BlockingLoader} from "@/shared/ui/BlockingLoader";
import {Button} from "@/shared/ui/Button";
import {Alerts} from "@/shared/ui/alerts";

import {validationSchema} from "./model/validation";
import css from "./styles.module.scss";


interface Props {
    onValidate?: () => void;
}


export const SignUpForm = forwardRef<FormTypes.FormRef, Props>(({onValidate}, ref) => {
    const navigate = useNavigate();
    const {signUp} = userModel.useAuth();

    const [isValidateOnChange, setIsValidateOnChange] = useState(false);


    const formik = useFormik({
        initialValues: {
            last_name: "",
            first_name: "",
            phone_number: "",
            email: "",
            password: "",
            password2: "",
            policy_agreement: false
        } as DTO.RegisterData,
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: isValidateOnChange,
        validate: () => {
            setIsValidateOnChange(true);
            onValidate?.();
        },
        onSubmit: async (values, {setSubmitting,  setFieldError}) => {
            try {
                BlockingLoader.show();
                const result = await signUp(values);
                if (result.status === 201) {
                    await Alerts.showSuccess("На почту отправлен код активции");
                    navigate(`/auth/activation?email=${values.email}`);
                }
                else
                    await Alerts.showError("Unexpected");
            } catch (e) {
                const err = e as AxiosError;
                const errors = err.response?.data as DTO.ServerFieldErrors;
                Object.keys(errors)
                    .forEach(key => setFieldError(key, errors[key][0]));
            } finally {
                BlockingLoader.hide();
                setSubmitting(false);
            }
        },
    });


    useImperativeHandle(ref, () => ({
        resetForm: () => formik.resetForm()
    }));


    return (
        <div className={css.container}>
            <h2 className={css.title}>
                Регистрация
            </h2>

            <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
                <FormKit.Input
                    placeholder="Фамилия"
                    {...formik.getFieldProps("last_name")}
                    error={formik.errors.last_name}
                />
                <FormKit.Input
                    placeholder="Имя"
                    {...formik.getFieldProps("first_name")}
                    error={formik.errors.first_name}
                />
                <FormKit.Input
                    type="tel"
                    placeholder="Телефоный номер"
                    {...formik.getFieldProps("phone_number")}
                    error={formik.errors.phone_number}
                />
                <FormKit.Input
                    type="email"
                    placeholder="Электронная почта"
                    {...formik.getFieldProps("email")}
                    error={formik.errors.email}
                />
                <FormKit.Input
                    isPassword
                    placeholder="Пароль"
                    {...formik.getFieldProps("password")}
                    error={formik.errors.password}
                />
                <FormKit.Input
                    isPassword
                    placeholder="Повторите пароль"
                    {...formik.getFieldProps("password2")}
                    error={formik.errors.password2}
                />

                <FormKit.Checkbox
                    className={css.agreementCheckBox}
                    {...formik.getFieldProps("policy_agreement")}
                    error={formik.errors.policy_agreement}
                >
                    <span className={css.agreementCheckBoxText}>
                        Я соглашаюсь с &nbsp;
                        <Link to="/privacy-policy">
                             правилами использования сервиса
                        </Link>
                        , а также с передачей и обработкой моих данных.
                    </span>
                </FormKit.Checkbox>

                <Button className={css.submitBtn} type="submit" disabled={formik.isSubmitting}>
                    Зарегистрироваться
                </Button>
            </form>
        </div>
    );
});
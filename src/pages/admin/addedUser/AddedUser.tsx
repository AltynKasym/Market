import  css from "./styles.module.scss";
import {FormKit} from "@/shared/ui/formKit";
import {Link} from "react-router-dom";
import {Button} from "@/shared/ui/Button";
import {useState} from "react";
import {useFormik} from "formik";
import {DTO} from "@/shared/api";
import {validationSchema} from "@/features/auth/signUpForm/model/validation";



export const AddedUser = () => {
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
        },
        onSubmit: async () => {
        }
    });


    return (
        <div className={css.root}>
            <div className={css.container}>
                <h2 className={css.title}>
                Зарегистрировать пользователя
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
        </div>

    );
};
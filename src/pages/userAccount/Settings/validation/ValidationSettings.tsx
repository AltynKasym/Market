import css from "./style.module.scss";
import {FormKit} from "@/shared/ui/formKit";
import {useState} from "react";
import {useFormik} from "formik";
import {validationSchema} from "./model/validationSchema";
import {userModel} from "@/entities/user";
import {BlockingLoader} from "@/shared/ui/BlockingLoader";
import {Alerts} from "@/shared/ui/alerts";
import {DTO} from "@/shared/api";



export const ValidationSettings = () => {
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const {changeUser, user} = userModel.useAuth();
    if (!user) {
        return null;
    }
    const initValues: DTO.ChangeUserRequest = {
        last_name: user.last_name,
        first_name: user.first_name,
        phone_number: user.phone_number,
        email: user.email,
        new_password: "",
        old_password: ""
    };

    const formik = useFormik({
        initialValues: initValues,
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: isValidateOnChange,
        validate: () => {
            setIsValidateOnChange(true);
        },
        onSubmit: async (values, {setSubmitting, setErrors}) => {
            console.log(values);
            setSubmitting(false);
            try {
                BlockingLoader.show();
                await changeUser(`${user?.email}`, values.old_password, values);
                await Alerts.showSuccess("Данные изменены");
            } catch {
                await Alerts.showError("Пароль не вереный");
            } finally {
                BlockingLoader.hide();
            }
        },
    });

    return (
        <form onSubmit={formik.handleSubmit} noValidate className={css.form}>
            <p className={css.title}>
                Данные профиля
            </p>
            <FormKit.Input
                placeholder="Фамилия"
                className={css.input}
                {...formik.getFieldProps("last_name")}
                error={formik.errors.last_name}
            />
            <FormKit.Input
                placeholder="Имя"
                className={css.input}
                {...formik.getFieldProps("first_name")}
                error={formik.errors.first_name}
            />
            <FormKit.Input
                type="email"
                placeholder="Электронная почта"
                className={css.input}
                {...formik.getFieldProps("email")}
                error={formik.errors.email}
            />
            <FormKit.Input
                type="tel"
                placeholder="Номер телефона"
                className={css.input}
                {...formik.getFieldProps("phone_number")}
                error={formik.errors.phone_number}
            />
            <FormKit.Input
                isPassword
                placeholder="Введите старый пароль"
                className={css.input}
                {...formik.getFieldProps("old_password")}
                error={formik.errors.old_password}
            />
            <FormKit.Input
                isPassword
                placeholder="Введите новый пароль "
                className={css.input}
                {...formik.getFieldProps("new_password")}
                error={formik.errors.new_password}
            />
            <button className={css.submitBtn} type="submit">
                Сохранить
            </button>
        </form>
    );
};
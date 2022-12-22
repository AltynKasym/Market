import {useState} from "react";
import {useFormik} from "formik";
import cn from "classnames";

import {FormKit} from "@/shared/ui/formKit";
import {DTO, Api} from "@/shared/api";
import {Alerts} from "@/shared/ui/alerts";
import {BlockingLoader} from "@/shared/ui/BlockingLoader";
import {Button} from "@/shared/ui/Button";

import {validationSchema} from "./model/validationSchema";
import css from "./styles.module.scss";


export const Validation = () => {
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);

    const initialValues: DTO.ContactAdminData = {
        name: "",
        message: "",
        feedback_title: "",
        email: "",
    };

    const formik = useFormik({
        initialValues: initialValues,
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: isValidateOnChange,
        validate: () => setIsValidateOnChange(true),
        onSubmit: async (values, {setSubmitting, setErrors, resetForm}) => {
            try {
                BlockingLoader.show();
                const feedback = await Api.Common.feedback(values);
                if (feedback.status === 201) {
                    await Alerts.showSuccess("Отправлено");
                    resetForm();
                    setIsValidateOnChange(false);
                }
            } catch (e) {
                console.error(e);
                await Alerts.showError("Ошибка");
            } finally {
                BlockingLoader.hide();
                setSubmitting(false);
            }
        }
    });


    return (
        <div className={css.content}>
            <form onSubmit={formik.handleSubmit} noValidate>
                <FormKit.Input
                    className={css.input}
                    placeholder="Ваше имя"
                    {...formik.getFieldProps("name")}
                    error={formik.errors.name}
                />
                <FormKit.Input
                    placeholder="Ваш email"
                    {...formik.getFieldProps("email")}
                    error={formik.errors.email}
                    className={css.input}
                />
                <FormKit.Input
                    placeholder="Тема сообщения"
                    {...formik.getFieldProps("feedback_title")}
                    error={formik.errors.feedback_title}
                    className={css.input}
                />
                <textarea
                    placeholder="Ваше сообщение"
                    name="message"
                    className={cn(css.textarea, formik.errors.message && css.errBorder)}
                    onChange={formik.handleChange}
                    value={formik.values.message}
                />
                <p className={css.err}>{formik.errors.message}</p>
                <Button type="submit" className={css.btn} disabled={formik.isSubmitting}>отправить сообщение</Button>
            </form>
        </div>
    );
};
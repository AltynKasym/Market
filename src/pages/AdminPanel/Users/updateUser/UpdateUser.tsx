import {useParams} from "react-router-dom";
import {useFormik} from "formik";
import {useState} from "react";

import {Button} from "@/shared/ui/Button";
import {FormKit} from "@/shared/ui/formKit";
import {UpdateUserData} from "@/shared/api/types";
import {userApi} from "@/shared/api/rtk-queries/userApi";
import {Alerts} from "@/shared/ui/alerts";

import css from "./styles.module.scss";
import {validationSchemaForUpdateUser} from "./model";


export const UpdateUser = () => {
    const {userId: userId} = useParams<{userId?: string}>();
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const [updateData] = userApi.useUpdateUserMutation();

    // const user = userApi.useGetUserByIdQuery(userId);

    const initialState:UpdateUserData = {
        first_name: "",
        last_name: "",
        email: "",
        phone_number: "",
    };

    const formik = useFormik({
        initialValues: initialState,
        validationSchema: validationSchemaForUpdateUser,
        validateOnBlur: false,
        validateOnChange: isValidateOnChange,
        validate: () => {
            setIsValidateOnChange(true);
        },
        onSubmit: async (values, {setSubmitting} ) => {
            const data = await updateData({id: userId, data: values});
            data?.error ? Alerts.showError("Ошибка") : Alerts.showSuccess("Изменено успешно");
            setSubmitting(false);
        }
    });

    return (
        <div className={css.updateUser}>
            <div className='container'>
                <h2  className={css.title}>Редактировать</h2>
                <div className={css.content}>
                    <form onSubmit={formik.handleSubmit} noValidate className={css.form}>
                        <FormKit.Input
                            placeholder="Имя"
                            {...formik.getFieldProps("first_name")}
                            error={formik.errors.first_name}
                        />
                        <FormKit.Input
                            placeholder="Фамилия"
                            {...formik.getFieldProps("last_name")}
                            error={formik.errors.first_name}
                        />
                        <FormKit.Input
                            placeholder="Телефон номер"
                            {...formik.getFieldProps("phone_number")}
                            error={formik.errors.phone_number}
                        />
                        <FormKit.Input
                            placeholder="Электронная почта"
                            {...formik.getFieldProps("email")}
                            error={formik.errors.email}
                        />
                        <div className={css.btnBox}>
                            <Button type='submit' disabled={formik.isSubmitting}>Сохраните</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
import * as Yup from "yup";


export const validationSchema = Yup.object().shape({
    email: Yup.string()
        .required("Это поле обязательно к заполнению")
        .email("Неверный формат email"),
    password: Yup.string()
        .required("Введите пароль")
});
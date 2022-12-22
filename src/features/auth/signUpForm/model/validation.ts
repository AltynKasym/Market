import * as Yup from "yup";


export const validationSchema = Yup.object().shape({
    last_name: Yup.string()
        .required("Это поле обязательно к заполнению")
        .min(3, "Имя должно быть минимум из 3 букв")
        .max(20, "Имя должно быть максимум из 20 букв"),
    first_name: Yup.string()
        .required("Это поле обязательно к заполнению")
        .min(3, "Имя должно быть минимум из 3 букв")
        .max(20, "Имя должно быть максимум из 20 букв"),
    phone_number: Yup.string()
        .required("Введите номер телефона")
        .min(9, "Длина номера телефона не менее 9 цифр"),
    email: Yup.string()
        .required("Это поле обязательно к заполнению")
        .email("Неверный формат email"),
    password: Yup.string()
        .required("Это поле обязательно к заполнению")
        .min(8, "Длина пароля не должна быть менее 10 символов")
        .matches(/\D+/, "Должен содержать хотя бы 1 букву")
        .matches(/\d+/, "Должен содержать хотя бы 1 цифру"),
    password2: Yup.string()
        .required("Введите пароль повторно")
        .oneOf([Yup.ref("password"), null], "Пароли не совпадают"),
    policy_agreement: Yup.boolean()
        .oneOf([true], "Обязательно")
});
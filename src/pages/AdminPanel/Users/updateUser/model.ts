import * as Yup from "yup";


export const validationSchemaForUpdateUser = Yup.object({
    first_name: Yup.string()
        .max(20, "Имя должно быть максимум из 20 букв")
        .min(3, "Имя должно быть минимум из 3 букв")
        .required("Это поле обязательно"),
    last_name: Yup.string()
        .max(20, "Имя должно быть максимум из 20 букв")
        .min(3, "Имя должно быть минимум из 3 букв")
        .required("Это поле обязательно"),
    email: Yup.string().email("Неверный формат email").required("Это поле обязательно"),
    phone_number: Yup.string()
        .required("Введите номер телефона")
        .min(13, "Длина номера телефона не менее 13 цифр"),
});
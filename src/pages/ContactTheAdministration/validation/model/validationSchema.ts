import * as Yup from "yup";


export const validationSchema = Yup.object({
    name: Yup.string()
        .max(20, "Имя должно быть максимум из 20 букв")
        .min(3, "Имя должно быть минимум из 3 букв")
        .required("Это поле обязательно"),
    email: Yup.string().email("Неверный формат email").required("Это поле обязательно"),
    feedback_title: Yup.string().required("Это поле обязательно"),
    message: Yup.string()
        .min(10, "Сообщения должно быть минимум из 10 букв")
        .required("Это поле обязательно")
});
import * as Yup from "yup";


const requiredMsg = "Это поле обязательно";

export const validationSchema = Yup.object().shape({
    name: Yup.string()
        .required(requiredMsg),
    start_price: Yup.number()
        .required(requiredMsg)
        .positive("Отрицательная цена"),
    end_price: Yup.number()
        .test("end_price", "Меньше начальной цены",
            function (value) {
                const start_price = this.resolve(Yup.ref("start_price")) as number;
                return !value || value >= start_price;
            }
        ),
    description: Yup.string()
        .required(requiredMsg),
    email: Yup.string()
        .required(requiredMsg)
        .email("Неверный формат email"),
    wa_number: Yup.string()
        .required("Введите номер телефона"),
    phones: Yup.array()
        .of(Yup.string()
            .required("Введите номер телефона")
        )
});

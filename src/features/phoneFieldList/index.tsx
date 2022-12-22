import React from "react";
import {useFormik} from "formik";
import _ from "lodash";

import {FormKit} from "@/shared/ui/formKit";
import css from "./styles.module.scss";

import {ReactComponent as XMarkIcon} from "@/assets/icons/x-mark.svg";


interface FormikConfigType extends JSX.IntrinsicAttributes {
    phones: string[];
    wa_number: string;
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
    phoneFieldCount: number;
    addPhoneField: () => void;
    deletePhoneField: (phone: string) => void;
    formik: ReturnType<typeof useFormik<FormikConfigType>>;
}


export const PhoneFieldList = ({formik, addPhoneField, phoneFieldCount, deletePhoneField, ...props}: Props) => {
    const tabIndex = props.tabIndex || -1;

    return (
        <div className={css.phoneInputList} id={props.id}>
            <div className={css.phoneInputWrap}>
                <FormKit.PhoneInput
                    {...formik.getFieldProps("phones[0]")}
                    error={formik.errors.phones?.[0]}
                    tabIndex={tabIndex}
                />
            </div>
            <button className={css.addButton} type="button" onClick={addPhoneField}>
                + еще телефон
            </button>
            {
                _.range(phoneFieldCount - 1)
                    .map((x, i) => (
                        <div key={i} className={css.phoneInputWrap}>
                            <FormKit.PhoneInput
                                key={i}
                                {...formik.getFieldProps(`phones[${i + 1}]`)}
                                error={formik.errors.phones?.[i + 1]}
                                tabIndex={tabIndex + i}
                            />
                            <button
                                className={css.btnPhoneDelete}
                                type="button"
                                onClick={() => deletePhoneField(formik.getFieldProps(`phones[${i + 1}]`).value)}
                                tabIndex={-1}
                            >
                                <XMarkIcon width={10} height={10}/>
                            </button>
                        </div>
                    ))
            }
            <div className={css.phoneInputWrap}>
                <FormKit.PhoneInput
                    {...formik.getFieldProps("wa_number")}
                    error={formik.errors.wa_number}
                    type="whatsapp"
                    tabIndex={tabIndex + phoneFieldCount}
                />
            </div>
        </div>
    );
};
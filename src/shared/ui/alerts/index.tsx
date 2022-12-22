import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

import {Utils} from "@/shared/utils";
import {Button} from "@/shared/ui/Button";

import css from "./styles.module.scss";


const MySwal = withReactContent(Swal);

const showError = async (message: string) => {
    try {
        Utils.DOM.disableScrolling();

        await MySwal.fire({
            backdrop: true,
            heightAuto: true,
            position: "center",
            icon: "error",
            html: (
                <div className={css.alertContainer}>
                    <p className={css.alertErrorMsg}>{message}</p>
                    <Button onClick={() => MySwal.clickConfirm()}>OK</Button>
                </div>
            ),
            buttonsStyling: false,
            showConfirmButton: false
        });
    } finally {
        Utils.DOM.enableScrolling();
    }
};


const showSuccess = async (message: string, callback?: () => void) => {
    try {
        Utils.DOM.disableScrolling();

        await MySwal.fire({
            backdrop: true,
            heightAuto: true,
            position: "center",
            icon: "success",
            html: (
                <div className={css.alertContainer}>
                    <p className={css.alertSuccessMsg}>{message}</p>
                    <Button onClick={() => MySwal.clickConfirm()}>OK</Button>
                </div>
            ),
            buttonsStyling: false,
            showConfirmButton: false
        });

    } finally {
        Utils.DOM.enableScrolling();
    }
};

const confirm = async () => {
    try {
        Utils.DOM.disableScrolling();

        return await MySwal.fire({
            backdrop: true,
            heightAuto: true,
            position: "center",
            html: (
                <div className={css.alertContainer}>
                    <p className={css.alertSuccessMsg}>Удалить?</p>
                </div>
            ),
            buttonsStyling: false,
            showConfirmButton: true,
            showDenyButton: true,
            confirmButtonText: "OK",
            denyButtonText: "Отмена",
            // @ts-ignore
            confirmButtonClass: `${css.confirmBtn}`,
            denyButtonClass: `${css.confirmBtn}`,
        });

    } finally {
        Utils.DOM.enableScrolling();
    }
};


export const Alerts = {
    showSuccess,
    showError,
    confirm
};
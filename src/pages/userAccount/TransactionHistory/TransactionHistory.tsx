import {transactionData, transactionTheme} from "../data";
import css from "./style.module.scss";


export const TransactionHistory = () => {
    return (
        <div>
            <div>
                <div className={css.content}>
                    <table id={css.table}>
                        <tr className={css.tableHeader}>
                            {transactionTheme.map((el, idx) => <th key={idx}>{el}</th>)}
                        </tr>
                        {transactionData.map((el, idx) => (
                            <tr key={idx}>
                                <td>{el.typeAd}</td>
                                <td className={css.ad}>{el.adverts}</td>
                                <td>{el.data}</td>
                                <td>{el.sum}</td>
                            </tr>
                        ))}
                    </table>
                </div>
            </div>
        </div>
    );
};

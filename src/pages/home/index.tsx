import {Categories} from "@/features/categories";
import {ColumnSelector} from "@/shared/ui/formKit/columnSelector";

import {NewAdverts} from "./newAdverts";
import {PremiumAdverts} from "./premiumAdverts";
import css from "./styles.module.scss";


const items = [
    {title: "ID", checked: true, value: "1"},
    {title: "Name", checked: true, value: "2"},
    {title: "Parent Category 1 ID", checked: true, value: "3"},
    {title: "Parent Category 2 ID", checked: false, value: "4"},
    {title: "Parent Category 3 ID", checked: false, value: "5"},
    {title: "Parent Category 4 ID", checked: false, value: "6"},
    {title: "Parent Category 5 ID", checked: false, value: "7"},
    {title: "Parent Category 6 ID", checked: false, value: "8"},
];



export const Home = () => {
    return (
        <div className={css.root}>
            <Categories/>
            <div className="container">
                <ColumnSelector
                    initialColumns={items}
                    onClose={selectedColumns => console.log(selectedColumns)}
                />
                <PremiumAdverts/>
                <NewAdverts/>
            </div>
        </div>
    );
};
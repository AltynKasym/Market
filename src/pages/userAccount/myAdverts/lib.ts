import {useState, useEffect} from "react";
import {commonEntitiesApi, DTO} from "@/shared/api";


/**
 * Возвращает список категорий + 1 мнимый элемент "Все категории".
 */
export const useCategories = () => {
    const {data: categoriesData} = commonEntitiesApi.useGetCategoriesQuery();
    const [categories, setCategories] = useState<DTO.Category[]>([]);
    useEffect(() => {
        if (categoriesData) {
            setCategories([
                {
                    id: Number.MIN_SAFE_INTEGER,
                    name: "Все категории",
                    icon: "",
                    advert_count: Number.MIN_SAFE_INTEGER
                }, ...categoriesData
            ]);
        }
    }, [categoriesData]);

    return {categories};
};
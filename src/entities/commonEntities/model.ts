import {DTO, commonEntitiesApi} from "@/shared/api";


export const useCommonEntities = () => {
    const {data: cities} = commonEntitiesApi.useGetCitiesQuery();
    const {data: subCategories} = commonEntitiesApi.useGetSubCategoriesQuery();
    const {data: categories} = commonEntitiesApi.useGetCategoriesQuery();


    const getCategory = (categoryID: number): Optional<DTO.Category> => {
        return categories?.find(x => x.id === categoryID);
    };

    const getSubCategory = (subCategoryId: number): Optional<DTO.SubCategory> => {
        return subCategories?.find(x => x.id === subCategoryId);
    };

    const getCity = (cityId: number): Optional<DTO.City> => {
        return cities?.find(x => x.id === cityId);
    };


    return {
        getCategory,
        getSubCategory,
        getCity
    };
};
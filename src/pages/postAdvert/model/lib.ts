export interface ImageInfo {
    file: File;
    objectUrl: string;
}

type InitValuesType = ReturnType<typeof getInitValues>;


export const getInitValues = (userId: number, categoryId: number, subCategoryId: number, cityId: number) => {
    return {
        owner: userId,
        promote: "",
        category: categoryId,
        sub_category: subCategoryId,
        name: "",
        start_price: "",
        end_price: "",
        description: "",
        city: cityId,
        email: "",
        wa_number: "+",
        phones: ["+"],
        advert_contact: ""
    };
};


export const createFormData = (values: InitValuesType, images: ImageInfo[]): FormData => {
    const data = new FormData();
    Object.keys(values)
        .filter(x => x !== "phones" && x !== "advert_contact")
        .forEach((keyStr) => {
            const key = keyStr as keyof typeof values;
            data.append(key, String(values[key]));
        });

    images.forEach((img, i) => data.append("image", img.file));
    data.append("advert_contact", values.phones.join(", "));
    return data;
};
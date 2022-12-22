import {DTO} from "@/shared/api";


export const getSearchParams = (args: Voidable<DTO.AdvertsRequestQueryParams>): URLSearchParams => {
    const params = new URLSearchParams();
    if (args) {
        args.categoryId && params.append("category", String(args.categoryId));
        args.subCategoryId && params.append("sub_category", String(args.subCategoryId));
        args.cityId && params.append("city", String(args.cityId));
        Number.isFinite(args.startPrice) && params.append("start_price_min", String(args.startPrice));
        Number.isFinite(args.endPrice) && params.append("start_price_max", String(args.endPrice));
        if (args.noImage !== undefined)
            params.append("image", String(args.noImage));
        args.limit && params.append("limit", String(args.limit));
        args.offset && params.append("offset", String(args.offset));
        args.search && params.append("search", String(args.search));
        args.ordering && params.append("ordering", args.ordering);
    }
    return params;
};
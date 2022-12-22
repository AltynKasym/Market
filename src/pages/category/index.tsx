import {useState, useEffect} from "react";
import {useParams, useLocation} from "react-router-dom";

import {commonEntitiesModel} from "@/entities/commonEntities";
import {advertModel, ViewType} from "@/entities/advert";
import {Categories} from "@/features/categories";
import {BreadCrumbs} from "@/features/breadCrumbs";
import {DTO} from "@/shared/api";
import {Utils} from "@/shared/utils";
import {NumberPaginator} from "@/shared/ui/pagination/numberPaginator";
import {Spinner} from "@/shared/ui/spinner";

import {SortTypeSelector} from "./sortTypeSelector";
import {ViewTypeSelector} from "./viewTypeSelector";
import {CardList} from "./cardList";
import {Filter} from "./filter";
import {getSubCategoryIdParam} from "./lib";
import css from "./styles.module.scss";


const PAGE_SIZE = 16;


export const Category = () => {
    //<editor-fold desc="Params">
    const location = useLocation();
    const params = useParams();
    const categoryId = Number(params.id);
    const subCategoryId = getSubCategoryIdParam();

    const [pageNum, setPageNum] = useState(0);
    const [offset, setOffset] = useState(0);
    useEffect(() => void setOffset(pageNum * PAGE_SIZE), [pageNum]);

    const [viewType, setViewType] = useState(ViewType.Grid);
    const [sortType, setSortType] = useState<DTO.AdvertsRequestOrdering>("-created_date");

    const [filterArgs, setFilterArgs] = useState<DTO.AdvertsRequestQueryParams>({});
    useEffect(() => {
        setFilterArgs(prev => ({
            ...prev,
            cityId: location.state?.cityId,
            categoryId: !subCategoryId ? categoryId : undefined,
            subCategoryId: subCategoryId
        }));
        setPageNum(0);
        setOffset(0);
    }, [params]);

    useEffect(() => {
        Utils.Window.scrollToTop();
    }, [params, pageNum]);
    //</editor-fold desc="Params">

    const {getCategory} = commonEntitiesModel.useCommonEntities();
    const category = getCategory(categoryId);

    const {data: advertsData} = advertModel.advertApi.useGetAdvertsQuery({
        categoryId: (categoryId === -1 || subCategoryId) ? undefined : filterArgs.categoryId,
        subCategoryId: filterArgs.subCategoryId,
        cityId: filterArgs.cityId,
        startPrice: filterArgs.startPrice,
        endPrice: filterArgs.endPrice,
        noImage: filterArgs.noImage ? false : undefined,
        ordering: sortType,
        limit: PAGE_SIZE,
        offset: offset
    }, {
        refetchOnMountOrArgChange: true,
        skip: !filterArgs.categoryId && !filterArgs.subCategoryId
    });


    return advertsData ? (
        <div className={css.root}>
            <Categories/>
            <div className="container">
                <BreadCrumbs
                    location={[
                        {
                            folder: "/category/{id}",
                            name: category?.name || "",
                        },
                    ]}
                />

                <div className={css.header}>
                    <h2 className={css.title}>{category?.name} в Казахстане</h2>
                    <span className={css.adsNumber}>
                        {
                            (categoryId === -1)
                                ? advertsData.count
                                : category?.advert_count || 0
                        }
                        &nbsp; объявлений
                    </span>
                </div>

                <div className={css.inner}>
                    <div className={css.category}>
                        <div className={css.control}>
                            <ViewTypeSelector type={viewType} onChangeType={setViewType}/>
                            <SortTypeSelector sortType={sortType} onChangeSortType={setSortType}/>
                        </div>
                        <CardList viewType={viewType} adverts={advertsData.results}/>
                        <div className={css.pagination}>
                            {
                                (advertsData?.results.length)
                                    ? (<NumberPaginator
                                        totalQty={advertsData?.count}
                                        pageSize={PAGE_SIZE}
                                        page={pageNum}
                                        onChangePage={setPageNum}
                                    />
                                    )
                                    : <h4>Пусто</h4>
                            }
                        </div>
                    </div>
                    <Filter onSubmit={(args) => {
                        setFilterArgs({
                            categoryId: categoryId,
                            subCategoryId: getSubCategoryIdParam(),
                            cityId: args?.cityId,
                            startPrice: args?.startPrice,
                            endPrice: args?.endPrice,
                            noImage: args?.hasImage,
                        });
                        setPageNum(0);
                        setOffset(0);
                    }}/>
                </div>
            </div>
        </div>
    ) : <Spinner/>;
};
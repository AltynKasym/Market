import {Link, NavLink, useParams} from "react-router-dom";
import cn from "classnames";

import {commonEntitiesApi} from "@/shared/api";
import {SkeletonCategories} from "./SkeletonCategories";
import css from "./styles.module.scss";


export const Categories = () => {
    const params = useParams();

    const {
        data: categories, isLoading: isCategoriesLoading,
        error: isCategoriesError
    } = commonEntitiesApi.useGetCategoriesQuery();
    const {
        data: subCategories, isLoading: isSubCategoriesLoading,
        error: isSubCategoriesError
    } = commonEntitiesApi.useGetSubCategoriesQuery();


    return (
        <div className={css.categories}>
            <div className={cn("container", css.container)}>
                <div className={css.block}>
                    {(isCategoriesLoading || isCategoriesError) ? <SkeletonCategories count={10}/> : null}
                    {
                        categories?.map((item, index) => (
                            <NavLink
                                key={index}
                                className={({isActive}) => cn(css.item, isActive && css.itemActive)}
                                to={`/category/${item.id}`}
                            >
                                <img className={css.img} src={item.icon} alt="icon"/>
                                <p className={css.text}>{item.name}</p>
                            </NavLink>
                        ))
                    }
                </div>
            </div>
            {
                (location.pathname !== "/") && (
                    <div className={css.blockTwo}>
                        <div className={cn("container", css.container)}>
                            <div className={css.item}>
                                {isSubCategoriesLoading && <p>ЗАГРУЗКА</p>}
                                {isSubCategoriesError && <p>ДАННЫХ НЕТ</p>}
                                {
                                    subCategories?.filter(x => x.category === Number(params.id))
                                        .map((item, index) => (
                                            <Link className={css.text} key={index} to={`?sub-category=${item.id}`}>
                                                <p>{item.name}</p>
                                                <p className={css.number}>{item.advert_count}</p>
                                            </Link>
                                        ))
                                }
                            </div>
                        </div>
                    </div>
                )
            }
        </div>
    );
};

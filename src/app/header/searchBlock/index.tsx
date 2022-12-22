import React, {useState, useEffect, useRef} from "react";
import {Link, useNavigate} from "react-router-dom";
import cn from "classnames";

import {advertModel} from "@/entities/advert";
import {DTO, commonEntitiesApi} from "@/shared/api";
import {useOutsideAlerter} from "@/shared/hooks";

import {SelectCategory} from "./selectCategory/SelectCategory";

import css from "./styles.module.scss";

import {ReactComponent as PlusIcon} from "@/assets/icons/plus-circle.svg";
import {ReactComponent as LogoIcon} from "@/assets/icons/logo.svg";
import arrowIcon from "@/assets/icons/arrow/arrow-down.svg";
import searchIcon from "@/assets/icons/search.svg";
import empty from "@/assets/images/empty-card-image.png";


export const SearchBlock = () => {
    const [isActiveCategories, setIsActiveCategories] = useState<boolean>(false);
    const [category, setCategory] = useState<DTO.Category>();
    const [value, setValue] = useState<string>("");
    const [isShowSearchResult, setIsShowSearchResult] = useState<boolean>(false);
    const {data: categories} = commonEntitiesApi.useGetCategoriesQuery();
    const {data: advertsData, isLoading} = advertModel.advertApi.useGetAdvertsQuery({
        categoryId: category?.id,
        search: value
    },
    {skip: !value}
    );

    const navigate = useNavigate();

    useEffect(() => {
        value && setIsShowSearchResult(true);
    }, [value]);

    const handlerSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        navigate("/search", {
            state: {
                categoryId: category?.id,
                searchText: value
            }
        });
    };

    const ref = useRef<HTMLDivElement>(null);
    useOutsideAlerter(ref, () => {
        setIsShowSearchResult(false);
    });


    return (
        <div className={css.searchBlock}>
            <div className={cn("container", css.container)}>
                <Link to="/">
                    <LogoIcon className={css.logo}/>
                </Link>
                <div className={css.block}>
                    <form onSubmit={handlerSubmit} className={css.search}>
                        <div className={css.dropDown}
                            onClick={() => setIsActiveCategories(true)}
                        >
                            {category?.name ?? " Во всех категориях"}
                            {/* TODO: пофиксить как в DropDown*/}
                            <img
                                src={arrowIcon}
                                alt="arrow"
                                className={css.dropdownIcon}
                                style={{
                                    transform: isActiveCategories ? "rotate(0deg)" : "rotate(180deg)",
                                    transition: "0.4s"
                                }}
                            />
                        </div>
                        {isActiveCategories && (
                            <SelectCategory
                                categories={categories || []}
                                selectedCategory={category}
                                onSelectCategory={setCategory}
                                onClose={() => setIsActiveCategories(false)}
                            />
                        )}
                        <div className={css.line}></div>
                        <input type="text" placeholder="Поиск по объявлениям" className={css.seacrhInput}
                            onChange={(e) => setValue(e.target.value)}
                            value={value}
                            onClick={() => setIsShowSearchResult(true)}
                        />
                        <div className={css.searchAdvert} ref={ref}>
                            {
                                (isShowSearchResult && value && !isLoading)
                                    ? advertsData?.results.map((item, i) => (
                                        <Link to={`/detail/${item.id}`} className={css.item} key={i}
                                            onClick={() => setValue("")}
                                        >
                                            {<img src={item.advert_image?.[0]?.image || empty} alt="img"/>}
                                            <div className={css.text}>
                                                <p className={css.title}>{item.name}</p>
                                                <p className={css.number}>{item.start_price} ₸</p>
                                            </div>
                                        </Link>
                                    )) : null}
                        </div>
                        <button type="submit" className={css.seacrhBtn}>
                            <span>найти</span>
                            <img src={searchIcon} alt="searchIcon" className={css.seacrhIcon}/>
                        </button>
                    </form>
                    <Link className={css.btn} to="/post-advert">
                        <PlusIcon className={css.plus}/>
                        <span>добавить объявление</span>
                    </Link>
                </div>
            </div>
        </div>
    );
};
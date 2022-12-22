import {useEffect, useState} from "react";
import {useLocation} from "react-router-dom";
import {useFormik} from "formik";
import cn from "classnames";

import {commonEntitiesApi} from "@/shared/api";
import {useWindowSize} from "@/shared/hooks";
import {Button} from "@/shared/ui/Button";

import css from "./styles.module.scss";

import {ReactComponent as ArrowIcon} from "@/assets/icons/arrow/arrow-down.svg";


interface Args {
    cityId?: number;
    hasImage?: boolean;
    startPrice?: number;
    endPrice?: number;
}

interface Props {
    onSubmit: (args: Args) => void;
}


export const Filter = ({onSubmit}: Props) => {
    const location = useLocation();

    const [isShowFilter, setIsShowFilter] = useState(false);
    const [isShowPrice, setIsShowPrice] = useState(false);
    const [isShowCity, setIsShowCity] = useState(false);

    const {width} = useWindowSize();
    const isMobile = width <= 992;

    const {data: cities} = commonEntitiesApi.useGetCitiesQuery();
    useEffect(() => {
        if (isMobile) {
            setIsShowFilter(false);
            setIsShowPrice(false);
            setIsShowCity(false);
        } else {
            setIsShowFilter(true);
            setIsShowPrice(true);
            setIsShowCity(true);
        }
    }, [width]);


    const showPrice = () => {
        setIsShowPrice(prev => !prev);
    };

    const showCity = () => {
        setIsShowCity(prev => !prev);
    };

    const showFilter = () => {
        setIsShowFilter(prev => !prev);
    };

    const submit = (values: typeof formik.initialValues) => {
        onSubmit({
            cityId: Number(values.city),
            startPrice: values.startPrice ? Number(values.startPrice) : undefined,
            endPrice: values.endPrice ? Number(values.endPrice) : undefined,
            hasImage: Boolean(values.hasPhoto)
        });
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            startPrice: "",
            endPrice: "",
            finishPrice: "",
            city: location.state?.cityId || "",
            hasPhoto: "",
        },
        validationSchema: null,
        onSubmit: (values) => {
            submit(values);
        },
        onReset: (values, {setFieldValue, resetForm}) => {
            setFieldValue("city", "");
            setFieldValue("hasPhoto", "");
            submit(values);
        }
    });


    return (
        <div className={css.filter}>
            <button className={css.title} onClick={showFilter}>
                Фильтры
            </button>

            <form
                className={cn(css.form, isMobile && !isShowFilter ? css.unVisiable : undefined)}
                onSubmit={formik.handleSubmit}
                noValidate
            >
                <div className={css.formBlock}>
                    <div className={css.formHeader}>
                        <ArrowIcon
                            className={!isShowPrice ? css.arrowDown : undefined}
                            onClick={showPrice}
                        />
                        <h3
                            className={css.subTitle}
                            onClick={showPrice}
                        >
                            Цена
                        </h3>
                    </div>
                    <div
                        className={
                            isShowPrice ? cn(css.formBody, css.formPriceBody) : css.unVisiable
                        }
                    >
                        <input
                            className={css.price}
                            type="number"
                            placeholder="от"
                            min={0}
                            step={100}
                            {...formik.getFieldProps("startPrice")}
                        />
                        -
                        <input
                            className={css.price}
                            type="number"
                            placeholder="до"
                            min={0}
                            step={100}
                            {...formik.getFieldProps("endPrice")}
                        />
                    </div>
                </div>
                <div className={cn(css.formBlock, css.formCheckbox)}>
                    <div className={css.formHeader}>
                        <ArrowIcon
                            className={!isShowCity ? css.arrowDown : undefined}
                            onClick={showCity}
                        />
                        <h3 className={css.subTitle} onClick={showCity}>
                            По городу
                        </h3>
                    </div>
                    <div className={isShowCity ? css.formBody : css.unVisiable}>
                        {
                            cities?.map((item, index: number) =>
                                <label key={index}>
                                    <input
                                        type="radio"
                                        id="city"
                                        {...formik.getFieldProps("city")}
                                        value={item.id}
                                        checked={Number(formik.values.city) === item.id}
                                    />
                                    {item.name}
                                </label>
                            )
                        }
                    </div>
                </div>

                <label
                    className={cn(css.onlyPhoto, css.formCheckbox)}
                >
                    <input
                        type="checkbox"
                        {...formik.getFieldProps("hasPhoto")}
                        checked={Boolean(formik.values.hasPhoto)}
                    />
                    Только с фото
                </label>
                <div>
                    <Button type="submit" className={css.sendButton}>
                        Применить
                    </Button>
                    <button
                        className={css.formReset}
                        type="button"
                        onClick={() => formik.resetForm()}
                    >
                        Сбросить все параметры
                    </button>
                </div>
            </form>
        </div>
    );
};
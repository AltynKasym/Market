import React, {useState, useEffect} from "react";
import {useFormik} from "formik";
import _ from "lodash";
import cn from "classnames";
import {AxiosError} from "axios";

import {CategoryItem, SubCategoryItem, CityItem} from "@/entities/commonEntities";
import {BreadCrumbs} from "@/features/breadCrumbs";
import {PhoneFieldList} from "@/features/phoneFieldList";
import {DTO, Api, commonEntitiesApi} from "@/shared/api";
import {useAppSelector} from "@/store";
import {Utils} from "@/shared/utils";
import {FormKit} from "@/shared/ui/formKit";
import {Alerts} from "@/shared/ui/alerts";
import {Button} from "@/shared/ui/Button";
import {BlockingLoader} from "@/shared/ui/BlockingLoader";


import * as model from "./model";
import css from "./styles.module.scss";

import {ReactComponent as PlusCircleIcon} from "@/assets/icons/plus-circle.svg";


export const PostAdvert = () => {
    const user = useAppSelector(state => state.user);
    const [images, setImages] = useState<model.ImageInfo[]>([]);
    const [phoneFieldCount, setPhoneFieldCount] = useState(1);
    const [categoryId, setCategoryId] = useState<Optional<number>>();
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);

    const {data: categories} = commonEntitiesApi.useGetCategoriesQuery();
    const {data: subCategories} = commonEntitiesApi.useGetSubCategoriesQuery(categoryId);
    const {data: cities} = commonEntitiesApi.useGetCitiesQuery();

    useEffect(() => void Utils.Window.scrollToTop(), []);


    const formik = useFormik({
        enableReinitialize: false,
        initialValues: model.getInitValues(
            user?.user_id || 0,
            categories && categories[0]?.id || 0,
            subCategories && subCategories[0]?.id || 0,
            cities && cities[0]?.id || 0
        ),
        validationSchema: model.validationSchema,
        validateOnBlur: false,
        validateOnChange: isValidateOnChange,
        validate: () => {
            setIsValidateOnChange(true);
        },
        onSubmit: async (values, {setSubmitting, setFieldError}) => {
            try {
                BlockingLoader.show();
                const data = model.createFormData(values, images);
                await Api.Advert.createAdvert(data);
                await Alerts.showSuccess("Добавлено в очередь на проверку");
                reset();
            } catch (e) {
                const err = e as AxiosError;
                const errors = err.response?.data as DTO.ServerFieldErrors;
                Object.keys(errors)
                    .forEach(key => setFieldError(key, errors[key][0]));
            } finally {
                BlockingLoader.hide();
                setSubmitting(false);
            }
        }
    });


    const reset = () => {
        formik.resetForm();
        setImages([]);
        setPhoneFieldCount(1);
        setIsValidateOnChange(false);
    };

    const onAddPhoto = (files: File[]) => {
        const mergedFiles = files
            .map(x => ({
                file: x,
                objectUrl: URL.createObjectURL(x)
            }))
            .concat(images);

        const uniqFiles = _.uniqBy(mergedFiles, x => x.file.name);
        if (images.length === uniqFiles.length)
            void Alerts.showError("Нельзя добавлять дубликаты");
        else
            setImages(uniqFiles);
    };

    const onDeletePhoto = (imgUrl: string) => {
        setImages(prev => prev.filter(x => x.objectUrl !== imgUrl));
    };

    const addPhoneField = () => {
        setPhoneFieldCount(prev => {
            formik.setFieldValue(`phones[${prev}]`, "+");
            return prev + 1;
        });
    };

    const deletePhoneField = (value: string) => {
        setPhoneFieldCount(prev => {
            const index = formik.values.phones.indexOf(value);
            const newPhones = formik.values.phones.filter((x, i) => i !== index);
            formik.setFieldValue("phones", newPhones);
            return prev - 1;
        });
    };


    return (
        <div className={css.root}>
            <div className={cn("container", css.container)}>
                <BreadCrumbs
                    location={[
                        {
                            folder: "/post-advert",
                            name: "Разместить объявление",
                        },
                    ]}
                />
                <h3 className={css.title}>
                    Выберите подкатегорию для размещения
                </h3>
                <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="category-selector">
                            Категория<span className={css.requiredSign}>*</span>
                        </label>
                        <FormKit.DropDown
                            id="category-selector"
                            items={categories || []}
                            onSelectedItem={x => {
                                setCategoryId(x?.id);
                                formik.setFieldValue("category", x?.id);
                            }}
                            ItemComponent={CategoryItem}
                            options={{
                                className: css.dropDownCategory
                            }}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="subcategory-selector">
                            Подкатегория<span className={css.requiredSign}>*</span>
                        </label>
                        <FormKit.DropDown
                            id="subcategory-selector"
                            items={subCategories || []}
                            onSelectedItem={x => formik.setFieldValue("sub_category", x?.id)}
                            ItemComponent={SubCategoryItem}
                            options={{
                                className: css.dropDownSubCategory,
                                triggerClassName: css.dropDownSubCategory
                            }}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="product-name">
                            Название товара<span className={css.requiredSign}>*</span>
                        </label>
                        <div className={css.productName}>
                            <FormKit.Input
                                className={css.input}
                                {...formik.getFieldProps("name")}
                                error={formik.errors.name}
                                id="product-name"
                                tabIndex={101}
                                autoFocus
                                placeholder="Название"
                            />
                            {
                                (!formik.errors.name) && (
                                    <p className={css.productNameHint}>
                                        Название не должно превышать 100 символов
                                    </p>
                                )
                            }
                        </div>
                    </div>
                    <div className={cn(css.field, css.priceField)}>
                        <label className={css.label} htmlFor="price1">
                            Цена<span className={css.requiredSign}>*</span>
                        </label>
                        <div className={css.priceInputs}>
                            <FormKit.Input
                                className={css.input}
                                {...formik.getFieldProps("start_price")}
                                error={formik.errors.start_price}
                                id="price1"
                                type="number"
                                mask={/^\d+$/}
                                tabIndex={102}
                                placeholder="0"
                            />
                            <span className={css.toLabel}>До</span>
                            <FormKit.Input
                                className={css.input}
                                {...formik.getFieldProps("end_price")}
                                error={formik.errors.end_price}
                                id="price2"
                                type="number"
                                mask={/^\d+$/}
                                tabIndex={103}
                                placeholder="0"

                            />
                        </div>
                    </div>
                    <div className={cn(css.field, css.messageField)}>
                        <label className={css.label} htmlFor="description">
                            Ваше сообщение<span className={css.requiredSign}>*</span>
                        </label>
                        <div className={css.textareaWrap}>
                            <FormKit.TextArea
                                className={cn(css.textarea, css.input)}
                                {...formik.getFieldProps("description")}
                                error={formik.errors.description}
                                id="description"
                                options={{
                                    maxLength: 4000,
                                    showCharCounter: true
                                }}
                                tabIndex={104}
                            />
                        </div>
                    </div>
                    <div className={cn(css.field, css.imageField)}>
                        <div className={cn(css.label, css.imageFieldLabel)}>
                            <label className={css.label} htmlFor="image-field">
                                Фотографии
                            </label>
                            <p className={css.subText}>
                                Объявления с фото получают в среднем в 3-5 раз больше откликов. Вы можете загрузить до 8
                                фотографий
                            </p>
                        </div>
                        <FormKit.ImageField
                            images={images}
                            onAdd={onAddPhoto}
                            onRemove={onDeletePhoto}
                            id="image-field"
                            tabIndex={105}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="city-selector">
                            Город<span className={css.requiredSign}>*</span>
                        </label>
                        <FormKit.DropDown
                            id="city-selector"
                            items={cities || []}
                            onSelectedItem={x => formik.setFieldValue("city", x?.id)}
                            ItemComponent={CityItem}
                            options={{
                                className: css.dropDownCity,
                                triggerClassName: css.dropDownCity
                            }}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="email">
                            Email адрес<span className={css.requiredSign}>*</span>
                        </label>
                        <div className={css.productName}>
                            <FormKit.Input
                                className={css.input}
                                {...formik.getFieldProps("email")}
                                error={formik.errors.email}
                                id="email"
                                type="email"
                                tabIndex={105}
                                placeholder="Электронная почта"
                            />
                        </div>
                    </div>
                    <div className={cn(css.field, css.phoneField)}>
                        <label className={css.label} htmlFor="phone">
                            Контактные данные<span className={css.requiredSign}>*</span>
                        </label>
                        <PhoneFieldList
                            /* @ts-ignore */
                            formik={formik}
                            addPhoneField={addPhoneField}
                            phoneFieldCount={phoneFieldCount}
                            deletePhoneField={deletePhoneField}
                            tabIndex={106}
                        />
                    </div>
                    <div className={css.field}>
                        <div className={css.label}></div>
                        <Button
                            className={css.submitButton}
                            type="submit"
                            viewType="blue"
                            Icon={<PlusCircleIcon className={css.icon}/>}
                            disabled={formik.isSubmitting}
                            tabIndex={120}
                        >
                            Опубликовать объявление
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

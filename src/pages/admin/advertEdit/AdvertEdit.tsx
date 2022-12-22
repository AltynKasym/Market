import {useFormik} from "formik";
import React, {useEffect, useState} from "react";

import {useCommonEntities} from "@/entities/commonEntities/model";
import {PhoneFieldList} from "@/features/phoneFieldList";
import {StatusItem} from "@/pages/admin/advertEdit/status";
import {FormKit} from "@/shared/ui/formKit";
import {CategoryItem} from "@/pages/admin/advertEdit/categoryItem";
import {SubCategoryItem} from "@/pages/admin/advertEdit/subCategoryItem";
import {CityItem} from "@/pages/admin/advertEdit/cityItem";
import {Button} from "@/shared/ui/Button";
import {ReactComponent as PlusCircleIcon} from "@/assets/icons/plus-circle.svg";
import {validationSchema} from "./validation";
import {commonEntitiesApi, AdminApi, DTO, Api} from "@/shared/api";
import {PromoteItem} from "./promote/index";

import {createFormData} from "@/pages/postAdvert/model";

import css from "./advert.module.scss";
import cn from "classnames";
import _ from "lodash";
import {useParams} from "react-router-dom";
import {BlockingLoader} from "@/shared/ui/BlockingLoader";
import {Alerts} from "@/shared/ui/alerts";
import {AxiosError} from "axios";
import {userModel} from "@/entities/user";


interface ImageInfo {
    file: File;
    objectUrl: string;
}

interface ImageInfo {
    file: File;
    objectUrl: string;
}


const statuses = [
    {
        value: DTO.AdvertStatus.Active,
        name: "Активный"
    },
    {
        value: DTO.AdvertStatus.Inactive,
        name: "Не активный"
    },
    {
        value: DTO.AdvertStatus.Active,
        name: "На проверке"
    }
];


export const AdvertEdit = () => {
    const params = useParams();
    const {user} = userModel.useAuth();

    const [images, setImages] = useState<ImageInfo[]>([]);
    const [isValidateOnChange, setIsValidateOnChange] = useState(false);
    const [userAdvert, setUserAdvert] = useState<DTO.DetalAdvert>();
    const [phoneFieldCount, setPhoneFieldCount] = useState(0);
    const [categoryId, setCategoryId] = useState<Optional<number>>();

    const {getCategory, getSubCategory} = useCommonEntities();

    useEffect(() => {
        if (user?.is_superuser) {
            if (params?.id) {
                AdminApi.Advert.getAdvertEdit(Number(params.id))
                    .then(el => {
                        setUserAdvert(el.data);
                        setPhoneFieldCount(el.data.advert_contact.length - 1);
                    });
            }
        } else if (params?.id) {
            Api.Advert.getAdvert(Number(params.id))
                .then(el => {
                    setUserAdvert(el.data);
                    setPhoneFieldCount(el.data.advert_contact.length - 1);
                });
        }

    }, [params]);


    const {data: promotesData} = commonEntitiesApi.useGetPromotesQuery();
    const {data: categories} = commonEntitiesApi.useGetCategoriesQuery();
    const {data: subCategories} = commonEntitiesApi.useGetSubCategoriesQuery(categoryId);
    const {data: cities} = commonEntitiesApi.useGetCitiesQuery();

    const [promotes, setPromotes] = useState<DTO.Promote[]>([]);
    useEffect(() => {
        if (promotesData) {
            setPromotes([
                {
                    id: Number.MIN_SAFE_INTEGER,
                    title: "Убрать",
                    description: "",
                    price: 0,
                    types: ""
                },
                ...promotesData
            ]);
        }
    }, [promotesData]);

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            name: userAdvert?.name,
            start_price: userAdvert?.start_price,
            end_price: userAdvert?.end_price,
            description: userAdvert?.description,
            email: userAdvert?.email,
            phones: userAdvert?.advert_contact.map(i => i.phone_number),
            owner: userAdvert?.owner.id,
            category: userAdvert?.category,
            sub_category: userAdvert?.sub_category,
            city: userAdvert?.city,
            wa_number: userAdvert?.wa_number,
            promote: userAdvert?.promote || "",
            status: userAdvert?.status,
        },
        validationSchema: validationSchema,
        validateOnBlur: false,
        validateOnChange: isValidateOnChange,

        validate: () => {

            setIsValidateOnChange(true);
        },
        onSubmit: async (values, {setSubmitting, setFieldError}) => {
            try {
                BlockingLoader.show();
                const data = createFormData(values, images);
                if (user?.is_superuser) {
                    await AdminApi.Advert.putAdvertEdit(Number(params.id), data);
                } else {
                    await Api.Advert.putAdvertEdit(Number(params.id), data);
                }
                await Alerts.showSuccess("Изменено");
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

    const onAddPhoto = (files: File[]) => {
        setImages(prev => {
            const mergedFiles = files
                .map(x => ({
                    file: x,
                    objectUrl: URL.createObjectURL(x)
                })
                )
                .concat(prev);

            return _.uniqBy(mergedFiles, x => x.file.name);
        });
    };

    const onDeletePhoto = (imgUrl: string) => {
        setImages(prev => prev.filter(x => x.objectUrl !== imgUrl));
    };


    const addPhoneField = () => {
        setPhoneFieldCount(prev => prev + 1);
    };


    const deletePhoneField = (value: string) => {
        setPhoneFieldCount(prev => {
            const index = formik.values.phones.indexOf(value);
            const newPhones = formik.values.phones.filter((x, i) => i !== index);
            formik.setFieldValue("phones", newPhones);
            return prev - 1;
        });
    };


    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);

    return (
        <div className={css.root}>
            <div className={cn("container", css.container)}>
                <h3 className={css.title}>
                    Изменить карточку пользователя
                </h3>

                <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="category-selector">
                            Категория<span className={css.requiredSign}>*</span>
                        </label>
                        <FormKit.DropDown
                            id="category-selector"
                            items={categories || []}
                            initialValue={getCategory(userAdvert?.category)}
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
                            initialValue={getSubCategory(userAdvert?.category)}
                            onSelectedItem={x => formik.setFieldValue("sub_category", x)}
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
                                id="product-name"
                                placeholder="Имя"
                                {...formik.getFieldProps("name")}
                                error={formik.errors.name}
                            />
                            {
                                !formik.errors.name && (
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
                                id="price1"
                                type="number"
                                placeholder='От'
                                {...formik.getFieldProps("start_price")}
                                error={formik.errors.start_price}
                            />
                            <span className={css.toLabel}>До</span>
                            <FormKit.Input
                                className={css.input}
                                id="price2"
                                type="number"
                                placeholder='До'
                                {...formik.getFieldProps("end_price")}
                                error={formik.errors.end_price}
                            />
                        </div>
                    </div>
                    <div className={cn(css.field, css.messageField)}>
                        <label className={css.label} htmlFor="message-input">
                            Описание
                        </label>
                        <div className={css.textareaWrap}>
                            <FormKit.TextArea
                                id="message-input"
                                placeholder="Описание"
                                className={cn(css.textarea, css.input)}
                                options={{
                                    maxLength: 4000,
                                    showCharCounter: true
                                }}
                                {...formik.getFieldProps("description")}
                            />
                        </div>
                    </div>
                    <div className={cn(css.field, css.photoField)}>
                        <div className={cn(css.label, css.photoFieldLabel)}>
                            <label className={css.label} htmlFor="">
                                Фотографии
                            </label>
                            <p className={css.subText}>
                                Объявления с фото получают в среднем в 3-5 раз больше откликов. Вы можете загрузить до 8
                                фотографий
                            </p>
                        </div>
                        <FormKit.ImageField images={images} onAdd={onAddPhoto} onRemove={onDeletePhoto}/>
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
                                className: css.dropDownSubCategory,
                                triggerClassName: css.dropDownSubCategory
                            }}
                        />
                    </div>
                    <div className={css.field}>
                        <label className={css.label} htmlFor="email">
                            Email адрес<span className={css.requiredSign}>*</span>
                        </label>
                        <div className={css.productName}>
                            <FormKit.Input
                                id="email"
                                type="email"
                                placeholder="Почта"
                                className={css.input}
                                {...formik.getFieldProps("email")}
                                error={formik.errors.email}
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
                        <label className={css.label} htmlFor="promote-selector">
                            Продвижение <span className={css.requiredSign}>*</span>
                        </label>
                        <FormKit.DropDown
                            id="promote-selector"
                            items={promotes}
                            onSelectedItem={x => formik.setFieldValue("promote", x?.types)}
                            ItemComponent={PromoteItem}
                            options={{
                                className: css.dropDownSubCategory,
                                triggerClassName: css.dropDownSubCategory
                            }}
                        />
                    </div>
                    {
                        user?.is_superuser &&
                        <div className={css.field}>
                            <label className={css.label} htmlFor="status-selector">
                                Статус <span className={css.requiredSign}>*</span>
                            </label>
                            <FormKit.DropDown
                                id="status-selector"
                                items={statuses || []}
                                onSelectedItem={x => formik.setFieldValue("status", x?.value)}
                                ItemComponent={StatusItem}
                                options={{
                                    className: css.dropDownSubCategory,
                                    triggerClassName: css.dropDownSubCategory
                                }}
                            />
                        </div>
                    }
                    <div className={css.field}>
                        <div className={css.label}></div>
                        <Button
                            className={css.submitButton}
                            type="submit"
                            disabled={formik.isSubmitting}
                            Icon={<PlusCircleIcon className={css.icon}/>}
                            viewType="blue"
                        >
                            Сохранить
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    );
};


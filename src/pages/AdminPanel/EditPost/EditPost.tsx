// import cn from "classnames";
// import _ from "lodash";
// import css from "./editPost.module.scss";
// import {Button} from "@/shared/ui/Button";
// import {ImgFileUploadButton} from "@/shared/ui/imgFileUploadButton";
// import {useParams} from "react-router-dom";

// import {FormKit} from "@/shared/ui/formKit";

// import React, {useEffect, useState} from "react";
// import {useFormik} from "formik";

// import {validationSchema} from "@/pages/postAdvert/validation";

// import {CategoryItem} from "@/pages/postAdvert/categoryItem";
// import {SubCategoryItem} from "@/pages/postAdvert/subCategoryItem";
// import {CityItem} from "@/pages/postAdvert/cityItem";
// import {PhotoThumbnail} from "@/pages/postAdvert/photoThumbnail";

// import {ReactComponent as PlusCircleIcon} from "@/assets/icons/plus-circle.svg";
// import {BreadCrumbs} from "@/features/breadCrumbs";
// import {advertApi} from "@/shared/api";


// interface ImageInfo {
//     file: File;
//     objectUrl: string;
// }

// interface ImageInfo {
//     file: File;
//     objectUrl: string;
// }


// export const EditPost = () => {
//     const [images, setImages] = useState<ImageInfo[]>([]);
//     const [additionalPhonesCount, setAdditionalPhonesCount] = useState(0);
//     const productId = useParams().id;


    


//     // const {data: categories} = categoriesApi.useGetCategoriesQuery();
//     // const {data: subCategories} = subCategoriesApi.useGetSubCategoriesApiQuery();
//     // const {data: cities} = cityApi.useGetCityQuery();
//     const {data: advertsData} = advertApi.useGetAdvertsQuery();

//     let currentData={};

//     advertsData?.results.map(item => {
//         if (item.id===+productId) {
//             currentData=item;
//         };
//     });
    
//     console.log(currentData);
    


//     const formik = useFormik({
//         initialValues: {
//             name: currentData.name,
//             price1: 0,
//             price2: 0,
//             message: "",
//             email: "",
//             phones: [],
//             category: categories && categories[0]?.id,
//             sub_category: subCategories && subCategories[0]?.id,
//             city: cities && cities[0]?.id,
//         },
//         validationSchema: validationSchema,
//         validateOnBlur: false,
//         validateOnChange: false,
//         onSubmit: async () => {
//         }
//     });


//     const onAddPhoto = (files: File[]) => {
//         setImages(prev => {
//             const mergedFiles = files
//                 .map(x => ({
//                     file: x,
//                     objectUrl: URL.createObjectURL(x)
//                 })
//                 )
//                 .concat(prev);

//             return _.uniqBy(mergedFiles, x => x.file.name);
//         });
//     };


//     const addPhoneField = () => {
//         setAdditionalPhonesCount(prev => prev + 1);
//     };

//     useEffect(() => {
//         window.scrollTo({
//             top: 0,
//             left: 0,
//             behavior: "smooth"
//         });
//     }, []);
//     return (
//         <div className={css.root}>
//             <div className={cn("container", css.container)}>
//                 <BreadCrumbs
//                     location={[
//                         {
//                             folder: "/edit",
//                             name: "Редактировать объявление",
//                         },
//                     ]}
//                 />
//                 <h3 className={css.title}>
//                     Выберите подкатегорию для размещения
//                 </h3>
//                 <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
//                     <div className={css.field}>
//                         <label className={css.label} htmlFor="category-selector">
//                             Категория<span className={css.requiredSign}>*</span>
//                         </label>
//                         <FormKit.DropDown
//                             id="category-selector"
//                             items={categories || []}
//                             onSelectedItem={x => formik.setFieldValue("category", x)}
//                             ItemComponent={CategoryItem}
//                             options={{
//                                 className: css.dropDownCategory
//                             }}
//                         />
//                     </div>
//                     <div className={css.field}>
//                         <label className={css.label} htmlFor="subcategory-selector">
//                             Подкатегория<span className={css.requiredSign}>*</span>
//                         </label>
//                         <FormKit.DropDown
//                             id="subcategory-selector"
//                             items={subCategories || []}
//                             onSelectedItem={x => formik.setFieldValue("subcategory", x)}
//                             ItemComponent={SubCategoryItem}
//                             options={{
//                                 className: css.dropDownSubCategory,
//                                 triggerClassName: css.dropDownSubCategory
//                             }}
//                         />
//                     </div>
//                     <div className={css.field}>
//                         <label className={css.label} htmlFor="product-name">
//                             Название товара<span className={css.requiredSign}>*</span>
//                         </label>
//                         <div className={css.productName}>
//                             <FormKit.Input
//                                 className={css.input}
//                                 id="product-name"
//                                 placeholder="Название"
//                                 {...formik.getFieldProps("name")}
//                                 error={formik.errors.name}
//                                 value={name}
//                             />
//                             {
//                                 !formik.errors.name && (
//                                     <p className={css.productNameHint}>
//                                         Название не должно превышать 100 символов
//                                     </p>
//                                 )
//                             }
//                         </div>
//                     </div>
//                     <div className={cn(css.field, css.priceField)}>
//                         <label className={css.label} htmlFor="price1">
//                             Цена<span className={css.requiredSign}>*</span>
//                         </label>
//                         <div className={css.priceInputs}>
//                             <FormKit.Input
//                                 className={css.input}
//                                 id="price1"
//                                 type="number"
//                                 placeholder="0"
//                                 {...formik.getFieldProps("price1")}
//                                 error={formik.errors.price1}
//                             />
//                             <span className={css.toLabel}>До</span>
//                             <FormKit.Input
//                                 className={css.input}
//                                 id="price2"
//                                 type="number"
//                                 placeholder="0"
//                                 {...formik.getFieldProps("price2")}
//                                 error={formik.errors.price2}
//                             />
//                         </div>
//                     </div>
//                     <div className={cn(css.field, css.messageField)}>
//                         <label className={css.label} htmlFor="message-input">
//                             Ваше сообщение
//                         </label>
//                         <div className={css.textareaWrap}>
//                             <FormKit.TextArea
//                                 id="message-input"
//                                 className={cn(css.textarea, css.input)}
//                                 options={{
//                                     maxLength: 4000,
//                                     showCharCounter: true
//                                 }}
//                                 {...formik.getFieldProps("message")}
//                             />
//                         </div>
//                     </div>
//                     <div className={cn(css.field, css.photoField)}>
//                         <div className={cn(css.label, css.photoFieldLabel)}>
//                             <label className={css.label} htmlFor="">
//                                 Фотографии
//                             </label>
//                             <p className={css.subText}>
//                                 Объявления с фото получают в среднем в 3-5 раз больше откликов. Вы можете загрузить до 8
//                                 фотографий
//                             </p>
//                         </div>
//                         <div className={css.photos}>
//                             {
//                                 images.map((imgInfo, i) =>
//                                     <PhotoThumbnail
//                                         key={imgInfo.objectUrl}
//                                         imgUrl={imgInfo.objectUrl}
//                                         onDelete={() => setImages(prev => prev.filter(x => x.objectUrl !== imgInfo.objectUrl))}
//                                     />
//                                 )
//                             }
//                             <ImgFileUploadButton handleFiles={onAddPhoto}/>
//                         </div>
//                     </div>
//                     <div className={css.field}>
//                         <label className={css.label} htmlFor="city-selector">
//                             Город<span className={css.requiredSign}>*</span>
//                         </label>
//                         <FormKit.DropDown
//                             id="city-selector"
//                             items={cities || []}
//                             onSelectedItem={x => formik.setFieldValue("city", x)}
//                             ItemComponent={CityItem}
//                             options={{
//                                 className: css.dropDownSubCategory,
//                                 triggerClassName: css.dropDownSubCategory
//                             }}
//                         />
//                     </div>
//                     <div className={css.field}>
//                         <label className={css.label} htmlFor="email">
//                             Email адрес<span className={css.requiredSign}>*</span>
//                         </label>
//                         <div className={css.productName}>
//                             <FormKit.Input
//                                 id="email"
//                                 type="email"
//                                 placeholder="Электронная почта"
//                                 className={css.input}
//                                 {...formik.getFieldProps("email")}
//                                 error={formik.errors.email}
//                             />
//                         </div>
//                     </div>
//                     <div className={cn(css.field, css.phoneField)}>
//                         <label className={css.label} htmlFor="phone">
//                             Контактные данные<span className={css.requiredSign}>*</span>
//                         </label>
//                         <div className={css.phoneInputList}>
//                             <FormKit.PhoneInput
//                                 className={css.phoneInput}
//                                 {...formik.getFieldProps("phones[0]")}
//                             />
//                             <button className={css.addButton} type="button" onClick={addPhoneField}>
//                                 + еще телефон
//                             </button>
//                             {
//                                 _.range(additionalPhonesCount)
//                                     .map((x, i) => (
//                                         <FormKit.PhoneInput
//                                             key={i}
//                                             className={css.phoneInput}
//                                             {...formik.getFieldProps(`phones[${i + 1}]`)}
//                                         />
//                                     ))
//                             }
//                             <FormKit.PhoneInput className={css.phoneInput} type="whatsapp"/>
//                         </div>
//                     </div>
//                     <div className={css.field}>
//                         <div className={css.label}></div>
//                         <Button
//                             className={css.submitButton}
//                             type="submit"
//                             Icon={<PlusCircleIcon className={css.icon}/>}
//                             viewType="blue"
//                         >
//                             Опубликовать объявление
//                         </Button>
//                     </div>
//                 </form>
//             </div>
//         </div>
//     );
// };





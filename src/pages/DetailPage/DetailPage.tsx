import {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import cn from "classnames";

import {userModel} from "@/entities/user";
import {advertModel} from "@/entities/advert";
import {BreadCrumbs} from "@/features/breadCrumbs";
import {DTO, Api, ApiUtil} from "@/shared/api";
import {Spinner} from "@/shared/ui/spinner";

import {DetailDescription} from "./DetailDescription/DetailDescription";
import {DetailContact} from "./DetailContact/DetailContact";
import {SimilarAdvert} from "@/pages/DetailPage/SimilarAdvert/SimilarAdvert";
import css from "./styles.module.scss";

import favorite from "@/assets/icons/card/favorite.svg";
import inFavorite from "@/assets/icons/card/favorite-white.svg";


export const DetailPage = () => {
    const productId = useParams().id;
    const [productData, setProductData] = useState<DTO.ProductData>();
    const [isLoad, setIsLoad] = useState<boolean>(true);
    const [isMyAdvert, setIsMyAdvert] = useState(false);
    const {user} = userModel.useAuth();
    const navigate = useNavigate();

    const [isFavorite, setIsFavorite] = useState(false);
    const [toggleFavorite] = advertModel.advertApi.useSetFavoriteMutation();

    useEffect(() => {
        Api.Advert.getAdvert(Number(productId))
            .then((el) => {
                setProductData(el.data);
                setIsLoad(false);
                setIsMyAdvert(el.data.owner.id === user?.user_id);
            })
            .catch(() => {
                navigate("/404", {replace: true});
            });
        window.scrollTo({top: 0, behavior: "smooth"});
    }, [productId]);



    useEffect(() => {
        if (productData) {
            Api.Advert.getFavoriteIds()
                .then(response => {
                    const advertIsFavorite = response.data?.adverts
                        .some(x => x === productData.id);
                    setIsFavorite(advertIsFavorite);
                });
        }
    }, [productData]);

    if (isLoad)
        return <Spinner/>;


    const favoriteToggle = async () => {
        if (!user)
            return navigate("/auth/login"); // TODO: редирект
        try {
            if (productData) {
                setIsFavorite(!isFavorite);
                await toggleFavorite({advertId: productData.id, isFavorite: !isFavorite})
                    .unwrap();
            }
        } catch {
            ApiUtil.dropAuthAndRedirect();
        }
    };


    return (
        <div className={cn(css.root)}>
            {productData && <div className={cn("container")}>
                <BreadCrumbs
                    location={[
                        {
                            folder: "/category/{id}",
                            name: productData?.name || "",
                        },
                    ]}
                />
                <div
                    className={css.favoriteBlock}
                >
                    <p className={css.title}>{productData.name}</p>
                    <div className={css.favorite} onClick={favoriteToggle}>
                        <img src={isFavorite ? favorite : inFavorite} alt="favorite" className={css.favoriteImg}/>
                        <p className={css.favoriteText}>Добавить в избранное</p>
                    </div>
                </div>
                <div className={css.wrapper}>
                    <DetailDescription data={productData} isMyAdvert={isMyAdvert}/>
                    {!isMyAdvert &&
                        <DetailContact price={productData.start_price}
                            id={productData.id} owner={productData.owner}
                            advert_contact={productData.advert_contact}
                            wa_number={productData.wa_number}/>}
                </div>

                {productData?.sub_category !== 0 &&
                    <SimilarAdvert id={productData.id} subcategory={productData.sub_category}/>}
            </div>}
        </div>
    );
};
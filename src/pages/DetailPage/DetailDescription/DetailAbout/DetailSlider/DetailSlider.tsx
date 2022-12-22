import {useEffect, useState} from "react";
import {Swiper, SwiperSlide} from "swiper/react";
import {FreeMode, Navigation, Thumbs} from "swiper";
import SwiperClass from "swiper/types/swiper-class";

import "./style.scss";

import zoomImg from "@/assets/icons/detail/zoom.svg";
import defaultImg from "@/assets/images/detail/imgError.jpg";
import cn from "classnames";


interface imageType {
    image:string;
}
interface Props {
    imgArray: imageType[];
    price:number;
}

export const DetailSlider = ({imgArray, price}: Props) => {
    const [thumbsSwiper, setThumbsSwiper] = useState<SwiperClass>();
    const [fullImg, setFullImg] = useState("");
    const [isMore, setIsMore] = useState(false);

    const showFullImg = (img:string) => {
        setFullImg(img);
    };

    useEffect(() => {
        const isMore = imgArray.length === 1;
        setIsMore(isMore);
    }, [imgArray]);

    return (
        <div className={"swiperWrap"}>
            <div className="swiper-price">{price} ₸</div>
            <Swiper modules={[FreeMode, Thumbs, Navigation]}
                thumbs={{
                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                }}
                navigation={true}
                slidesPerView={"auto"}
                spaceBetween={10}
                className={cn("swiper-top", `${isMore ? "swiper-one" : ""}`)}
            >
                {imgArray.map((el, index) => {
                    return <SwiperSlide key={`slide-${index}`}>
                        <div className="swiper-slide-cont">
                            <div className='zoom' onClick={() => showFullImg(el.image)}>
                                <img src={zoomImg} alt="er"/>
                            </div>
                            <img src={el.image} alt="error"  onError={(e:React.SyntheticEvent<HTMLImageElement, Event> &
                                {target :HTMLImageElement}) => {
                                e.target.onerror = null;
                                e.target.src = defaultImg;
                            }}/>
                        </div>
                    </SwiperSlide>;
                })}
                {imgArray.length === 0 &&
                <SwiperSlide >
                    <div className='swiper-slide-cont'>
                        <img src={defaultImg} alt="default"/>
                    </div>
                </SwiperSlide>
                }
            </Swiper>


            <Swiper
                onSwiper={setThumbsSwiper}
                modules={[Thumbs, Navigation, FreeMode]}
                freeMode={true}
                watchSlidesProgress={true}
                slidesPerView={"auto"}
                className='bottom-swiper'>
                {imgArray.map((el, index) => {
                    return <SwiperSlide key={`slide-bottom-${index}`}>
                        <div className="swiper-slide-cont">
                            <img src={el.image}
                                onError={((e:React.SyntheticEvent<HTMLImageElement, Event> &{target :HTMLImageElement}) => {
                                    e.target.onerror = null;
                                    e.target.src = defaultImg;
                                })}
                                alt="error"/>
                        </div>
                    </SwiperSlide>;
                })}
            </Swiper>
            {fullImg.length > 1 &&  <div className={"fullImg"} onClick={() => setFullImg("")}>
                <img src={fullImg} alt="er"/>
            </div>}
        </div>
    );
};
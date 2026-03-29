"use client";
import { useState, useEffect, useCallback } from "react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";

import { BaseUrl, fetchCertefiesService } from "@/service";
import { ISertefiesResponse } from "@/interfaces/Enitys";

import "./style.scss";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";


const mock = process.env.NEXT_PUBLIC_REACT_APP_MOCK_ENV;

const Sertefies = () => {
    const [sertefies, setSertefies] = useState([]);
    

    const fetchCertefies = useCallback(
        async () => {
            try {
                const data = await fetchCertefiesService();

                setSertefies(data);
            } catch (error) {
                console.log(error);
            }
        }, []
    );

    useEffect(
        () => {
            fetchCertefies();
        }, []
    );


    return (
        <section className="sertefies" id="sertefies">
            <div className="sertefies-content">
                <h1 className="sertefies-header"><span className="hesteg" /> Мои сертификаты</h1>
                
                <div className="sertefies-content">

                <Swiper
                    spaceBetween={30}
                    centeredSlides={true}
                    autoplay={{
                        delay: 2500,
                        disableOnInteraction: false,
                    }}
                    pagination={{
                        clickable: true,
                    }}
                    navigation={true}
                    modules={[Autoplay, Pagination, Navigation]}
                    className="sertefies_swapper"
                >
                    {
                            sertefies.length && (
                                sertefies.map(
                                    ( i: ISertefiesResponse, index: number ) => (
                                        <SwiperSlide key={index} className="swiper-slide">
                                            <a href={i.site ? i.site : (mock ? i.site : `${BaseUrl}/${i.photo}`)}>
                                                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9' }}>
                                                    <Image
                                                        src={mock ? i.photo : `${BaseUrl}/${i.photo}`} 
                                                        alt={`Сертификат ${index + 1}`}
                                                        fill
                                                        sizes="(max-width: 768px) 100vw, 50vw"
                                                        style={{ objectFit: 'contain' }} // Или 'cover', чтобы заполнить всё пространство
                                                        priority={index < 2} // Оптимизация загрузки первых слайдов
                                                    />
                                                </div>
                                            </a>
                                        </SwiperSlide>
                                    )
                                )
                            )
                        }
                </Swiper>
                </div>
            </div>
        </section>
    )
}


export default Sertefies;
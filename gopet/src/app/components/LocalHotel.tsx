'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import styles from './LocalHotel.module.css';

interface Slide {
    id: number,
    image: string,
    title: string
}
const slideData: Slide[] = [
    { id: 1, image: '/picture_images/localhotel/seoul2.jpg', title: '서 울'},
    { id: 2, image: '/picture_images/localhotel/suwon.jpg', title: '경 기'},
    { id: 3, image: '/picture_images/localhotel/incheon.jpg', title: '인 천'},
    { id: 4, image: '/picture_images/localhotel/kangwondo2.webp', title: '강원도'},
    { id: 5, image: '/picture_images/localhotel/chung.jpg', title: '충청도'},
    { id: 6, image: '/picture_images/localhotel/jeonju2.png', title: '전 주'},
    { id: 7, image: '/picture_images/localhotel/keongju2.jpeg', title: '경 주'},
    { id: 8, image: '/picture_images/localhotel/pusan2.jpeg', title: '부 산'},
    { id: 9, image: '/picture_images/localhotel/jeju.jpg', title: '제 주'},
];

export default function SwiperCarousel() {
    return (
        <div className='w-full'>
            <h1 className="text-3xl mt-10">지역별 숙박</h1>
            <Swiper modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={10}
                slidesPerView={1}
                navigation={true}
                pagination={{ clickable: true}}
                autoplay={{ delay: 6000, disableOnInteraction: false}}
                loop={true}
                className='my-swiper'
            >
                {slideData.map((slide) => (
                    <SwiperSlide key={slide.id}>
                        <div className="grid grid-cols-4 overfloew-hidden p-5 m-5">
                            <div className="flex flex-col items-center justify-center w-[300px] h-[400px] bg-cover bg-center relative rounded-3xl opacity-90"
                                style={{ backgroundImage: `url(${slide.image})` }}>
                                <p className="text-white text-6xl font-bold z-10 ">
                                    {slide.title}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center w-[300px] h-[400px] bg-cover bg-center relative rounded-3xl opacity-90"
                                style={{ backgroundImage: `url(${slide.image})` }}>
                                <p className="text-white text-6xl font-bold z-10 ">
                                    {slide.title}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center w-[300px] h-[400px] bg-cover bg-center relative rounded-3xl opacity-90"
                                style={{ backgroundImage: `url(${slide.image})` }}>
                                <p className="text-white text-6xl font-bold z-10 ">
                                    {slide.title}
                                </p>
                            </div>
                            <div className="flex flex-col items-center justify-center w-[300px] h-[400px] bg-cover bg-center relative rounded-3xl opacity-90"
                                style={{ backgroundImage: `url(${slide.image})` }}>
                                <p className="text-white text-6xl font-bold z-10 ">
                                    {slide.title}
                                </p>
                            </div>
                        </div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    )
}


import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Pagination, Navigation } from "swiper/modules";

interface Slide {
  id: number;
  image: string;
  title: string;
}

const slideData: Slide[] = [
  { id: 1, image: "/picture_images/noimage.png", title: "1" },
  { id: 2, image: "/picture_images/noimage.png", title: "2" },
  { id: 3, image: "/picture_images/noimage.png", title: "3" },
  { id: 4, image: "/picture_images/noimage.png", title: "4" },
  { id: 5, image: "/picture_images/noimage.png", title: "5" },
];

const SlideImageComponent = () => {
  return (
    <>
      <Swiper
        dir="rtl"
        modules={[Pagination, Navigation]}
        loop={true}
        slidesPerView={1.3}
        centeredSlides={false}
        slidesPerGroup={1}
        initialSlide={0}
        spaceBetween={0}
        style={{ width: "400px" }}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {slideData.map((slide) => (
          <SwiperSlide key={slide.id} className="rounded-lg overflow-hidden">
            <div className="flex justify-between">
              <p
                className="rounded-2xl overflow-hidden"
                style={{
                  width: "100%",
                  height: "280px",
                  backgroundImage: `url(${slide.image})`,
                  backgroundSize: "contain",
                  backgroundRepeat: "no-repeat",
                  backgroundPosition: "center",
                }}
              ></p>
            </div>
          </SwiperSlide>
        ))}
        <button
          className="swiper-button-next absolute right-0 top-1/2 z-10 transform -translate-y-1/2"
          style={{ color: "white" }}
        ></button>
      </Swiper>
    </>
  );
};

export default SlideImageComponent;

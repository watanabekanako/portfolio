import { Navigation, Pagination, Scrollbar, A11y } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
<img src="http://placehold.jp/700x400.png?text=1" alt="" />;
import { Autoplay, Swiper as RealSwiper } from "swiper";
RealSwiper.use([Autoplay]);
const Slider = () => {
  return (
    <Swiper
      // install Swiper modules
      modules={[Navigation, Pagination, Scrollbar, A11y]}
      spaceBetween={50}
      slidesPerView={1}
      loop={true}
      // navigation
      pagination={{ clickable: true }}
      // scrollbar={{ draggable: true }}
      onSwiper={(swiper) => console.log(swiper)}
      onSlideChange={() => console.log("slide change")}
      autoplay={{
        delay: 2500,
        disableOnInteraction: false,
      }}
    >
      <SwiperSlide>
        <img src="./img1.jpg" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="http://placehold.jp/700x400.png?text=1" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="http://placehold.jp/700x400.png?text=1" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;

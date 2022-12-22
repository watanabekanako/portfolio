import { Swiper, SwiperSlide } from "swiper/react"; //カルーセル用のタグをインポート
import SwiperCore, { Pagination, Autoplay, EffectFade } from "swiper"; //使いたい機能をインポート

const images = [
  "http://placehold.jp/700x400.png?text=1",
  "http://placehold.jp/700x400.png?text=1",
  "http://placehold.jp/700x400.png?text=1",
];
const Slider = () => {
  return (
    <Swiper
      slidesPerView={1}
      pagination={{
        clickable: true,
        // bulletClass: `swiper-pagination-bullet ${s.custom_bullet}`, //非アクティブなアイコンのクラスを指定
        // bulletActiveClass: `swiper-pagination-bullet-active ${s.custom_bullet_active}`, //アクティブなアイコンのクラスを指定
      }}
      autoplay={{ delay: 1000, disableOnInteraction: true }}
      speed={2000}
      effect="fade"
      fadeEffect={{ crossFade: true }}
      loop={true}
    >
      <SwiperSlide>
        <img src="http://placehold.jp/700x400.png?text=1" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="http://placehold.jp/700x400.png?text=2" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="http://placehold.jp/700x400.png?text=3" alt="" />
      </SwiperSlide>
      <SwiperSlide>
        <img src="http://placehold.jp/700x400.png?text=4" alt="" />
      </SwiperSlide>
    </Swiper>
  );
};

export default Slider;

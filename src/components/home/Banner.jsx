import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import { Autoplay, Pagination } from "swiper/modules";
import { useNavigate } from "react-router-dom";

export default function Banner() {
  const navigate = useNavigate();

  return (
    <div className="bg-background dark:bg-dark-background">
      <div className=" h-[90vh] md:h-[600px] lg:h-screen ">
        <Swiper
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          loop={true}
          pagination={true}
          modules={[Pagination, Autoplay]}
          className="mySwiper h-full"
        >
          <SwiperSlide>
            <div className=" px-12 flex flex-col items-center justify-center slider-1 h-full ">
              <h2 className="font-ReemKufi text-[30px] md:text-[50px] text-white md:leading-[60px] font-medium text-center">
                Empower Your Mind & Body <br className="hidden md:block" /> —
                From Home{" "}
              </h2>
              <p className="text-base md:text-lg mt-5 text-white text-center md:text-left">
                Get beauty treatments, grooming, and personalized educational
                support — anytime, anywhere..
              </p>
              <button
                onClick={() => navigate("/services")}
                className="py-2 px-4 rounded bg-blue-600 mt-3 text-white"
              >
                View all Services
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" px-12 flex flex-col items-center justify-center slider-2 h-full bg-cover md:bg-contain">
              <h2 className="font-ReemKufi text-[30px] md:text-[50px] text-white md:leading-[60px] font-medium text-center">
                Skilled Experts at Your
                <br className="hidden md:block" /> Doorstep{" "}
              </h2>
              <p className="text-base md:text-lg mt-5 text-white text-center md:text-left">
                Get trusted home repairs, electronics fixing, and daily service
                solutions — all in one place.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="py-2 px-4 rounded bg-blue-600 mt-3 text-white"
              >
                View all Services
              </button>
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className=" px-12 flex flex-col items-center justify-center slider-3 h-full">
              <h2 className="font-ReemKufi text-[30px] md:text-[50px] text-white md:leading-[60px] font-medium text-center">
                Talk to Trusted Experts <br className="hidden md:block" />{" "}
                Anytime{" "}
              </h2>
              <p className="text-base md:text-lg mt-5 text-white text-center md:text-left">
                Connect with doctors, consultants, and advisors — get reliable
                help right from your phone.
              </p>
              <button
                onClick={() => navigate("/services")}
                className="py-2 px-4 rounded bg-blue-600 mt-3 text-white"
              >
                View all Services
              </button>
            </div>
          </SwiperSlide>
        </Swiper>
      </div>
    </div>
  );
}

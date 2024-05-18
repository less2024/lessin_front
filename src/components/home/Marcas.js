import Image from 'next/image';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import { faker } from '@faker-js/faker';

const HomeMarcas = ({data}) => {

    const swiperItems= data.map((item,index)=>{
        return (
            <SwiperSlide key={faker.string.uuid()}>
                <div className="marcasItem">
                    <Image src={item.marcas_limg} alt={'Marcar #'+index} title={'Marcar #'+index}  width={50} height={50}  />
                </div>
            </SwiperSlide>
        )
    })
    
    const marcasParams = {
        spaceBetween:15,
        slidesPerView:5,
        pagination:{
            type: 'fraction'
        },
        autoplay:{
          delay: 4000,
          disableOnInteraction: false,
        },
        modules:[Autoplay,Pagination,Navigation],
        breakpoints: {
            0: {
                slidesPerView: 3,
                spaceBetween:15,
            },
            768: {
                slidesPerView: 5,
            },
            1024: {
                slidesPerView: 5,
            },
            1300: {
                slidesPerView: 5,
            },
            4300: {
                slidesPerView: 5,
            },
        },
    };

    
    if(data.length > 0){
        return (
            <>
                <Swiper {...marcasParams} >
                    {swiperItems}
                </Swiper>

            </>
        )
    }
};

export default HomeMarcas;
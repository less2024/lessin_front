// Css
import '../../assets/css/components/dashboard/SwiperCourses2.scss';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination,Navigation } from 'swiper/modules';
import { useState } from 'react';
import { faker } from '@faker-js/faker';
import CardCourse3 from '../card/Course3';
import ModalMentoria from '../card/ModalMentoria';

const DashSwiperCourses2 = ({data}) => {

    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [dataModal,setDataModal] = useState(null);

    const swiperItems = data.map((item,index)=>{
        return (
            <SwiperSlide key={faker.string.uuid()}>
                <CardCourse3 key={faker.string.uuid()} data={item}  modal={setOpen}  returnData={setDataModal} />
            </SwiperSlide>
        )
    })
    
    const marcasParams = {
        spaceBetween:20,
        slidesPerView:3,
        pagination:{
            type: 'fraction',
        },
        navigation:true,
        modules:[Pagination, Navigation],
        breakpoints:{
            0: {
            slidesPerView: 1,
            spaceBetween:15,
            centeredSlides:true
            },
            768: {
            slidesPerView: 2,
            },
            1024: {
            slidesPerView: 3,
            },
            1300: {
            slidesPerView: 3,
            },
            4300: {
            slidesPerView: 3,
            },
        }
        
    };
      
    return (
        <div className="inlineBlock lfbList">
            <Swiper {...marcasParams} >
                {data.length > 0 &&  swiperItems }
            </Swiper>
            <ModalMentoria data={dataModal} modal={open} modalClose={handleClose} />
        </div>
    )
};

export default DashSwiperCourses2;
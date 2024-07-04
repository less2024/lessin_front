// Css
import '../../assets/css/components/dashboard/SwiperCourses.scss';



// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination,Navigation } from 'swiper/modules';
import CardCourse2 from '../card/Course';
import { useEffect,useState,useContext } from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import ModalCourse from '../card/ModalCourse';

// Context 
import { userLessing } from "../../context/user";

const DashSwiperCourses = ({data,dashboard}) => {

    const [catList,setCatList] = useState(null);
    const { categoriesUniv } = useContext(userLessing);
    
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [dataModal,setDataModal] = useState(null);

    useEffect(()=>{
        setCatList(categoriesUniv);
    },[])

    const swiperItems = data.map((item,index)=>{
        return (
            <SwiperSlide key={faker.string.uuid()}>
                <CardCourse2 key={faker.string.uuid()} modal={setOpen} data={item} returnData={setDataModal} categories={catList ? catList : null} />
            </SwiperSlide>
        )
    })
    
    const marcasParams = {
        spaceBetween:30,
        slidesPerView:4,
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
                slidesPerView: 4,
            },
            4300: {
                slidesPerView: 4,
            },
        }
        
    };
      
    return (
        <div className="inlineBlock cursosSwiperDash">
            <Swiper {...marcasParams} >
                {data.length > 0 &&  swiperItems }
            </Swiper>
            <ModalCourse data={dataModal} modal={open} modalClose={handleClose}  categories={catList ? catList : null} dashboard={dashboard} />
        </div>
    )
};

export default DashSwiperCourses;
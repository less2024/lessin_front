// Css
import '../../assets/css/components/home/CourseList.scss'

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';
import CardCourse from '../card/Course';
import { useEffect,useState } from 'react';
import axios from 'axios';
import { faker } from '@faker-js/faker';
import ModalCourse from '../card/ModalCourse';

const HomeCoursesList = ({data}) => {

    const [catList,setCatList] = useState(null);
    
    const [open, setOpen] = useState(false);
    const handleClose = () => setOpen(false);

    const [dataModal,setDataModal] = useState(null);

    // Categorias
    const getCategories = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/categoria')
            .then((resp)=>{
                setCatList(resp.data)
            })
    }

    useEffect(()=>{
        getCategories();
    },[])

    const swiperItems = data.map((item,index)=>{
        return (
            <SwiperSlide key={faker.string.uuid()}>
                <CardCourse key={faker.string.uuid()} modal={setOpen} data={item} returnData={setDataModal} categories={catList ? catList : null} />
            </SwiperSlide>
        )
    })
    
    const marcasParams = {
        spaceBetween:15,
        slidesPerView:3,
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
        },
        
    };
      
    return (
        <div className="cursosSwiperBox">
            <Swiper {...marcasParams} >
                {data.length > 0 &&  swiperItems }
            </Swiper>
            
            <ModalCourse data={dataModal} modal={open} modalClose={handleClose}  categories={catList ? catList : null} />
        </div>
    )
};

export default HomeCoursesList;

import Image from 'next/image';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Autoplay,Pagination,Navigation } from 'swiper/modules';

import lessing1 from '../../assets/img/lessin_img1.png';
import icoLessingCheck from '../../assets/img/ico_lessing_check.png';
import logoLessing from '../../assets/img/lessing.png';

import { faker } from '@faker-js/faker';


const HomeBusiness = ({data}) => {

    

    const businessSwiper = {
        autoplay:{
            delay: 8000,
            disableOnInteraction: false
        },
        pagination:{
            type: 'progressbar',
        },
        navigation:false,
        modules:[Autoplay,Pagination],
        
    };

    return (
        <Swiper

            className="mySwiper"
            {...businessSwiper}
        >
            {data.map((item,index)=>{
                if(index === 0 ){
                    return (
                        <SwiperSlide  key={faker.string.uuid()}>
                            <div className="inlineBlock lessingItem">
                                <div className="inlineBlock lessingAnim1">
                                    <figure>
                                        <Image src={lessing1} priority={true} className='circleDoted' width={100} height={100} alt="Circle" title="circle" />
                                        <div className="lessing">
                                            <Image src={logoLessing} width={50} height={50} alt="Business Logo" title="Business Logo"  />
                                            <p>aprende, <br />mejora</p>
                                        </div>
                                        <div className="notesList">
                                            <div className="noteItem noteItem1">
                                                <Image src={icoLessingCheck} width={50} height={50} alt="Data y KPI’s" title="Data y KPI’s" />
                                                <h5>Data y KPI’s</h5>
                                                <p>Conoce los insights de tus clientes</p>
                                            </div>
                                            <div className="noteItem noteItem2">
                                                <Image src={icoLessingCheck} width={50} height={50} alt="Tutorías" title="Tutorías" />
                                                <h5>Tutorías</h5>
                                                <p>Tutoriales personalizados</p>
                                            </div>
                                            <div className="noteItem noteItem3">
                                                <Image src={icoLessingCheck} width={50} height={50} alt="Soporte 24/7" title="Soporte 24/7" />
                                                <h5>Soporte 24/7</h5>
                                                <p>Atención todo el día al estudiante</p>
                                            </div>
                                            <div className="noteItem noteItem4">
                                                <Image src={icoLessingCheck} width={50} height={50} alt="Oferta laboral" title="Oferta laboral" />
                                                <h5>Oferta laboral</h5>
                                                <p>Acceso a mercados de ofertas laborales</p>
                                            </div>
                                            <div className="noteItem noteItem5">
                                                <Image src={icoLessingCheck} width={50} height={50} alt="Comunidad" title="Comunidad" />
                                                <h5>Comunidad</h5>
                                                <p>Comunidad de estudiantes conectados con los docentes</p>
                                            </div>
                                        </div>
                                    </figure>
                                </div>
            
                                <div className="lessingNote">
                                    <h4>{item.bussines_lsubtitulo}</h4>
                                    <h3><div dangerouslySetInnerHTML={{__html:item.bussines_ltitulo}}></div></h3>
                                    <p><div dangerouslySetInnerHTML={{__html:item.bussines_ltxt}}></div></p>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }else if(index === 1){
                    return (
                        <SwiperSlide key={faker.string.uuid()}>
                            <div className="inlineBlock lessingItem">
                                <div className="lessingAnim2">
                                    <div className="lessingAnimTxt">
                                        <h4>{item.bussines_lsubtitulo}</h4>
                                        <h3><div dangerouslySetInnerHTML={{__html:item.bussines_ltitulo}}></div></h3>
                                        <p><div dangerouslySetInnerHTML={{__html:item.bussines_ltxt}}></div></p>
                                    </div>
                                    <figure className="introImg">
                                        {false &&
                                            <>
                                                <div className="det det1"></div>
                                                <div className="det det2"></div>
                                                <div className="det det3"></div>
                                            </>
                                        }
                                        <Image src={item.bussines_limg === '' ? bussines_limg : item.bussines_limg} width={50} height={50} alt="cover" title="cover" />
                                    </figure>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }else if(index===2){
                    return (
                        <SwiperSlide key={faker.string.uuid()}>
                            <div className="inlineBlock lessingItem">
                                <div className="lessingAnim3">
                                    <figure className="introImg">
                                        <Image src={item.bussines_limg === '' ? bussines_limg : item.bussines_limg} width={50} height={50} alt="cover" title="cover" />
                                    </figure>
                                    <div className="lessingAnimTxt">
                                        <h4>{item.bussines_lsubtitulo}</h4>
                                        <h3><div dangerouslySetInnerHTML={{__html:item.bussines_ltitulo}}></div></h3>
                                        <p><div dangerouslySetInnerHTML={{__html:item.bussines_ltxt}}></div></p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }else if(index===3){
                    return (
                        <SwiperSlide key={faker.string.uuid()}>
                            <div className="inlineBlock lessingItem">
                                <div className="lessingAnim3">

                                    <div className="lessingAnimTxt">
                                        <h4>{item.bussines_lsubtitulo}</h4>
                                        <h3><div dangerouslySetInnerHTML={{__html:item.bussines_ltitulo}}></div></h3>
                                        <p><div dangerouslySetInnerHTML={{__html:item.bussines_ltxt}}></div></p>
                                    </div>
                                    <figure className="introImg">
                                        <Image src={item.bussines_limg === '' ? bussines_limg : item.bussines_limg} width={50} height={50} alt="cover" title="cover" />
                                    </figure>
                                </div>
                            </div>
                        </SwiperSlide>
                    )
                }else{
                        <SwiperSlide key={faker.string.uuid()}>
                            <div className="inlineBlock lessingItem">
                                <div className="lessingAnim3">

                                    <div className="lessingAnimTxt">
                                        <h4>{item.bussines_lsubtitulo}</h4>
                                        <h3><div dangerouslySetInnerHTML={{__html:item.bussines_ltitulo}}></div></h3>
                                        <p><div dangerouslySetInnerHTML={{__html:item.bussines_ltxt}}></div></p>
                                    </div>
                                    <figure className="introImg">
                                        <Image src={item.bussines_limg === '' ? bussines_limg : item.bussines_limg} width={50} height={50} alt="cover" title="cover" />
                                    </figure>
                                </div>
                            </div>
                        </SwiperSlide>  
                }
            })}
        </Swiper>
    )
};

export default HomeBusiness;
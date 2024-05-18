import '../styles/cursos.scss';
import { useState, useEffect } from "react";
import axios from 'axios';

import Image from 'next/image';

// UI
import Container from '@mui/material/Container';

// Swiper
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination,Navigation } from 'swiper/modules';

import Cookies from 'js-cookie';

// Images
import introImg from '../assets/img/intro_portal.png';

// Curos
import curso1 from '../assets/img/inicio_curso1.png';

// Sumary
import icoUserInscritos from '../assets/img/ico_user_inscritos.png';
import icoUserCompletados from '../assets/img/ico_user_completados.png';
import icoUserObtenidos from '../assets/img/ico_user_obtenidos.png';
import icoPlay from '../assets/img/ico_play.png';
import lessingNote from '../assets/img/lessing_note.png'
import docente1 from '../assets/img/docente_img1.png';

import dashboard_intro from '../assets/img/dashboard_intro.png';
import dashboard_ico2 from '../assets/img/dashboard_ico2.png';
import dashboard_ico1 from '../assets/img/dashboard_ico1.png';

export default function Dashboard() {

  /*
  const [user, setUser] = useState({
    email: "",
    username: "",
  });

  const cookieUser = Cookies.get('lessingToken');

  const getProfile = async  () => {
    const profile = await axios.get("/api/profile");
    console.log(profile)
    setUser(profile.data);
  };

  useEffect(()=>{
    getProfile();
    console.log(cookieUser)
  },[]);
  */

  return (
    <div className="pageCont pageUserHome inlineBlock">
      <section className="secBox userHome">
        <div className="userHomeBackground">
          <div className="circleBack circlePink"></div>
          <div className="circleBack circleBlue"></div>
        </div>
        
        <Container maxWidth="xm">
          <div className="inlineBlock userHomeBox">
              <div className="inlineFlex uhIntro">
                <div className="title">
                  <h2 >
                    <strong>Hola, ***.</strong><br />
                    ¡Qué bueno verte!
                  </h2>
                  <p>
                    Este es tu portal de aprendizaje, explora tus cursos2 y potencia
                    tu desarrollo profesional llevándolo al siguiente nivel con <strong>lessin</strong>
                  </p>
                </div>
                <figure className="introImg">
                  <div className="det det1">
                    <Image src={dashboard_ico1} />
                  </div>

                  <div className="det det3">
                    <Image src={dashboard_ico2} />
                  </div>
                  <Image src={dashboard_intro} />
                </figure>
              </div>
          </div>
        </Container>

        <div className="secBox uhForyou uhForyou2">
          <Container maxWidth="xm">
            <div className="inlineBlock uhForyouBox uhForyouBox33">
              <div className="title">
                <h4>Tus cursos <strong>recientes</strong></h4>
              </div>
              <div className="uhRecentBox">
                <div className="uhRecentLast">
                  <figure>
                    <Image src={curso1} />
                    <figcaption>
                      <h4>Nombre del curso</h4>
                      <p>x% avanzado</p>
                      <a href="#" className='btnSolid '>Continuar curso</a>
                    </figcaption>
                  </figure>
                </div>
                <div className="uhRecentList">
                  <h4>Continúa con</h4>
                  <div className='uhRecentItem'>
                    <figure>
                      <Image src={curso1} />
                    </figure>
                    <div className="txt">
                      <a href="#">CATEGORÍA</a>
                      <h3>Nombre del Curso</h3>
                      <p>% avanzado</p>
                    </div>
                    <a href="#" className='btnRecent'>Empezar</a>
                  </div>
                  <div className='uhRecentItem'>
                    <figure>
                      <Image src={curso1} />
                    </figure>
                    <div className="txt">
                      <a href="#">CATEGORÍA</a>
                      <h3>Nombre del Curso</h3>
                      <p>% avanzado</p>
                    </div>
                    <a href="#" className='btnRecent'>Empezar</a>
                  </div>
                  <div className='uhRecentItem'>
                    <figure>
                      <Image src={curso1} />
                    </figure>
                    <div className="txt">
                      <a href="#">CATEGORÍA</a>
                      <h3>Nombre del Curso</h3>
                      <p>% avanzado</p>
                    </div>
                    <a href="#" className='btnRecent'>Empezar</a>
                  </div>
                  <div className='uhRecentItem'>
                    <figure>
                      <Image src={curso1} />
                    </figure>
                    <div className="txt">
                      <a href="#">CATEGORÍA</a>
                      <h3>Nombre del Curso</h3>
                      <p>% avanzado</p>
                    </div>
                    <a href="#" className='btnRecent'>Empezar</a>
                  </div>
                  <div className='uhRecentItem'>
                    <figure>
                      <Image src={curso1} />
                    </figure>
                    <div className="txt">
                      <a href="#">CATEGORÍA</a>
                      <h3>Nombre del Curso</h3>
                      <p>% avanzado</p>
                    </div>
                    <a href="#" className='btnRecent'>Empezar</a>
                  </div>

                </div>
              </div>
            </div>
          </Container>
        </div>


        <Container maxWidth="xm">
          <div className="inlineBlock uhSumari uhSumari2">
            <div className="uhSumariBox">
              <div className="title">
                <h4>Resumen general</h4>
              </div>
              <div className="uhSumariList">
                <div className="time">
                  <div className="circle">
                    <div className="min">0 min</div>
                    <p>media de estudio</p>
                  </div>
                  <div className="txt">
                    <p><strong>0</strong> Minutos vistos</p>
                    <p><strong>0</strong> Cursos iniciados</p>
                  </div>
                </div>
                <div className="inscritos">
                  <h3>00 <Image src={icoUserInscritos} /></h3>
                  <h4>Cursos <br /> <strong>inscritos</strong></h4>
                </div>
                <div className="inscritos">
                  <h3>00 <Image src={icoUserCompletados} /></h3>
                  <h4>Cursos <br /> <strong>completados</strong></h4>
                </div>
                <div className="inscritos">
                  <h3>00 <Image src={icoUserObtenidos} /></h3>
                  <h4>Diplomas <br /> <strong>obtenidos</strong></h4>
                </div>
              </div>
            </div>
          </div>
          <div className="secBox uhForyou">
              <div className="inlineBlock uhForyouBox">
                <div className="title">
                    <h4>Cursos nuevos <strong className='skyblue'> para tu crecimiento</strong></h4>
                </div>
                <div className="inlineBlock cursosSwiper">
                  <Swiper
                    spaceBetween={20}
                    slidesPerView={4}
                    pagination={{
                      type: 'fraction',
                    }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                    breakpoints={{
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
                    }}
                    >
                    <SwiperSlide>
                      <div className="cursoItem">
                        <figure>
                          <Image src={curso1} />
                        </figure>
                        <div className="txt">
                          <div className="catList">
                            <a href="">Cateogía</a>
                          </div>
                          <h4>Nombre del curso</h4>
                          <p>Por: test</p>
                          <a href="#" className="btnCurso">
                            Detalles curso
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="cursoItem">
                        <figure>
                          <Image src={curso1} />
                        </figure>
                        <div className="txt">
                          <div className="catList">
                            <a href="">Cateogía</a>
                          </div>
                          <h4>Nombre del curso</h4>
                          <p>Por: test</p>
                          <a href="#" className="btnCurso">
                            Detalles curso
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="cursoItem">
                        <figure>
                          <Image src={curso1} />
                        </figure>
                        <div className="txt">
                          <div className="catList">
                            <a href="">Cateogía</a>
                          </div>
                          <h4>Nombre del curso</h4>
                          <p>Por: test</p>
                          <a href="#" className="btnCurso">
                            Detalles curso
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="cursoItem">
                        <figure>
                          <Image src={curso1} />
                        </figure>
                        <div className="txt">
                          <div className="catList">
                            <a href="">Cateogía</a>
                          </div>
                          <h4>Nombre del curso</h4>
                          <p>Por: test</p>
                          <a href="#" className="btnCurso">
                            Detalles curso
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                    <SwiperSlide>
                      <div className="cursoItem">
                        <figure>
                          <Image src={curso1} />
                        </figure>
                        <div className="txt">
                          <div className="catList">
                            <a href="">Cateogía</a>
                          </div>
                          <h4>Nombre del curso</h4>
                          <p>Por: test</p>
                          <a href="#" className="btnCurso">
                            Detalles curso
                          </a>
                        </div>
                      </div>
                    </SwiperSlide>
                  </Swiper>
                </div>
                </div>
          </div>
          <div className="inlineBlock uhDc">
            <div className="uhDcBox">
              <div className="txt">
                <a href="#" className="category">
                  CATEGORÍA
                </a>
                <h3>Nombre del curso</h3>
                <p>
                  Lorem ipsum dolor sit amet consectetur. Tellus pulvinar sit tellus 
                  adipiscing congue bibendum turpis varius. Viverra nunc vitae enim risus 
                  sit egestas eu. Ultricies scelerisque purus vulputate ipsum. 
                  Facilisis in malesuada vitae pulvinar scelerisque.
                </p>
                <a href="#" className='btnSolid btnSolidArrow'>
                  Inscríbete aquí
                </a>
              </div>
              <figure className="uhDcImg ">
                <Image src={curso1} />
                <div className="play">
                  <Image src={icoPlay} />
                </div>
              </figure>
            </div>

            <div className="inlineBlock lessingUpdate">
              <div className="txt">
                <p>
                  Encuentra el mejor crecimiento que Lessin tiene <br />
                  para ofrecerte. Tu equipo aprende, tu empresa mejora.
                </p>
                <a href="#" className='btnBorder'>
                  Contáctame 
                </a>
              </div>
              <figure>
                <Image src={lessingNote} />
              </figure>
            </div>

            <div className="inlineFlex docentesBox">
                <div className="title">
                  <h2>
                    <strong>docentes</strong> de calidad, <br />
                    <strong className="pink">cursos</strong> excelentes
                  </h2>
                  <p>
                    En nuestra plataforma, experimenta educación de calidad con docentes capacitados y apasionados que utilizan métodos innovadores y fomentan la participación activa. Descubre a nuestros destacados docentes para alcanzar tus metas académicas y profesionales con una educación excepcional.
                  </p>
                  <a href="#" className='btnSolid btnSolidArrow'>
                    Ver planilla de docentes
                  </a>
                </div>
                <div className="docentesAcordeon">
                  <div className="docenteItem docenteItemActive">
                    <Image src={docente1} />
                    <div className="title">
                      <h5>Diego Vielas</h5>
                      <p>Diseño Gráfico</p>
                    </div>
                  </div>
                  <div className="docenteItem">
                    <Image src={docente1} />
                    <div className="title">
                      <h5>Diego Vielas</h5>
                      <p>Diseño Gráfico</p>
                    </div>
                  </div>
                  <div className="docenteItem">
                    <Image src={docente1} />
                    <div className="title">
                      <h5>Diego Vielas</h5>
                      <p>Diseño Gráfico</p>
                    </div>
                  </div>
                  <div className="docenteItem">
                    <Image src={docente1} />
                    <div className="title">
                      <h5>Diego Vielas</h5>
                      <p>Diseño Gráfico</p>
                    </div>
                  </div>
                  <div className="docenteItem">
                    <Image src={docente1} />
                    <div className="title">
                      <h5>Diego Vielas</h5>
                      <p>Diseño Gráfico</p>
                    </div>
                  </div>
                </div>
            </div>
          </div>
        </Container>
        
        <div className="secBox uhForyou">
            <div className="inlineBlock uhForyouBox">
              <div className="title">
                  <h4>Tenemos esto <strong > para ti</strong></h4>
              </div>
              <div className="inlineBlock cursosSwiper">
                <Swiper
                  spaceBetween={20}
                  slidesPerView={4}
                  pagination={{
                    type: 'fraction',
                  }}
                  navigation={true}
                  modules={[Pagination, Navigation]}
                  breakpoints={{
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
                  }}
                  >
                  <SwiperSlide>
                    <div className="cursoItem">
                      <figure>
                        <Image src={curso1} />
                      </figure>
                      <div className="txt">
                        <div className="catList">
                          <a href="">Cateogía</a>
                        </div>
                        <h4>Nombre del curso</h4>
                        <p>Por: test</p>
                        <a href="#" className="btnCurso">
                          Detalles curso
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="cursoItem">
                      <figure>
                        <Image src={curso1} />
                      </figure>
                      <div className="txt">
                        <div className="catList">
                          <a href="">Cateogía</a>
                        </div>
                        <h4>Nombre del curso</h4>
                        <p>Por: test</p>
                        <a href="#" className="btnCurso">
                          Detalles curso
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="cursoItem">
                      <figure>
                        <Image src={curso1} />
                      </figure>
                      <div className="txt">
                        <div className="catList">
                          <a href="">Cateogía</a>
                        </div>
                        <h4>Nombre del curso</h4>
                        <p>Por: test</p>
                        <a href="#" className="btnCurso">
                          Detalles curso
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="cursoItem">
                      <figure>
                        <Image src={curso1} />
                      </figure>
                      <div className="txt">
                        <div className="catList">
                          <a href="">Cateogía</a>
                        </div>
                        <h4>Nombre del curso</h4>
                        <p>Por: test</p>
                        <a href="#" className="btnCurso">
                          Detalles curso
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                  <SwiperSlide>
                    <div className="cursoItem">
                      <figure>
                        <Image src={curso1} />
                      </figure>
                      <div className="txt">
                        <div className="catList">
                          <a href="">Cateogía</a>
                        </div>
                        <h4>Nombre del curso</h4>
                        <p>Por: test</p>
                        <a href="#" className="btnCurso">
                          Detalles curso
                        </a>
                      </div>
                    </div>
                  </SwiperSlide>
                </Swiper>
              </div>
              </div>
        </div>
      </section>
    </div>
  )
}
  
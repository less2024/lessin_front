import '../../styles/detalle-curso.scss';

import { useState,useEffect,useContext } from 'react';
import { useRouter } from 'next/router';

import Image from 'next/image';
import Link from 'next/link';

// UI
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';

// Images
import detCourseTeacher from '../../assets/img/detCourseTeacher.png';
import icoDetCursoStar from '../../assets/img/ico_det_curso_star.png';
import icoDetCursoEstudents from '../../assets/img/ico_det_curso_estudents.png';
import ico_det_curso_play from '../../assets/img/ico_det_curso_play.png';

import ico_det_curso_cont1 from '../../assets/img/ico_det_curso_cont1.png';
import ico_det_curso_cont2 from '../../assets/img/ico_det_curso_cont2.png';
import ico_det_curso_cont3 from '../../assets/img/ico_det_curso_cont3.png';
import ico_det_curso_cont4 from '../../assets/img/ico_det_curso_cont4.png';
import ico_det_curso_cont5 from '../../assets/img/ico_det_curso_cont5.png';
import det_cur_banner from '../../assets/img/det_cur_banner.png';
import ico_btn_arrow from '../../assets/img/ico_btn_arrow.png';
import ico_curso_star from '../../assets/img/ico_curso_star.svg';
import detCourseTeacher_x2 from '../../assets/img/detCourseTeacher_x2.png';
import side_img_cover from '../../assets/img/side_img_cover.png';

import ico_det_curso_estudents from '../../assets/img/ico_det_curso_estudents.png';
import ico_det_curso_star from '../../assets/img/ico_det_curso_star.png';
import ico_det_curso_lessin from '../../assets/img/ico_det_curso_lessin.png';

import side_ico_note from '../../assets/img/side_ico_note.png';

// Curos
import curso1 from '../../assets/img/inicio_curso1.png';

// Context 
import { userLessing } from "../../context/user";
import { faker } from '@faker-js/faker';
import axios from 'axios';
import CursosTemas from '@/components/cursos/Temario';
import CursosPreguntas from '@/components/cursos/Preguntas';


export default function DetalleCursoId({data}) {

    const [windowWidth, setWindowWidth] = useState(0);

    const [open, setOpen] = useState(false);
    const [dataCourse,setDataCourse] = useState(null);
    const { categoriesUniv,courseUniv,loginData } = useContext(userLessing);
    const [docInfo,setDocInfo] = useState();

    const handleClickOpen = () => {
      setOpen(true);
    };
  
    const handleClose = () => {
      setOpen(false);
    };

    const [course,setCourse] = useState();
    const getCourses = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/cursos?per_page=3')
            .then((resp)=>{
              setCourse(resp.data);
            }).catch((error)=>{
                console.log(error)
            })
    }

    const getDocente = (id) =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/docentes/'+data[0].acf.pcurso_profesor_foto)
            .then((resp)=>{
                setDocInfo(resp.data);
            }).catch((error)=>{
                console.log(error)
            })
            //pcurso_profesor_foto
    }

    useEffect(() => {
        setWindowWidth(window.innerWidth);
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
        
    });

    const router = useRouter();

    useEffect(()=>{
        setDataCourse(data[0]);
        getCourses();
        getDocente();
        if(data.code){
            router.push('/');
        }
    },[]);
    


    return (
        <div className="pageCont pageDetCurso inlineBlock">
            {dataCourse &&
            <section className="secBox pdcDet">
                <div className="pdcBackground">
                    <div className="circleBack circlePink"></div>
                    <div className="circleBack circleBlue"></div>
                </div>
                <div className="inlineBlock pdcBlockMenu"></div>
                <div className="inlineBlock pageDetCursoCont">
                    <Container>
                        <div className="InlineBlock pdcIntro">
                            {windowWidth > 992 && 
                                <div className="inlineBlock pcdBreadDetCur">
                                    <Link href={'/'}>Cursos</Link>
                                    <Link href={'/cursos'}>Categorías</Link>
                                </div>
                            }

                            <div className="inlineFlex pdcIntroBox">
                                <div className="pdcIntroTitle">
                                    {windowWidth < 992 && 
                                        <div className="inlineBlock pcdBreadDetCur">
                                            <Link href={'/'}>Cursos</Link>
                                            <Link href={'/cursos'}>Categorías</Link>
                                        </div>
                                    }
                                    {dataCourse &&
                                        <div className="title">
                                            {categoriesUniv &&
                                                dataCourse.categoria.length > 0 &&
                                                categoriesUniv.map((item)=>{
                                                if(item.id === dataCourse.categoria[0]){
                                                    return (
                                                        <h3>{item.name}</h3>
                                                    )
                                                }
                                            })}
                                            
                                            <h1>{dataCourse.title.rendered ? dataCourse.title.rendered:'No title'}</h1>
                                            <p>{dataCourse.acf.pcurso_desccorta ? dataCourse.acf.pcurso_desccorta:'No descripcion'}</p>
                                        </div>
                                    }
                                    {docInfo &&
                                        <div className="teacher">
                                            <figure>
                                                {docInfo.acf.pdocente_imagen ?
                                                    <Image src={docInfo.acf.pdocente_imagen} width={"50"} height={"50"} alt={docInfo.title.rendered} title={docInfo.title.rendered} />
                                                :    
                                                    <Image src={detCourseTeacher}  width={"50"} height={"50"} title={'docente'} alt={'docente'} />
                                                }
                                                
                                            </figure>
                                        
                                            <div className="txt">
                                                <h5>{docInfo.title.rendered}</h5>
                                                <p>{docInfo.acf.pdocente_descripcion ? docInfo.acf.pdocente_descripcion:'No sub title'}</p>
                                            </div>
                                        </div>
                                    }
                                    {dataCourse &&
                                        <div className="estudents">
                                            <div className="item">
                                                <h4>MÁS VISTO</h4>
                                            </div>
                                            <div className="item">
                                                <Image src={icoDetCursoEstudents}  width={"50"} height={"50"} title={'Estudiantes'} alt={'Estudiantes'} />
                                                {dataCourse.acf.pcurso_estudiantes ? dataCourse.title.pcurso_estudiantes:'0'} estudiantes
                                            </div>
                                            <div className="item">
                                                <Image src={icoDetCursoStar}  width={"50"} height={"50"} title="estrellas" alt="estrellas"  />
                                                5 estrellas
                                            </div>
                                        </div>
                                    }

                                </div>
                                
                                {dataCourse &&
                                    <div className="pdcIntroImg" onClick={handleClickOpen}>
                                        {dataCourse.acf.pcurso_videopreview ?
                                            <Image src={dataCourse.acf.pcurso_videopreview} priority  width={50} height={50} alt={'Video'} title={'Video'}  />
                                        :
                                            <Image src={curso1}  width={50} height={50} priority alt={'Video'} title={'Video'}  />
                                        }
                                        <div className="play" >
                                            <Image src={ico_det_curso_play}  width={50} height={50} alt={'Play'} title={'Play'} />
                                        </div>
                                    </div>
                                }
                            </div>
                        </div>

                        <div className="inlineFlex pdcDescription">
                            <div className="inlineFlex description">
                                {dataCourse &&
                                    <div className="inlineBlock pdcdTxt">
                                        <h3>
                                            Descripción del curso
                                        </h3>
                                        {dataCourse.acf.pcurso_descripcion === '' ?
                                            <p>no descripcion</p>
                                        :
                                            <p>{dataCourse.acf.pcurso_descripcion }</p>
                                        }
                                        
                                    </div>
                                }

                                {dataCourse &&
                                <div className="inlineBlock pdcdTxt">
                                    <h3>
                                        Con este curso aprenderás a
                                    </h3>
                                    <ul>
                                    {dataCourse.acf.pcurso_aprenderas &&
                                        dataCourse.acf.pcurso_aprenderas.map((item)=>{
                                        return (<li key={faker.string.uuid()}>{item.pcurso_aitem}</li>);
                                    })}
                                    </ul>
                                </div>
                                }

                                {dataCourse.acf.pcurso_temario &&
                                    <CursosTemas data={dataCourse.acf.pcurso_temario} />
                                }
                                
                                {docInfo &&
                                    <div className="inlineBlock pdcdDocente">
                                        <h3>Docente</h3>
                                        <div className="pdcdDocenteBox">
                                            <figure>
                                                {docInfo.acf.pdocente_imagen ?
                                                    <Image src={docInfo.acf.pdocente_imagen} width={10} height={10} alt={docInfo.title.rendered} title={docInfo.title.rendered} />
                                                :    
                                                    <Image src={detCourseTeacher_x2}  width={50} height={50} title='No profesor' alt='No profesor' />
                                                }
                                            </figure>
                                            <div className="txt">
                                                <h4>{docInfo.title.rendered}</h4>
                                                <p>{docInfo.acf.pdocente_descripcion ? docInfo.acf.pdocente_descripcion:'No sub title'}</p>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {course &&
                                    course.length > 0 &&
                                    <div className="inlineBlock pdcdRecomendados">
                                        <h3>Estos cursos podrían interesarte</h3>
                                        <div className="inlineBlock pdcdRecoList">
                                            {course.map((item)=>{     
                                                return (                                       
                                                    <div key={faker.string.uuid()} className="inlineBlock pdcdRecoItem">
                                                        <figure>
                                                            {item.acf.imagen_catalogo !== '' ? 
                                                                <Image src={item.acf.imagen_catalogo}  width={50} height={50} title={item.title.rendered} alt={item.title.rendered} />
                                                            :
                                                                <Image src={curso1}  width={50} height={50} title={item.title.rendered} alt={item.title.rendered} />
                                                            }
                                                        </figure>
                                                        <div className="txt">
                                                            <h4>{item.title.rendered}</h4>
                                                            <small>Por: {item.acf.pcurso_profesor ? item.acf.pcurso_profesor : '--'}</small>
                                                            <div className="tag">
                                                                MÁS VISTOS
                                                            </div>
                                                            <div className="caract">
                                                                <div className='item' >
                                                                    <Image src={ico_det_curso_star}  width={"50"} height={"50"} title="Valoraciones" alt="Valoraciones" />
                                                                    {item.acf.pcurso_valoracion ? item.acf.pcurso_valoracion : '--'}
                                                                </div>
                                                                <div className='item' >
                                                                    <Image src={ico_det_curso_estudents}  width={"50"} height={"50"} title="Estudiantes" alt="Estudiantes" />
                                                                    {item.acf.pcurso_estudiantes ? item.acf.pcurso_estudiantes : '--'} estudiantes 
                                                                </div>
                                                                <div className='item' >
                                                                    <Image src={ico_det_curso_lessin} width={"50"} height={"50"} title="Lecciones" alt="Lecciones" />
                                                                    {item.acf.pcurso_lecciones ? item.acf.pcurso_lecciones : '--'} lecciones
                                                                </div>
                                                            </div>

                                                        </div>
                                                        <div className="action">
                                                            <Link href={'/cursos/'+item.slug} className="btnBorder">
                                                                Ver curso
                                                            </Link>
                                                        </div>
                                                    </div >
                                                )
                                            })}
                                            <div className="inlineFlex pdcdRecoBtn">
                                                <Link href={'/cursos'}>
                                                    Ver más cursos
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                }

                                {loginData &&
                                    loginData.baner1 !== '' ?
                                    <div className="inlineBlock pdcdBanner">
                                        {loginData.baner1_link ? 
                                            <Link href={loginData.baner1_link} target='_blank'>
                                                <Image src={loginData.baner1 }  width={"50"} height={"50"} title="Baner" alt="Baner" />
                                            </Link>
                                        :
                                            <Image src={loginData.baner1 }  width={"50"} height={"50"} title="Baner" alt="Baner" />
                                        }
                                    </div>
                                    :
                                    <div className="inlineBlock pdcdBanner">
                                        <Image src={det_cur_banner}  width={"50"} height={"50"} title="Baner" alt="Baner" />
                                    </div>
                                }

                                <div className="inlineBlock pdcdValoraciones">
                                    <h3>Valoraciones</h3>
                                    {dataCourse &&
                                    <div className="inlineFlex pdcdValBox">
                                        <div className="points">
                                            <h3>
                                                {dataCourse.acf.pcurso_valoracion ? dataCourse.acf.pcurso_valoracion:'5.0'}
                                                <small>Rating del curso</small>
                                            </h3>
                                            <div className="stars">
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                    <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                </svg>
                                            </div>
                                        </div>
                                        <div className="status">
                                            <div className="item">
                                                <div className="line">
                                                    <span></span>
                                                </div>
                                                <div className="stars">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <div className="number">
                                                        {dataCourse.acf.pcurso_valoracion1 ? dataCourse.acf.pcurso_valoracion1:'90%'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item item0">
                                                <div className="line">
                                                    <span></span>
                                                </div>
                                                <div className="stars">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <div className="number">
                                                        {dataCourse.acf.pcurso_valoracion2 ? dataCourse.acf.pcurso_valoracion2:'0%'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item item0">
                                                <div className="line">
                                                    <span></span>
                                                </div>
                                                <div className="stars">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <div className="number">
                                                        {dataCourse.acf.pcurso_valoracion3 ? dataCourse.acf.pcurso_valoracion3:'0%'}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="item item0">
                                                <div className="line">
                                                    <span></span>
                                                </div>
                                                <div className="stars">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <div className="number">
                                                        {dataCourse.acf.pcurso_valoracion4 ? dataCourse.acf.pcurso_valoracion4:'90%'}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    }
                                </div>
                                
                                {false &&
                                <div className="inlineBlock pdcdComentarios">
                                    <h4>
                                        Comentarios de estudiantes
                                    </h4>
                                    <div className="inlineBlock pdcdComentariosList">
                                        <div className="inlineFlex pdcdComentariosItem">
                                            {docInfo &&
                                                <figure>
                                                    {docInfo.acf.pdocente_imagen ?
                                                        <Image src={docInfo.acf.pdocente_imagen} width={"50"} height={"50"} alt={docInfo.title.rendered} title={docInfo.title.rendered} />
                                                    :    
                                                        <Image src={detCourseTeacher}  width={"50"} height={"50"} title={'docente'} alt={'docente'} />
                                                    }
                                                </figure>
                                            }
                                            <div className="txt">
                                                <h5>Diego Viegas Lopez</h5>
                                                <div className="stars">
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                        <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                                    </svg>
                                                    <div className="time">
                                                    hace 2 semanas
                                                    </div>
                                                </div>
                                                <div className="comend">
                                                    <p>
                                                        Lorem ipsum dolor sit amet consectetur. Tellus pulvinar sit tellus adipiscing congue bibendum turpis varius. Viverra nunc vitae enim risus sit egestas eu. Ultricies scelerisque purus vulputate ipsum. Facilisis in malesuada vitae pulvinar scelerisque.
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                }

                                {false &&
                                <div className="inlineBlock pdcdPost">
                                    <div className="title">
                                        <h4>Deja tu valoración</h4>
                                        <div className="stars">
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M7.00421 10.9498L3.29581 13L4.00421 8.65756L1 5.58253L5.1458 4.95072L7 1L8.8542 4.95072L13 5.58253L9.99579 8.65756L10.7042 13L7.00421 10.9498Z" stroke="#FF8A00" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                        </div>
                                    </div>
                                    <div className="fieldArea">
                                        <div className="box">
                                            <p>Lorem ipsum dolor sit amet consectetur. Tellus pulvinar sit tellus adipiscing congue bibendum turpis varius. Viverra nunc vitae enim risus sit egestas eu. Ultricies scelerisque purus vulputate ipsum. Facilisis in malesuada vitae pulvinar scelerisque.</p>
                                        </div>
                                        <a href="#" className='btnBorder'>
                                            Enviar reseña
                                        </a>
                                    </div>
                                </div>
                                }

                                {dataCourse.acf.pcurso_preguntas &&
                                    <CursosPreguntas data={dataCourse.acf.pcurso_preguntas} />
                                }

                            </div>
                            <div className="inlineFlex sideBar">

                                <Link 
                                    href={'/dashboard/mis-cursos/'+dataCourse.slug} 
                                    className="btnSolid btnSideLog"
                                >
                                    Empezar curso
                                    <Image src={ico_btn_arrow}  width={"50"} height={"50"} alt="Empezar curso" title="Empezar curso" />
                                </Link>

                                {false &&
                                    <a href="#" className="btnSolid btnSideLog2">
                                        Guardar como Favorito
                                        <Image src={ico_curso_star}  width={"50"} height={"50"} alt="Favorito" title="Favorito" />
                                    </a>
                                }

                                <div className="sideThanks">
                                    <figure>
                                        <Image src={side_ico_note}  width={"50"} height={"50"} title={'Thanks'} alt={'Thanks'} />
                                    </figure>
                                    <div className="txt">
                                        <p>Gracias a nuestro cliente, accedes a todos los cursos y beneficios de nuestro catálogo.</p>
                                    </div>
                                    
                                    <Link href={'/cursos'}>
                                        Ver catálogo de cursos
                                    </Link>
                                </div>

                                {data &&
                                <div className="inlineBlock sideDetalle">
                                    <div className="item">
                                        <Image src={ico_det_curso_cont1}  width={"50"} height={"50"} title="Estudiantes" alt="Estudiantes" />
                                        {dataCourse.acf.pcurso_estudiantes ? dataCourse.acf.pcurso_estudiantes : '--'} Estudiantes
                                    </div>
                                    <div className="item">
                                        <Image src={ico_det_curso_cont2}  width={"50"} height={"50"} title="Duración" alt="Duración" />
                                        Duración: {dataCourse.acf.pcurso_duracion ? dataCourse.acf.pcurso_duracion : '--'}
                                    </div>
                                    <div className="item">
                                        <Image src={ico_det_curso_cont3}  width={"50"} height={"50"} title="Lecciones" alt="Lecciones" />
                                        {dataCourse.acf.pcurso_lecciones ? dataCourse.acf.pcurso_lecciones : '-'} Lecciones
                                    </div>
                                    <div className="item">
                                        <Image src={ico_det_curso_cont4}  width={"50"} height={"50"} title="Nivel" alt="Nivel" />
                                        Nivel: {dataCourse.acf.pcurso_nivel ? dataCourse.acf.pcurso_nivel : '--'}
                                    </div>
                                    <div className="item">
                                        <Image src={ico_det_curso_cont5}  width={"50"} height={"50"} title="Certifícate" alt="Certifícate" />
                                        {dataCourse.acf.pcurso_certificado ? dataCourse.acf.pcurso_certificado : 'Certifícate al terminar'}
                                    </div>
                                    <a href="#" className="itemMinus">
                                        Ver menos
                                    </a>
                                </div>
                                }

                                {loginData &&
                                    loginData.baner2 !== '' ?
                                    <div className="inlineBlock sideImg">
                                        {loginData.baner2_link ?
                                            <a href={loginData.baner2_link} target={"_blank"} rel="noopener noreferrer" >
                                                <Image src={loginData.baner2}  width={"50"} height={"50"} title='Baner publicitario' alt='Baner publicitario' />
                                            </a>
                                        :
                                            <Image src={loginData.baner2}  width={"50"} height={"50"} title='Baner publicitario' alt='Baner publicitario' />
                                        }

                                    </div>
                                :
                                    <div className="inlineBlock sideImg">
                                        <Image src={side_img_cover}  width={"50"} height={"50"} title='Baner publicitario' alt='Baner publicitario' />
                                    </div>
                                }
                                
                                {docInfo &&
                                <div className="inlineBlock sideTeache">
                                    <figure>
                                        {docInfo.acf.pdocente_imagen ?
                                            <Image src={docInfo.acf.pdocente_imagen} width={"50"} height={"50"} alt={docInfo.title.rendered} title={docInfo.title.rendered} />
                                        :    
                                            <Image src={detCourseTeacher}  width={"50"} height={"50"} title={'docente'} alt={'docente'} />
                                        } 
                                    </figure>
                                    <div className="txt">
                                        <h5>{docInfo.title.rendered}</h5>
                                        <p>Profesor</p>
                                    </div>
                                </div>
                                }

                                <div className="inlineBlock sideLinkCat">
                                    <a href="#">Volver a categorías</a>
                                </div>
                            </div>
                        </div>
                    </Container>
                </div>
                
                <Dialog
                    open={open}
                    onClose={handleClose}
                    className='videoModal'
                >

                    <div className="videoClosed" onClick={handleClose}></div>
                    <div className="videoModalBox">
                        {dataCourse &&
                        dataCourse.acf.pcurso_video !== '' ?
                            <iframe 
                            src={'https://iframe.mediadelivery.net/embed/173572/'+dataCourse.acf.pcurso_video+'?autoplay=true&loop=false&muted=false&preload=true'} 
                            loading="lazy" 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"></iframe>
                            
                        :
                            <iframe 
                            src="https://iframe.mediadelivery.net/embed/173572/91cc64ce-e7d3-4e6e-ae47-dc0168e7e512?autoplay=true&loop=false&muted=false&preload=true" 
                            loading="lazy" 
                            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"></iframe>
                        }
                    </div>
                </Dialog>
            </section>
            }
        </div>
    )
}
  
export async function getServerSideProps({params}) {
    try {
        const res = await fetch('https://api.lessin.pe/wp-json/wp/v2/cursos?slug='+params.detalle);
        const data = await res.json();

        return {
            props:{
                data
            }
        }

    } catch (error) {
        console.log(error); 
        return false 
    }
}

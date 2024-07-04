import '../../styles/cursos.scss';

import Image from 'next/image';
import { useState,useContext,useRef } from 'react';

// UI
import Container from '@mui/material/Container';

// Axios
import axios from 'axios';
import { motion } from "framer-motion";

// Context 
import { userLessing } from "../../context/user";

// Images
import introImg from '../../assets/img/intro_portal.png';


// Curos
import curso1 from '../../assets/img/inicio_curso1.png';

import dashboard_ico2 from '../../assets/img/dashboard_ico2.png';
import dashboard_ico1 from '../../assets/img/dashboard_ico1.png';

// Sumary
import icoUserInscritos from '../../assets/img/ico_user_inscritos.png';
import icoUserCompletados from '../../assets/img/ico_user_completados.png';
import icoUserObtenidos from '../../assets/img/ico_user_obtenidos.png';

import lessingNote from '../../assets/img/lessing_note.png'
import { useEffect } from 'react';
import DashSwiperCourses from '@/components/dashboard/SwiperCourses';
import DashSwiperCourses2 from '@/components/dashboard/SwiperCourses2';
import DashSwiperCourses3 from '@/components/dashboard/SwiperCourses3';
import HomeDocentes from '@/components/home/Docentes';

import icoStart from '../../assets/img/ico_curso_star.svg';
import icoCursoStudent from '../../assets/img/ico_curso_student.svg';

import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Grow from '@mui/material/Grow';
import Box from '@mui/material/Box';

import Link from 'next/link';

const variants = {
    open: { 
      opacity: 1, 
      x: 0 ,
    },
    closed: { 
      opacity: 0, 
      x: "10%" ,
    },
    closed2:{
      opacity: 0, 
      x: "-10%" ,
    },
    lineOpen:{
      opacity: 1,
      x: 0 ,
      scaleX:1,
    },
    lineClosed:{
      opacity: 0,
      scaleX:0,
      x:"-20%"
    }
  }

export default function Dashboard() {

    const { loginData,courseUniv,loading,setLoading } = useContext(userLessing);

    const [dataUser,setDataUser] = useState();
    const [dataCursos,setDataCursos] = useState(null);
    const [dataMentorias,setDataMentorias] = useState(null);
    const [isOpen, setIsOpen] = useState(false);


    // Modal offerta
    const [openModalOffer, setOpenModalOffer] = useState(false);
    const handleModalOfferOpen = () => setOpenModalOffer(true);
    const handleModalOfferClose = () => setOpenModalOffer(false);


    // Mentorias
    const getMentorias = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/mentorias')
            .then((resp)=>{
                setDataMentorias(resp.data);
            }).catch((error)=>{
              console.log(error)
            })
      }

    // Get information
    const [myCourses,setMyCourses] = useState([]);
    const [myCoursesFinish,setMyCoursesFinish] = useState([]);
    const [totalScore,setTotalScore] = useState([]);
    const [lastCourse,setLastCourse] = useState(null);
    const [lastCourseDet,setLastCourseDet] = useState(null);
    const [relatedCourses,setRelatedCourses] = useState(null);
    const [secondsConv,setSecondsConv] = useState(null);

    const secondsToHms = (d) => {
        d = Number(d);
        const h = Math.floor(d / 3600);
        const m = Math.floor(d % 3600 / 60);
        const s = Math.floor(d % 3600 % 60);
    

        setSecondsConv({
            hours:h,
            minuts:m,
            seconds:s
        })
    }

    const getInfo = ()=>{
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/getCoursesUser?per_page=3',{
            user_id:loginData.idUser,
            course_company:loginData.company
        }).then((resp)=>{
            const myCoursesTmp = [];
            const myCoursesFinishTmp = [];
            const coursesRelated = [];
            let totalSeconds = 0;
            if(resp.data.length > 0){
                resp.data.map((item,index)=>{
                    if(item.course_state === "0"){
                        myCoursesTmp.push(item);
                    }else{
                        myCoursesFinishTmp.push(item);
                    }

                    // Last course => Relacionados
                    const indexTmp = index + 1;
                    if(resp.data.length === indexTmp){
                        setLastCourse(item);
                        axios.get('https://api.lessin.pe/wp-json/wp/v2/cursos/'+item.course_id)
                        .then((respCourse)=>{
                            setLastCourseDet(respCourse.data);
                            axios.get('https://api.lessin.pe/wp-json/wp/v2/cursos?categoria='+respCourse.data.categoria[0]+'&per_page=3')
                                .then((respCat)=>{
                                    if(respCat.data.length > 0 ){
                                        respCat.data.map((respCatItem)=>{
                                            if(respCatItem.id !== respCourse.data.id){
                                                coursesRelated.push(respCatItem);
                                            }
                                        })
                                    }
                                    setRelatedCourses(coursesRelated);
                                })
                        })
                        
                    }

                    // Total seconds
                    totalSeconds = totalSeconds + parseInt(item.course_time)
                })
            }

            secondsToHms(totalSeconds);
            setTotalScore(resp.data)
            setMyCourses(myCoursesTmp);
            setMyCoursesFinish(myCoursesFinishTmp);
        })
    }


    const [dataHome,setDataHome] = useState(null);
    // Page
    const getPage = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/pages/251')
            .then((resp)=>{
                setDataHome(resp.data);
            })
    }


    function shuffle(array) {
        let currentIndex = array.length,  randomIndex;
      
        // While there remain elements to shuffle.
        while (currentIndex > 0) {
      
          // Pick a remaining element.
          randomIndex = Math.floor(Math.random() * currentIndex);
          currentIndex--;
      
          // And swap it with the current element.
          [array[currentIndex], array[randomIndex]] = [
            array[randomIndex], array[currentIndex]];
        }
      
        return array;
    }

    useEffect(()=>{
        getInfo();
        setDataUser(loginData);
        getMentorias();
        getPage();

        setTimeout(()=>{
            setOpenModalOffer(true)
        },2000)

        if(courseUniv !== null ){
            setDataCursos(shuffle(courseUniv));

        }else{
            setDataCursos(courseUniv);
        }

        if(loading === false ){
            setTimeout(()=>{
                setIsOpen(true);
            },1650);
            setLoading(true)
        }else{
            setIsOpen(true);
        }


    },[courseUniv])

    return (
        <div className="pageCont pageUserHome inlineBlock">
            <div className="userHomeBackground">
                <div className="circleBackCursos circlePinkCursos"></div>
                <div className="circleBackCursos circleBlueCursos"></div>
            </div>
            <section className="secBox userHome">

                {dataUser &&
                    <div className="inlineBlock userHomeBox">
                        <div className="inlineFlex uhIntro">
                            <div className="title">
                                <h2>
                                    <motion.span 
                                    transition={{ delay:0.2, type: "tween" }}
                                    className='inlineBlock'
                                    initial="closed"
                                    variants={variants}
                                    animate={isOpen ? 'open': 'closed'}
                                    >
                                        <strong>Hola, {dataUser.nombresCompletos.split(' ')[0]}</strong><br />
                                        ¡Qué bueno verte!
                                    </motion.span>
                                    <motion.span className='subLine'
                                    transition={{ delay: 0, type: "tween" }}
                                    variants={variants}
                                    initial="lineClosed"
                                    animate={isOpen ? 'lineOpen': 'lineClosed'}
                                    >
                                    </motion.span>
                                </h2>

                                <motion.div
                                    transition={{ delay: 0.4, type: "tween" }}
                                    variants={variants}
                                    initial="closed"
                                    animate={isOpen ? 'open': 'closed'}
                                    className='parf'
                                >
                                <p>
                                    Este es tu portal de aprendizaje, explora tus cursos y potencia
                                    tu desarrollo profesional llevándolo al siguiente nivel con <strong>lessin</strong>
                                </p>
                                </motion.div>


                                <motion.div
                                    transition={{ delay: 0.6, type: "tween" }}
                                    variants={variants}
                                    initial="closed"
                                    animate={isOpen ? 'open': 'closed'}
                                    className='parf'
                                >
                                <div className="uhSumariBox uhSumariBox2">
                                    <div className="uhSumariList">
                                        <div className="inscritos">
                                            <h3>{myCourses.length} <Image src={icoUserInscritos} width={10} height={10} alt="inscritos" title="inscritos" /></h3>
                                            <h4>Cursos <br /> <strong>inscritos</strong></h4>
                                        </div>
                                        <div className="inscritos">
                                            <h3>{myCoursesFinish.length} <Image src={icoUserCompletados} width={10} height={10} alt="completados" title="completados" /></h3>
                                            <h4>Cursos <br /> <strong>completados</strong></h4>
                                        </div>
                                        <div className="inscritos">
                                            <h3>{myCoursesFinish.length} <Image src={icoUserObtenidos} width={10} height={10} alt="obtenidos" title="obtenidos" /></h3>
                                            <h4>Diplomas <br /> <strong>obtenidos</strong></h4>
                                        </div>
                                    </div>
                                </div>
                                </motion.div>

                            </div>
                            <figure className="introImg">
                                <motion.div
                                    className='det det1'
                                    transition={{ delay: 0.3, type: "tween" }}
                                    variants={variants}
                                    initial="closed2"
                                    animate={isOpen ? 'open': 'closed2'}
                                >
                                    {dataUser.detalle ? 
                                        <Image src={dataUser.detalle} width={50} height={50} alt="Detalle" title="Detalle" />
                                    :  
                                        <Image src={dashboard_ico1} width={50} height={50} alt="Detalle" title="Detalle"/>
                                    }
                                    
                                </motion.div>

                                <motion.div
                                    className='det det3'
                                    transition={{ delay: 0.5, type: "tween" }}
                                    variants={variants}
                                    initial="closed2"
                                    animate={isOpen ? 'open': 'closed2'}
                                >
                                    {dataUser.logo ? 
                                        <Image src={dataUser.logo} width={50} height={50} alt="Logo" title="Logo"/>
                                    :  
                                        <Image src={dashboard_ico2} width={50} height={50} alt="Logo" title="Logo"/>
                                    }
                                    
                                </motion.div>
                                
                                <motion.div
                                    transition={{ delay: 0.2, type: "tween" }}
                                    variants={variants}
                                    initial="closed2"
                                    animate={isOpen ? 'open': 'closed2'}
                                >
                                {dataUser.cover ? 
                                    <Image src={dataUser.cover} width={50} height={50} alt="Cover" title="Cover"/>
                                :  
                                    <Image src={introImg} width={50} height={50} alt="Cover" title="Cover" />
                                }
                                </motion.div>
                                
                            </figure>
                        </div>
                    </div>
                }
                
                <div className="secBox uhForyou">
                    <Container maxWidth="xm">
                        {totalScore.length > 0 ?
                            <div className="inlineBlock uhForyouBox uhForyouBox33">
                                <div className="title" onClick={()=>console.log(lastCourse)}>
                                    <h4>Tus cursos <strong>recientes</strong></h4>
                                </div>
                                <div className="uhRecentBox">
                                    <div className="uhRecentLast">
                                        <figure>
                                            {lastCourseDet &&
                                                lastCourseDet.acf.pcurso_videopreview !== '' ?
                                                    <Image src={lastCourseDet.acf.pcurso_videopreview} width={50}  height={50} alt={lastCourseDet.title.rendered} title={lastCourseDet.title.rendered} />
                                                :
                                                
                                                    <Image src={curso1} width={50}  height={50} alt={lastCourse.course_name} title={lastCourse.course_name} />
                                            }
                                            <figcaption>
                                                <h4>{lastCourse.course_name}</h4>
                                                <p>{ parseFloat(lastCourse.course_progress).toFixed(1)}% avanzado</p>
                                                {lastCourseDet &&
                                                    <Link className='btnSolid' href={'/cursos/'+lastCourseDet.slug}>
                                                        Continuar curso
                                                    </Link>
                                                }
                                            </figcaption>
                                        </figure>
                                    </div>
                                    <div className="uhRecentList">
                                        <h4>Continúa con</h4>
                                        {relatedCourses &&
                                            relatedCourses.map((item)=>(
                                                <div className='uhRecentItem'>
                                                    <figure>
                                                        {item.acf.imagen_catalogo !== '' ?
                                                        <Image src={item.acf.imagen_catalogo} width={10} height={10} title={item.title.rendered} alt={item.title.rendered} />
                                                        :
                                                        <Image src={curso1} width={10} height={10} title={item.title.rendered} alt={item.title.rendered} />
                                                        }

                                                    </figure>
                                                    <div className="txt">
                                                        <h3>{item.title.rendered}</h3>
                                                        <div className='info'>
                                                            <div className="item">
                                                                <Image src={icoStart} alt="Valoraciones" title="Valoraciones" /> {item.acf.pcurso_valoracion4 ==='' ? '0' :item.acf.pcurso_valoracion4}
                                                            </div>
                                                            <div className="item">
                                                                <Image src={icoCursoStudent}  alt="Estudiantes" title="Estudiantes"  /> {item.acf.pcurso_estudiantes ==='' ? '0' :item.acf.pcurso_estudiantes} Estudiantes
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <Link href={'/dashboard/cursos/'+item.slug} className='btnRecent'>
                                                        Empezar
                                                    </Link>
                                                </div>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                        :
                            <div className="inlineBlock uhForyouBox">
                                <div className="title">
                                    <h4>Tenemos esto <strong>para ti</strong></h4>
                                </div>
                                {dataCursos &&
                                <DashSwiperCourses data={dataCursos} dashboard={true} />
                                }
                            </div>
                        }
                        {totalScore.length > 0 &&
                            <div className="inlineBlock uhSumari uhSumari2">
                                <div className="uhSumariBox">
                                <div className="title">
                                    <h4>Resumen general</h4>
                                </div>
                                <div className="uhSumariList">
                                    <div className="time">
                                        {secondsConv &&
                                        <div className="circle">
                                            <div className="min">{secondsConv.hours}:{secondsConv.minuts}:{secondsConv.seconds}</div>
                                            <p>tiempo de estudio</p>
                                        </div>
                                        }
                                        {secondsConv &&
                                        <div className="txt">
                                            <p><strong>{secondsConv.hours}</strong> Horas</p>
                                            <p><strong>{secondsConv.minuts}</strong> Minutos</p>
                                            <p><strong>{secondsConv.seconds}</strong> Segundos</p>
                                        </div>
                                        }
                                    </div>
                                    <div className="inscritos">
                                    <h3>{myCourses.length} <Image src={icoUserInscritos} /></h3>
                                    <h4>Cursos <br /> <strong>inscritos</strong></h4>
                                    </div>
                                    <div className="inscritos">
                                    <h3>{myCoursesFinish.length} <Image src={icoUserCompletados} /></h3>
                                    <h4>Cursos <br /> <strong>completados</strong></h4>
                                    </div>
                                    <div className="inscritos">
                                    <h3>{myCoursesFinish.length} <Image src={icoUserObtenidos} /></h3>
                                    <h4>Diplomas <br /> <strong>obtenidos</strong></h4>
                                    </div>
                                </div>
                                </div>
                            </div>
                        }
                        
                    </Container>
                </div>

                <Container maxWidth="xm">

                    <div className="inlineBlock uhDc">

                        <div className="inlineBlock lessingFyBox">
                            <div className="inlineBlock lTitle">
                                <h3>
                                    <strong>Lessin piensa en ti:</strong> <br />
                                    Contenido exclusivo para tu crecimiento
                                </h3>
                                <p>
                                    Lessin es la vanguardia en soluciones educativas que impulsan el aprendizaje continuo y el crecimiento profesional. Nuestra plataforma innovadora está diseñada para llevar la educación a un nivel superior, podrás acceder a mentorías y acceso exclusivo a cursos de alta calidad.
                                </p>
                            </div>

                            {dataMentorias && <DashSwiperCourses2 data={dataMentorias} />}
                            

                        </div>
                        
                        <div className="inlineBlock uhForyouBox uhForyouBox2">
                            <div className="title">
                                <h4>Cursos nuevos <strong className='skyblue'>para tu crecimiento</strong></h4>
                            </div>
                            {dataCursos && <DashSwiperCourses3 data={dataCursos} dashboard={true} />}
                        </div>

                        <div className="inlineBlock lessingUpdate lessingUpdate2">
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
                                <Image src={lessingNote} width={50} height={50} alt="Baner" title="Baner" />
                            </figure>
                        </div>
                        
                        {dataHome &&
                            <HomeDocentes data={dataHome} link={'/dashboard/mis-cursos/catalogo/'} />
                        }
                    </div>

                </Container>

            </section>

            <div className="hiLessin">
                <Image src="https://api.lessin.pe/wp-content/uploads/2023/11/lessin-dragon-listo.gif" alt="Hola" title="Hola" width={10} height={10} />
            </div>

            <Modal
                aria-labelledby="transition-modal-title"
                aria-describedby="transition-modal-description"
                open={openModalOffer}
                onClose={handleModalOfferClose}
                closeAfterTransition
                slots={{ backdrop: Backdrop }}
                slotProps={{
                backdrop: {
                    timeout: 500,
                },
                }}
            >
                <Grow
                    in={openModalOffer}
                    style={{ transformOrigin: '5 0 0' }}
                    {...(openModalOffer ? { timeout: 1000 } : {})}
                >
                    <Box className={'dashboardPopupOffer'}>
                        <div className="dashboardPopupOfferBox">
                            <div className="dpoClose" onClick={handleModalOfferClose}><span></span></div>
                            <a href="https://api.whatsapp.com/send?phone=51913898958" target='_blank' >
                                <Image src={'https://api.lessin.pe/wp-content/uploads/2024/05/offerPopup.gif'} alt="Oferta especial" title="Oferta especial" width={10} height={10} />
                                
                            </a>
                        </div>
                    </Box>
                </Grow>
            </Modal>
        </div>
    )
}
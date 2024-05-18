import '../styles/index.scss';

import { useState,useEffect,useContext } from 'react';
import { faker } from '@faker-js/faker';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from "framer-motion";

import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import TextField from '@mui/material/TextField';

// Context 
import { userLessing } from "../context/user";
import Anim1 from '../components/anim/Anim1';

import icoLogin from '../assets/img/ico_login2.png';
import introImg from '../assets/img/intro_portal.png';
import inco_ico_1 from '../assets/img/inco_ico_1.png';
import inco_ico_2 from '../assets/img/inco_ico_2.png';
import inco_ico_3 from '../assets/img/inco_ico_3.png';

import icoCursosBtn from '../assets/img/ico_btn_arrow.png';
import CloseIcon from '@mui/icons-material/Close';

// Curos
import lastCourse from '../assets/img/lastCourse.png';

// Lessin
import lessingNote from '../assets/img/lessing_note.png'


// Axios
import axios from 'axios';
import HomeMarcas from '@/components/home/Marcas';
import HomeCoursesList from '@/components/home/CoursesList';
import HomeBusiness from '@/components/home/Business';
import HomeExito from '@/components/home/Exito';

// Docentes
import docente1 from '../assets/img/docente_img1.png';
import HomeDocentes from '@/components/home/Docentes';
import { Modal } from '@mui/material';


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

export default function Home() {

  const [value, setValue] = useState(0);

  const [isOpen, setIsOpen] = useState(false);

  const [dataPage,setDataPage] = useState(null);
  const [dataMarcas,setDataMarcas] = useState([]);
  const [dataCursos,setDataCursos] = useState(null);
  const [tabCat,setTabCat] = useState(null);

  // Context
  const { loading,loginData } = useContext(userLessing);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const [tabResponsive,setTabResponsive] = useState(true);

  const openCategories = () =>{
    setTabResponsive((current) => !current);
  }


  // Modal
  const [openHomeTriler,setOpenHomeTriler] = useState(false);

  const handleCloseHomeTriler = () =>{
    setOpenHomeTriler(false)
  }


  // Page
  const getPage = () =>{
    axios.get('https://api.lessin.pe/wp-json/wp/v2/pages/251')
        .then((resp)=>{
          setDataPage(resp.data)
          setDataMarcas(resp.data.acf.marcas_lista)
        })
  }

  // Cursos
  const getCourses = () =>{
    axios.get('https://api.lessin.pe/wp-json/wp/v2/cursos')
        .then((resp)=>{
            setDataCursos(resp.data);
            setTabCat(resp.data);
        }).catch((error)=>{
          console.log(error)
        })
  }

  //resultCoursesTab
  const resultCoursesTab = (id) =>{
    const resultTabArray = [];
    if(id){
      if(tabCat.length > 0){
        tabCat.map((item)=>{
          if(parseInt(item.categoria[0]) === parseInt(id)){
            resultTabArray.push(item)
          }
        })
      }
      setDataCursos(resultTabArray);
    }else{
      setDataCursos(tabCat);
    }
  }

  const showBtnLogin = (infoLogin) =>{

    return (
      <Link href={'/login'} key={faker.string.uuid()} className='btnBorder'>
        <span>Iniciar sesión</span>
        <Image src={icoLogin} width={50} height={50} alt={'asdasd'}  />
      </Link>
    )
  }

  useEffect(()=>{
    getPage();
    getCourses();
    showBtnLogin();
    if(loading === false){
      setTimeout(()=>{
        setIsOpen(true);
      },1650);
    }else{
      setTimeout(()=>{
        setIsOpen(true);
      },0);
    }
  },[]);


  return (
    <div className="pageCont inlineBlock" >
      <section className="secBox introCont">
        <Container maxWidth="xm">
          <div className="introBox">
            <div className="title">

              <h1>
                <motion.span 
                  transition={{ delay:0.2, type: "tween" }}
                  className='inlineBlock'
                  initial="closed"
                  variants={variants}
                  animate={isOpen ? 'open': 'closed'}
                >
                  {dataPage &&
                    dataPage.acf.intro_titulo ?
                    <div dangerouslySetInnerHTML={{__html:dataPage.acf.intro_titulo}}>
                    </div>
                  :
                    <>
                    <strong>Tu equipo</strong> aprende, <br />
                    <strong className='pink'>tu empresa</strong> mejora 
                    </>
                  }
                </motion.span>
                <motion.span className='subLine'
                  transition={{ delay: 0, type: "tween" }}
                  variants={variants}
                  initial="lineClosed"
                  animate={isOpen ? 'lineOpen': 'lineClosed'}
                >
                </motion.span>
              </h1>
              
              
              <motion.div
                transition={{ delay: 0.4, type: "tween" }}
                variants={variants}
                initial="closed"
                animate={isOpen ? 'open': 'closed'}
                className='parf'
              >
                
                {dataPage &&
                  dataPage.acf.intro_txt ?
                    <div dangerouslySetInnerHTML={{__html:dataPage.acf.intro_txt}}></div>
                  :
                    <>
                      En <strong>Lessin</strong>, ayudamos a desarrollar el <strong>talento</strong> de tu equipo y lo <strong>potenciamos</strong> <br />
                      mediante cursos y herramientas altamente efectivas y competitivas.
                    </>
                }
              </motion.div>
              
                <motion.div
                  className="btnBox"
                  transition={{ delay: 0.6, type: "tween" }}
                  variants={variants}
                  initial="closed"
                  animate={isOpen ? 'open': 'closed'}
                >
                  {showBtnLogin(loginData)}
                  <a  onClick={()=>{setOpenHomeTriler(true)}} className='btnSolid'>
                    Conoce más
                  </a>
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
                  {dataPage &&
                  dataPage.acf.intro_detalle1 ?
                    <Image src={dataPage.acf.intro_detalle1} width={50} height={50} alt="Det 1" title="det 1" />
                  :
                    <Image src={inco_ico_1} width={50} height={50} alt="Det 1" title="det 1" />
                  }
                
              </motion.div>
              <motion.div
                className='det det2'
                transition={{ delay: 0.5, type: "tween" }}
                variants={variants}
                initial="closed2"
                animate={isOpen ? 'open': 'closed2'}
              >
                {dataPage &&
                  dataPage.acf.intro_detalle2 ?
                    <Image src={dataPage.acf.intro_detalle2} width={50} height={50} alt="Det 2" title="det 2"  />
                  :
                    <Image src={inco_ico_2} width={50} height={50} alt="Det 2" title="det 2"  />
                }
              </motion.div>
              <motion.div
                className='det det3'
                transition={{ delay: 0.7, type: "tween" }}
                variants={variants}
                initial="closed2"
                animate={isOpen ? 'open': 'closed2'}
              >
                {dataPage &&
                  dataPage.acf.intro_detalle3 ?
                    <Image src={dataPage.acf.intro_detalle3} width={50} height={50} alt="Det 3" title="det 3"  />
                  :
                    <Image src={inco_ico_3} width={50} height={50} alt="Det 3" title="det 3"  />
                }
              </motion.div>
              <motion.div
                transition={{ delay: 0.2, type: "tween" }}
                variants={variants}
                initial="closed2"
                animate={isOpen ? 'open': 'closed2'}
              >
                

                {dataPage &&
                  dataPage.acf.intro_img ?
                    <Image src={dataPage.acf.intro_img}  width={50} height={50} alt="IntroCover" title="IntroCover" />
                  :
                    <Image src={introImg}  width={50} height={50} alt="IntroCover" title="IntroCover" />
                }
              </motion.div>
            </figure>
          </div>
        </Container>
        <div className="introCover"></div>
      </section>

      <div className="groupBox">
        {true &&
        <section className="secBox marcasCont">
          <Container maxWidth="xm">
            <div className="inlineBlock marcasBox">

              <div className="title">
                <Anim1>
                  {dataPage &&
                    dataPage.acf.marcas_titulo ?
                    <h4><div dangerouslySetInnerHTML={{__html:dataPage.acf.marcas_titulo}}></div></h4>
                  :
                    <h4>Estas empresas <strong>confían</strong> en <strong>lessin</strong></h4>
                  }
                  
                </Anim1>
              </div>

              <Anim1>
                  <div className="marcasList">
                    <HomeMarcas data={dataMarcas} />
                  </div>
              </Anim1>

            </div>
          </Container>
        </section>
        }

        {true &&
        <section  className="secBox experienceCont">
          <Container maxWidth="xm">
            <div className="inlineBlock experienceBox">
              <div className="title">
                <Anim1>
                  {dataPage &&
                    dataPage.acf.exito_titutlo ?
                    <h2>
                      <div dangerouslySetInnerHTML={{__html:dataPage.acf.exito_titutlo}}>
                      </div>
                    </h2>
                  :
                    <h2>¡Estamos <strong>comprometidos</strong> con tu éxito!</h2>
                  }
                </Anim1>
                <Anim1>

                  {dataPage &&
                      dataPage.acf.exito_txt ?
                      <p>{dataPage.acf.exito_txt}</p>
                    :
                      <p>
                        En nuestra plataforma de e-learning, estamos comprometidos con tu éxito. Sabemos que cada paso que das en tu camino de aprendizaje es <br />
                        importante, y estamos aquí para brindarte las herramientas y recursos necesarios para alcanzar tus metas.
                      </p>
                  }
                </Anim1>
              </div>

              <HomeExito />
            </div>
          </Container>
        </section>
        }
        
        {true &&
        <section className="secBox cursosCont">
          <Container  maxWidth="xm">
            <div className="inlineBlock cursosBox">
              <Anim1>
                <div className="title">

                  {dataPage &&
                    dataPage.acf.cursos_titulo ?
                    <h3><div dangerouslySetInnerHTML={{__html:dataPage.acf.cursos_titulo}}></div></h3>
                  :
                    <h3>+100 Cursos</h3>
                  }

                  {dataPage &&
                    dataPage.acf.cursos_txt ?
                    <p>{dataPage.acf.cursos_txt}</p>
                  :
                    <p>Ofrecemos cursos de calidad, actualizados y elaborados por expertos en cada materia. Con recursos interactivos, lecciones dinámicas y evaluaciones prácticas, te proporcionamos las herramientas para adquirir habilidades y conocimientos de forma efectiva.</p>
                  }
                  
                </div>
              </Anim1>
              <div className="inlineBlock cursosTab">
                <Anim1>
                  <div className="btnRespTabList" onClick={openCategories}>
                    Categorías <ArrowForwardIosRoundedIcon/>
                  </div>
                </Anim1>
                
                <Anim1>
                  <Tabs value={value} onChange={handleChange} className={tabResponsive == false ? 'cursosTabMenu':'cursosTabMenu cursosTabMenuHide'} centered>
                    <Tab label="Todos"
                      onClick={()=>resultCoursesTab(null)}
                      key={faker.string.uuid()}
                    />
                    {dataPage &&
                      dataPage.acf.cursos_lista &&
                      dataPage.acf.cursos_lista.length > 0 &&
                      dataPage.acf.cursos_lista.map((item) => (
                      <Tab label={item.cursos_ltitulo}
                        iconPosition="start" 
                        onClick={()=>resultCoursesTab(item.cursos_lid)}
                        icon={<Image src={item.cursos_licono} width={50} height={50} alt={item.cursos_ltitulo} title={item.cursos_ltitulo} />}
                        key={faker.string.uuid()}

                      />
                    ))}
                  </Tabs>
                </Anim1>
                <Anim1>
                  <div className="inlineBlock cursosResp">
                    <div className="inlineBlock cursosSwiper">
                        {dataCursos &&
                          <HomeCoursesList data={dataCursos} />
                        }
                        <div className="lastCurso">
                          <a src="#" className="cursoItem">
                            <figure>
                              <Image src={lastCourse} width={50} height={50} alt="Galeria" title="Galeria"   />
                            </figure>
                          </a>
                        </div>
                    </div>
                  </div>
                </Anim1>
                <Anim1>
                  <div className="btnBox">
                    <Link href="/cursos/" className="btnSolid">
                      Ver más cursos <Image src={icoCursosBtn} width={20} height={20} alt="Ver más" />
                    </Link>
                  </div>
                </Anim1>
              </div>
            </div>
          </Container>
        </section>
        }

        {true &&
        <section className="secBox lessingCont">
          <div className="circleBackground circleBackPink"></div>
          <div className="circleBackground circleBackSkyblue"></div>
          <div className="circleBackground circleBackBlue"></div>
          <Container  maxWidth="xm">
            <div className="lessingBox">
              <Anim1>
                <div className="title">
                  {dataPage &&
                    dataPage.acf.bussines_titulo ?
                    <>
                      <h3><div dangerouslySetInnerHTML={{__html:dataPage.acf.bussines_titulo}}></div></h3>
                      <p>
                        {dataPage.acf.bussines_txt}
                      </p>
                    </>
                  :
                    <>
                      <h3><strong>lessin for business</strong> suma a tu empresa</h3>
                      <p>
                        Lessin for Business es una plataforma educativa digital que se enfoca en las necesidades de las empresas. Ofrecemos programas de <br />
                        capacitación personalizados para maximizar los beneficios empresariales. Nuestro contenido de calidad y herramientas prácticas se adaptan <br />
                        a las demandas cambiantes del mundo empresarial actual.
                      </p>
                    </>
                  }
                </div>
              </Anim1>
              
              <Anim1>
                <div className="lessingSwiper">
                  {dataPage &&
                    dataPage.acf.bussines_lista &&
                    dataPage.acf.bussines_lista.length > 0 &&
                  
                    <HomeBusiness data={dataPage.acf.bussines_lista}/>
                  }
                </div>
              </Anim1>
              
              <Anim1>
                <div className="inlineBlock lessingUpdate">
                  <div className="txt">
                    {dataPage &&
                        dataPage.acf.baner_texto &&
                        <p><div dangerouslySetInnerHTML={{__html:dataPage.acf.baner_texto}}></div></p>
                    }

                    <a href="#contacto" className='btnBorder'>
                      Contáctame 
                    </a>
                  </div>
                  <figure>
                    <Image src={lessingNote} width={50} height={50} alt="Cover banner" title="Cover banner" />
                  </figure>
                </div>
              </Anim1>
            </div>
          </Container>
        </section>
        }

        <section className="secBox docentesCont">
          <div className="circleBackground circleBackOrange2"></div>
          <div className="circleBackground circleBackPink2"></div>
          <Container maxWidth="xm">
            {dataPage &&
              <Anim1>
                <HomeDocentes data={dataPage} />
              </Anim1>
            }
          </Container>
        </section>
        <section id="contacto" className="secBox contactoCont">
          <Container maxWidth="xm">
              <div className="inlineFlex contactoBox">
                <Anim1>
                  <div className="title">
                    {dataPage &&
                      dataPage.acf.contacto_titulo &&
                      <h2><div dangerouslySetInnerHTML={{__html:dataPage.acf.contacto_titulo}}></div></h2>
                    }
                    {dataPage &&
                      dataPage.acf.contacto_stitulo &&
                      <h3><div dangerouslySetInnerHTML={{__html:dataPage.acf.contacto_stitulo}}></div></h3>
                    }
                    {dataPage &&
                      dataPage.acf.contacto_txt &&
                      <p><div dangerouslySetInnerHTML={{__html:dataPage.acf.contacto_txt}}></div></p>
                    }
                  </div>
                </Anim1>
                <Anim1>
                  <div className="contactoForm">
                    <form action="">
                      <div className="inlineFlex formRow">
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa tu nombre"
                            label="Nombres*"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa tus apellidos"
                            label="Apellidos*"
                            type="text"
                            InputLabelProps={{
                              shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                      </div>
                      <div className="inlineFlex formRow">
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa tu correo"
                            label="Correo corporativo*"
                            type="text"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa tu número"
                            label="Número de teléfono*"
                            type="text"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                      </div>
                      <div className="inlineFlex formRow">
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa tu empresa"
                            label="Nombre de tu empresa*"
                            type="text"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa la cantidad de trabajadores"
                            label="Número de Trabajadores*"
                            type="text"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                      </div>
                      <div className="inlineFlex formRow">
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa tu correo"
                            label="País de residencia*"
                            type="text"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                        <div className="formField">
                          <TextField
                            id="standard-number"
                            placeholder="Ingresa tu cargo"
                            label="Cargo*"
                            type="text"
                            InputLabelProps={{
                            shrink: true,
                            }}
                            variant="standard"
                          />
                        </div>
                      </div>
                      <div className="inlineFlex btnContacto">
                        <button type='submit'>Solicita una demo</button>
                      </div>
                    </form>
                  </div>
                </Anim1>
              </div>
          </Container>
        </section>
      </div>

      {dataPage &&
      <Modal
        open={openHomeTriler}
        onClose={handleCloseHomeTriler}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="introTrailer">
          <div className="itraiClose" onClick={handleCloseHomeTriler}>
          <CloseIcon/>
          </div>
          <iframe 
            src={"https://iframe.mediadelivery.net/embed/173572/"+dataPage.acf.video_intro+"?autoplay=true&loop=false&muted=false&preload=true" }
            loading="lazy" 
            allow="accelerometer;gyroscope;autoplay;encrypted-media;picture-in-picture;"></iframe>
        </div>
      </Modal>
      }
    </div>
  )
}
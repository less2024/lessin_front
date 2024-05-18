import '../../../styles/mis-cursos.scss';

import { useState,useContext, useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link';

// UI
import Container from '@mui/material/Container';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import icoUserInscritos from '../../../assets/img/ico_user_inscritos.png';
import icoUserCompletados from '../../../assets/img/ico_user_completados.png';
import icoUserObtenidos from '../../../assets/img/ico_user_obtenidos.png';

import InfoIcon from '@mui/icons-material/Info';


// Context 
import { userLessing } from "../../../context/user";
import { faker } from '@faker-js/faker';
import axios from 'axios';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import CertificadoPdf from '@/components/certificado/certificado';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '90%',
  maxWidth:700,
  bgcolor: 'background.paper',
  boxShadow: 24,
  p:0,
  overflow:'hidden',
  borderRadius:5
};

export default function MisDiplomas() {

    const { categoriesUniv,courseUniv,loginData } = useContext(userLessing);

    const [value, setValue] = useState(0);
    const [dataCursos, setDataCursos] = useState();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [tabResponsive,setTabResponsive] = useState(true);

    const openCategories = () =>{
        setTabResponsive((current) => !current);
    }

    // Get Docentes
    const [allDocentes,setAllDocentes] = useState([]);
    const getDocentes = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/docentes')
            .then((item)=>{
                setAllDocentes(item.resp)
            })
    }

    // Get information
    const [myCourses,setMyCourses] = useState([]);
    const [myCoursesFinish,setMyCoursesFinish] = useState([]);
    const getInfo = ()=>{
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/getCoursesUser',{
            user_id:loginData.idUser,
            course_company:loginData.company
        }).then((resp)=>{
            const myCoursesTmp = [];
            const myCoursesFinishTmp = [];
            resp.data.map((item)=>{
                console.log(item)
                if(item.course_state === "0"){
                    myCoursesTmp.push(item);
                }else{
                    myCoursesFinishTmp.push(item);
                }
            })
            setMyCourses(myCoursesTmp);
            setMyCoursesFinish(myCoursesFinishTmp);
        })
    }

    //resultCoursesTab
    const resultCoursesTab = (id) =>{
        const resultTabArray = [];
        if(id){
            if(courseUniv.length > 0){
                courseUniv.map((item)=>{
                    if(parseInt(item.categoria[0]) === parseInt(id)){
                        resultTabArray.push(item)
                    }
                })
            }
            setDataCursos(resultTabArray);
        }else{
            setDataCursos(courseUniv);
        }
    }

    // Certificados
    const [openCert, setOpenCert] = useState(false);
    const handleOpenCert = () => setOpenCert(true);
    const handleCloseCert = () => setOpenCert(false);

    // Data pdf
    const [pdfData,setPdfData] = useState({
        nombre:'',
        curso:'',
        docente:'',
        fecha:''
    });

    const loadDataPdf = (item) =>{
        setOpenCert(true);
        setPdfData({
            nombre:item.course_user_name,
            curso:item.course_name,
            docente:item.course_docente,
            fecha:item.course_end
        })
    }

    useEffect(()=>{
        getDocentes();
        getInfo();
        setDataCursos(courseUniv);
    },[courseUniv])    

    return (
        <div className="pageCont pageMisCursos inlineBlock">
            <section className="secBox misCursos">
                <div className="misCursosBackground">
                <div className="circleBack circlePink"></div>
                <div className="circleBack circleBlue"></div>
                </div>
                <Container maxWidth="xm">
                    <div className="misCursosBox">
                        <div className="title">
                            <h1>
                                <strong>Cursos</strong> <br />
                                aprende, mejora
                            </h1>
                        </div>
                        <div className="mcOptions">
                            <div className="mcOptionsList">
                            <Link href={'/dashboard/mis-cursos/'} className='btnWhite'>
                                    Mis cursos
                                </Link>
                                <Link href={'/dashboard/mis-cursos/mis-diplomas'} className='btnWhite active'>
                                    Mis diplomas
                                </Link>
                                <Link href={'/dashboard/mis-cursos/catalogo'} className='btnWhite'>
                                    Explorar cursos
                                </Link>
                            </div>
                            <div className="mcInfo">
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


                        <div className="inlineBlock cursosTab">
                            <div className="btnRespTabList" onClick={openCategories}>
                                Categorías <ArrowForwardIosRoundedIcon/>
                            </div>
                            <Tabs value={value} onChange={handleChange}  className={tabResponsive == false ? 'cursosTabMenu':'cursosTabMenu cursosTabMenuHide'} centered>
                                <Tab
                                    label="Todos" 
                                    onClick={()=>resultCoursesTab(null)}
                                    key={faker.string.uuid()}
                                />
                                {categoriesUniv &&
                                    categoriesUniv.length > 0 &&
                                    categoriesUniv.map((item)=>(
                                    <Tab 
                                        label={item.name} 
                                        iconPosition="start" 
                                        onClick={()=>resultCoursesTab(item.id)}
                                        icon={<Image src={item.acf.catcur_icono} width={50} height={50} alt={item.name} title={item.name} />}
                                        key={faker.string.uuid()}
                                    />
                                ))}
                            </Tabs>
                            <div className="inlineBlock cursosResp">
                                <div className="inlineBlock cursosRespBox">
                                    {myCoursesFinish.length > 0 ?
                                        myCoursesFinish.map((item)=>(
                                            <div className="diplomaItem">
                                                <figure>
                                                    
                                                </figure>
                                                <div className="txt">
                                                    <h4>{item.course_name}</h4>
                                                    <div className="iniEnd">
                                                        <div className="date">
                                                            <p>
                                                                Inicio: {item.course_ini}<br />
                                                                Fin: {item.course_end}
                                                            </p>
                                                        </div>
                                                        <a href="#" onClick={()=>loadDataPdf(item)} className='btnWhite'>
                                                            Ver diploma
                                                        </a>
                                                    </div>
                                                </div>
                                            </div>
                                        ))
                                    :
                                        <div className="inlineFlex coursesEmpty">
                                            <p><InfoIcon /> No encontramos resultados</p>
                                        </div>
                                    }
                                </div>
                            </div>
                            <Modal
                                open={openCert}
                                onClose={handleCloseCert}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                            >
                                <Box sx={style}>
                                    <CertificadoPdf name={pdfData.nombre} course={pdfData.curso} docente={pdfData.docente} fecha={pdfData.fecha} closeModal={handleCloseCert} />
                                </Box>
                            </Modal>
                        </div>
                    </div>

                </Container>
            </section>
        </div>
    )
}
  
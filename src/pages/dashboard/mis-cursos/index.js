import '../../../styles/mis-cursos.scss';

import { useState,useContext, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';

// Context 
import { userLessing } from "../../../context/user";
import { faker } from '@faker-js/faker';

// UI
import Container from '@mui/material/Container';
//import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';


import icoUserInscritos from '../../../assets/img/ico_user_inscritos.png';
import icoUserCompletados from '../../../assets/img/ico_user_completados.png';
import icoUserObtenidos from '../../../assets/img/ico_user_obtenidos.png';

import InfoIcon from '@mui/icons-material/Info';

// Curos
import CardCatalogo from '@/components/card/Catalogo';
import axios from 'axios';




export default function MisCursos() {

    const { categoriesUniv,courseUniv,loginData } = useContext(userLessing);

    const [value, setValue] = useState(0);
    const [dataCursos, setDataCursos] = useState([]);

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [tabResponsive,setTabResponsive] = useState(true);

    const openCategories = () =>{
        setTabResponsive((current) => !current);
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

    useEffect(()=>{
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
                                <Link href={'/dashboard/mis-cursos/'} className='btnWhite active'>
                                    Mis cursos
                                </Link>
                                <Link href={'/dashboard/mis-cursos/mis-diplomas'} className='btnWhite '>
                                    Mis diplomas
                                </Link>
                                <Link href={'/dashboard/mis-cursos/catalogo'} className='btnWhite '>
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
                                {dataCursos &&
                                <div className="inlineFlex cursosRespBox">
                                    
                                    {dataCursos.length > 0 &&
                                        dataCursos.map((courseItem)=>{
                                            return (
                                                <>
                                                    {
                                                        myCourses.length > 0 &&
                                                        myCourses.map((myCourseItem)=>{
                                                            if(parseInt(courseItem.id) === parseInt(myCourseItem.course_id)){
                                                                return(
                                                                    <div className="cursoItemGal">
                                                                        <CardCatalogo data={courseItem} categories={categoriesUniv} direct={true} />
                                                                    </div>  
                                                                )
                                                            }
                                                        })
                                                    }
                                                </>
                                            )
                                        })
                                    }

                                    {myCourses.length  === 0 &&
                                    
                                        <div className="inlineFlex coursesEmpty">
                                            <p><InfoIcon /> No encontramos resultados</p>
                                        </div>
                                    }
                                    

                                </div>
                                }
                            </div>

                        </div>
                    </div>
                </Container>
            </section>
        </div>
    )
}
  
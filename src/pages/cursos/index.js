import '../../styles/cursos2.scss';

import { useState,useContext,useEffect } from 'react';

import Image from 'next/image';
import Link from 'next/link'

// UI
import Container from '@mui/material/Container';
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import icoStart from '../../assets/img/ico_curso_star.svg';
import icoCursoStudent from '../../assets/img/ico_curso_student.svg';

// Context 
import { userLessing } from "../../context/user";
import { faker } from '@faker-js/faker';

import inicio_curso1 from '../../assets/img/inicio_curso1.png';

/*
function CustomTabPanel(props) {
    const { children, value, index, ...other } = props;
    
    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
            <div className='inlineBlock'>{children}</div>
        )}
      </div>
    );
}
  
CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};
*/


export default function Catalogo() {

    const { categoriesUniv,courseUniv } = useContext(userLessing);
    const [value, setValue] = useState(0);
    const [dataCursos, setDataCursos] = useState();

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };

    const [tabResponsive,setTabResponsive] = useState(true);

    const openCategories = () =>{
        setTabResponsive((current) => !current);
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
        setDataCursos(courseUniv);
    },[courseUniv])

    return (
        <div className="pageCont pageMisCursos inlineBlock">
            <section className="secBox misCursos">
                <div className="misCursosBackground">
                    <div className="circleBack circlePink"></div>
                    <div className="circleBack circleBlue"></div>
                </div>
                <div className="inlineBlock pdcBlockMenu"></div>
                <Container maxWidth="xm">
                    <div className="misCursosBox">
                        <div className="inlineBlock pcdBread pcdBread2">
                            <Link href={'/'}>Inicio</Link>
                        </div>
                        <div className="title">
                            <h1>
                                <strong>Cursos</strong> <br />
                                todo nuestro catálogo, para ti
                            </h1>
                        </div>
                        <div className="mcOptions">
                        </div>

                        <div className="inlineBlock cursosTab">
                            <div className="btnRespTabList" onClick={openCategories}>
                                Categorías <ArrowForwardIosRoundedIcon/>
                            </div>
                            <Tabs value={value} onChange={handleChange}  className={tabResponsive == false ? 'cursosTabMenu':'cursosTabMenu cursosTabMenuHide'} centered>
                                <Tab label="Todos"
                                    onClick={()=>resultCoursesTab(null)}
                                    key={faker.string.uuid()}
                                />
                                {categoriesUniv &&
                                    categoriesUniv.length > 0 &&
                                    categoriesUniv.map((item) => (
                                    <Tab label={item.name}
                                        iconPosition="start" 
                                        onClick={()=>resultCoursesTab(item.id)}
                                        icon={<Image src={item.acf.catcur_icono} width={50} height={50} alt={item.name} title={item.name} />}
                                        key={faker.string.uuid()}
                                    />
                                ))}
                            </Tabs>
                            <div className="inlineBlock cursosResp">
                                {dataCursos &&
                                    <div className="inlineBlock cursosHomeRespBox">
                                        {dataCursos.map((item)=>{
                                            return (
                                                <Link href={'/cursos/'+item.slug} className="cursoItemGalWhite">
                                                    <figure>
                                                        <Image src={item.acf.imagen_catalogo ? item.acf.imagen_catalogo : inicio_curso1 } alt={item.title.rendered} width={50} height={50} title={item.title.rendered} />
                                                        <figcaption>
                                                        <div className="item">
                                                            <Image src={icoStart} /> {item.acf.pcurso_valoracion}
                                                        </div>
                                                        <div className="item">
                                                            <Image src={icoCursoStudent} /> {item.acf.pcurso_estudiantes} estudiantes
                                                        </div>
                                                        </figcaption>
                                                    </figure>
                                                    <div className="txt">
                                                        <div className="catList">
                                                            {categoriesUniv &&
                                                                item.categoria.length > 0 &&
                                                                categoriesUniv.map((catItem)=>{
                                                                if(catItem.id === item.categoria[0]){
                                                                    return (
                                                                        <a href=""  key={faker.string.uuid()}>{catItem.name}</a>
                                                                    )
                                                                }
                                                            })}
                                                        </div>
                                                        <h4>{item.title.rendered}</h4>
                                                        <p>Por <strong>{item.acf.pcurso_profesor}</strong></p>
                                                        <div className='btnCurso'>
                                                            Detalles del curso
                                                        </div>
                                                    </div>
                                                </Link>
                                            );
                                        })}
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
  
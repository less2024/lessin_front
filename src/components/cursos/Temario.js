// Css
import '../../assets/css/components/cursos/Temario.scss'

import Image from 'next/image';
import { faker } from '@faker-js/faker';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

import ico_det_curso_cont3 from '../../assets/img/ico_det_curso_cont3.png';

const CursosTemas = ({data}) => {



    return (
        <div className="inlineBlock pdcdTemario">
            <h3>
                Temario
            </h3>
            {data &&
                <div className="pdcTemarioAcordion">
                    {
                        data.map((item)=>{

                        return (
                            <Accordion  key={faker.string.uuid()} defaultExpanded={true} >
                                <AccordionSummary
                                expandIcon={<ExpandMoreIcon />}
                                aria-controls="panel1a-content"
                                id="panel1a-header"
                                >
                                    <h4>{item.pcurso_temario_titulo ? item.pcurso_temario_titulo : '--'}</h4>
                                    {item.pcurso_temario_lista &&
                                        item.pcurso_temario_lista.length >0  &&
                                        <h4>{item.pcurso_temario_lista.length} clases</h4>
                                    }
                                </AccordionSummary>
                                <AccordionDetails>
                                    {item.pcurso_temario_lista &&
                                    <ul>
                                        {item.pcurso_temario_lista.map((subItem)=>{
                                            return (
                                                <li key={faker.string.uuid()}>
                                                    <Image src={ico_det_curso_cont3}  width={50} height={50} alt={subItem.pcurso_temario_ltitulo ? subItem.pcurso_temario_ltitulo:'--'} title={subItem.pcurso_temario_ltitulo ? subItem.pcurso_temario_ltitulo:'--'}/>
                                                    {subItem.pcurso_temario_ltitulo ? subItem.pcurso_temario_ltitulo:'--'}
                                                </li>
                                            )
                                        })}
                                    </ul>
                                    }
                                </AccordionDetails>
                            </Accordion>
                            )
                        })
                    }
                </div>
            }
        </div>
    )
};

export default CursosTemas;
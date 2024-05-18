// Css
import '../../assets/css/components/cursos/Preguntas.scss'

import Image from 'next/image';
import { faker } from '@faker-js/faker';

import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';


const CursosPreguntas = ({data}) => {

    return (
        <div className="inlineBlock pdcdFaq">
            <h3>Preguntas frecuentes</h3>

            {data &&
            <div className="pdcFaqAcordion">
                {data.length > 0 &&
                
                data.map((item)=>{
                    return(
                    <Accordion  key={faker.string.uuid()} defaultExpanded={true} >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <h4>{item.pcurso_ptitulo ? item.pcurso_ptitulo : 'No title'}</h4>
                        </AccordionSummary>
                        <AccordionDetails>
                            <p>{item.pcurso_prespuesta ? item.pcurso_prespuesta : 'No respuesta'}</p>
                        </AccordionDetails>
                    </Accordion>
                    )
                })}
            </div>
            }
        </div>
    )
};

export default CursosPreguntas;
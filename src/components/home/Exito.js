import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";
import { useEffect,useState } from "react";
import Image from 'next/image'

const boxVariant = {
    visible:{
      opacity:1,
      y:0,
      transition:{
        duration:0.3
      }
    },
    hidden:{
      opacity:0,
      y:80
    },
};

// Experiencia
import exp1 from '../../assets/img/ico_cert.png';
import exp2 from '../../assets/img/ico_alumno.png';
import exp3 from '../../assets/img/ico_estudiantes.png';
import exp4 from '../../assets/img/ico_star.png';

const HomeExito = () => {
  const control = useAnimation();
  const [ref, inView] = useInView();
  const [animateCount,setAnimateCount] = useState(false);

  const [satisfaction,setStatisfaction] = useState(0);
  const [studentRegister,setStudentRegister] = useState(0);
  const [certifiedSend,setCertifiedSend] = useState(0);
  const [startQuality,setStartQuality] = useState(0);
  

  function animateValue( start, end, start2,end2,start3,end3,start4,end4,  duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      setStatisfaction(Math.floor(progress * (end + start) + start));
      setStudentRegister(Math.floor(progress * (end2 + start2) + start2));
      setCertifiedSend(Math.floor(progress * (end3 + start3) + start3));
      setStartQuality(Math.floor(progress * (end4 + start4) + start4));
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
      
    };
    window.requestAnimationFrame(step);
  }

  useEffect(() => {
    if (inView) {
      control.start("visible");
      animateValue(0, 98, 0,150 , 0,40,0,4 ,900);
      setAnimateCount(false);
    } else {
      control.start("hidden");
      setAnimateCount(true);
    }
  }, [control, inView]);

  return (
    <motion.div
      className="box"
      ref={ref}
      variants={boxVariant}
      initial="hidden"
      animate={control}
    >

        <div className="experienceList">
            <ul>
                <li>
                    <div className="box">
                        <Image src={exp2} width={50} height={50} alt="Estudiantes registrados" title="Estudiantes registrados" />
                        <div className="txt">
                            <h4 className={animateCount ? '' : 'counterRemove'}>+{studentRegister},000</h4>
                            <p>Estudiantes registrados</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="box">
                        <Image src={exp4} width={50} height={50} alt="calificaciones" title="calificaciones"/>
                        <div className="txt">
                            <h4 className={animateCount ? '' : 'counterRemove'}>{startQuality}.2/5</h4>
                            <p>En nuestras calificaciones</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="box">
                        <Image src={exp3} width={50} height={50} alt="De satisfacción en alumnos" title="De satisfacción en alumnos"/>
                        <div className="txt">
                            <h4 className={animateCount ? '' : 'counterRemove'}>{satisfaction}%</h4>
                            <p>De satisfacción en alumnos</p>
                        </div>
                    </div>
                </li>
                <li>
                    <div className="box">
                        <Image src={exp1} width={50} height={50} alt="Certificados entregados" title="Certificados entregados"/>
                        <div className="txt">
                            <h4 className={animateCount ? '' : 'counterRemove'}>+{certifiedSend},000</h4>
                            <p>Certificados entregados</p>
                        </div>
                    </div>
                </li>
            </ul>
        </div>

    </motion.div>
  );
};

export default HomeExito;
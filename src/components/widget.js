import { useState } from 'react';
import Image from 'next/image';

import widgetBot from '../assets/img/widgetBot.png';
import icoWhatsapp from '../assets/img/ico_whatsapp.png';
import widgetLogo from '../assets/img/chagLogo.png';

const Widget = () => {

    const [widgetStatu,setWidgetStatus] = useState(false);

    const openWidget = () =>{
    
        setWidgetStatus((current) => !current);
    }

    return (
        <div className={widgetStatu ? 'widgetCont widgetContActive' : 'widgetCont'}>
            <div className="widgetBoxIco" onClick={openWidget}>
                <svg width="46" height="47" viewBox="0 0 46 47" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M16.4899 13.1872H16.5159M29.5107 13.1872H29.5368M16.4899 23.6038C17.3385 24.47 18.3515 25.1581 19.4694 25.6278C20.5873 26.0976 21.7877 26.3395 23.0003 26.3395C24.2129 26.3395 25.4133 26.0976 26.5312 25.6278C27.6492 25.1581 28.6621 24.47 29.5107 23.6038M2.16699 44.4372V10.583C2.16699 8.511 2.99009 6.52386 4.45522 5.05874C5.92035 3.59361 7.90749 2.77051 9.97949 2.77051H36.0212C38.0932 2.77051 40.0803 3.59361 41.5454 5.05874C43.0106 6.52386 43.8337 8.511 43.8337 10.583V26.208C43.8337 28.28 43.0106 30.2671 41.5454 31.7323C40.0803 33.1974 38.0932 34.0205 36.0212 34.0205H12.5837L2.16699 44.4372Z" stroke="white" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
            </div>
            <div className={widgetStatu ?'widgetBox widgetBoxActive':'widgetBox'}>
                <div className="widgetClose" onClick={openWidget}>
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M8.5 1.5L1.5 8.5M1.5 1.5L8.5 8.5" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>

                </div>
                <h3>¡Hola! ¿En qué podemos ayudarte?</h3>
                <figure>
                    <Image src={widgetBot} alt="Help" title="Help"/>
                </figure>
                <h4>¡No te preocupes!</h4>
                <p>Nosotros nos hacemos cargo de tus consultas</p>

                <small>
                    Nuestro equipo de asesores está listo para <br />
                    responder todas tus preguntas y brindarte la <br />
                    ayuda que necesitas.
                </small>

                <a href="https://api.whatsapp.com/send?phone=51913898958" target='_blank' className="btnWhatsapp">
                    Escríbenos aquí
                    <Image src={icoWhatsapp} alt="Whatsapp" title="Whatsapp"/>
                </a>
                <div className="widgetLogo">
                    <Image src={widgetLogo} alt="Widget Chat" title="Widget Chat" />
                </div>

            </div>
        </div>
    )
};

export default Widget;
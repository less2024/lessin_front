import '../assets/css/components/footer.scss';

import {useState} from 'react';
import { faker } from '@faker-js/faker';

import Image from 'next/image';
import Link from 'next/link';

import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';


import lessing_copy from '../assets/img/lessing_copy.png';
import { useEffect } from 'react';
import axios from 'axios';


const Footer = () => {

    const [open, setOpen] = useState(false);
    const [termModal,setTermModal] = useState(false);
    const [polModal,setPolModal] = useState(false);
    const [dataConfig,setDataConfig] = useState();


    const handleClickOpen = () => {
        setTermModal(false);
        setPolModal(false);
        setOpen(true);
    };
  
    const handleClose = () => {
        setTermModal(false);
        setPolModal(false);
        setOpen(false);
    };

    const termdHandleClickOpen = () => {
        setOpen(false);
        setPolModal(false);
        setTermModal(true);
    };
    
    const termdHandleClose = () => {
        setOpen(false);
        setPolModal(false);
        setTermModal(false);
    }

    const polHandleClickOpen = () => {
        setOpen(false);
        setTermModal(false);
        setPolModal(true);
    };
    
    const polHandleClose = () => {
        setOpen(false);
        setTermModal(false);
        setPolModal(false);
    }

    const getConfig = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/pages/228')
            .then((resp)=>{
                setDataConfig(resp.data)
            })
    }

    useEffect(()=>{
        getConfig();
    },[])




    return (
        <footer className="inlineBlock footerCont">
            <Container>
                <div className="inlineFlex footerBox">
                    <div className="footerItem footerItem2">
                        <div className="title">
                            <h3>
                                <strong>tu equipo</strong> <br />
                                aprende, <br />
                                <strong className='pink'>tu empresa</strong> <br />
                                mejora
                            </h3>
                        </div>
                    </div>
                    <div className="footerItem">
                        <h4>Categorías</h4>
                        {dataConfig &&
                            dataConfig.acf.footer_categorias_lista &&
                            dataConfig.acf.footer_categorias_lista.length > 0 &&
                        
                            <ul>
                                {dataConfig.acf.footer_categorias_lista.map((item)=>(
                                    <li key={faker.string.uuid()}>
                                        <a href={'/cursos/'+item.footer_categorias_lslug}>{item.footer_categorias_lcat}</a>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>

                    <div className="footerItem footerItemSkyblue">
                        <h4>Legales</h4>
                        <ul>
                            <li>
                                <a onClick={termdHandleClickOpen}>Términos y Condiciones</a>
                            </li>
                            <li>
                                <a onClick={polHandleClickOpen}>Política de Privacidad</a>
                            </li>
                            <li>
                                <a onClick={handleClickOpen}>Política de Cookies</a>
                            </li>
                            <li>
                                <Link href="libro-de-reclamos">
                                    Libro de Reclamaciones
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div className="footerItem footerItemBlue">
                        <h4>Redes Sociales</h4>
                        {dataConfig &&
                            dataConfig.acf.footer_sociales_lista &&
                            dataConfig.acf.footer_sociales_lista.length > 0 &&
                        
                            <ul>
                                {dataConfig.acf.footer_sociales_lista.map((item)=>(
                                
                                    <li key={faker.string.uuid()}>
                                        <a href={item.footer_sociales_llink} target='_blank'>
                                            <Image src={item.footer_sociales_licono} width={50} height={50} alt={item.footer_sociales_lnombre} title={item.footer_sociales_lnombre} /> 
                                            {item.footer_sociales_lnombre}
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        }
                    </div>
                </div>
            </Container>
            <div className="inlineBlock copyRight">
                <Container maxWidth="xm">
                    <div className="inlineFlex copyRightBox">
                        <div className="copyLessing">
                            <Image src={lessing_copy} width={50} height={50} alt='Copyright' title='Copyright' />
                        </div>
                        <div className="txt">
                            <p>© 2023 Lessin. Todos los derechos reservados.</p>
                            
                        </div>
                    </div>
                </Container>
            </div>


            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="inlineFlex termCont">
                    <div className="inlineBlock termBox">
                        <div className="termTxt">
                            <p>
                                <strong>El uso de Cookies:</strong> <br />
                                Al momento de navegar por nuestra web, se almacenan “cookies” en tu ordenador, por eso debes leer nuestra política de cookies para ampliar información sobre el uso de estas y cómo puedes gestionarlas.
                            </p>
                            <p>
                                <strong>Al activar tu suscripción, debes saber que:</strong> <br />
                                Desde tu suscripción donde nos facilitas tu nombre de usuario y correo electrónico, asumimos que los datos personales facilitados a través de los diferentes formularios son veraces, puedes comunicar cualquier modificación de los mismos.
                                Asimismo, asumimos que toda la información facilitada corresponde a tu situación real, que está puesta al día y es exacta.
                            </p>
                        </div>
                        <div className="inlineBlock termBtn">
                            <a onClick={handleClose} className='btnSolid'>Entiendo</a>
                            <div className="inlineBlock termLinks">
                                <a href="#">Términos y Condiciones</a> <span>|</span>
                                <a href="#">Políticas de Privacidad</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>


            <Dialog
                open={termModal}
                onClose={termdHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="inlineFlex termCont termCont2">
                    <div className="inlineBlock termBox">
                        <div className="termTxt">
                            <p>
                                <strong>Bienvenido a <a href="https://lessin.pe/" target='_blank'>https://lessin.pe/</a></strong>
                            </p>
                            <p>
                                Estos términos y condiciones describen las reglas y regulaciones para el uso del sitio web https://lessin.pe/
                                Al acceder a este sitio web, asumimos que <strong>aceptas estos términos y condiciones en su totalidad.</strong> No continúes usando el sitio web <strong>Lessin si no aceptas todos los términos y condiciones</strong> establecidos en esta página.
                            </p>
                            <h4>POLÍTICA DE CONTRATACIONES</h4>
                            <p>
                                Esta política de contrataciones, solo es aplicable si ya has comprado en <strong>LESSIN</strong>, a través de nuestro sitio web. Por eso, el presente documento contiene los términos de las políticas de devoluciones, bajo los cuales en <strong>LESSIN</strong>, nos comprometemos a respetar y cuidar tus derechos como consumidor, según los lineamientos establecidos en el Código de Protección y Defensa del Consumidor; así que, tenemos la satisfacción de informar los aspectos legales, tus derechos y obligaciones desde el momento en que compras en esta web.
                            </p>
                            <p><strong>Identificación del vendedor</strong></p>
                            <p>En virtud de lo establecido en la Ley Nº 29571, de Código de Protección y Defensa del Consumidor, se ofrece la siguiente información:</p>
                            <ul>
                                <li>La Razón Social del proveedor es: INSTITUTO SUPERIOR DE SISTEMAS EMPRESARIALES Y GUBERNAMENTALES – ISSEG</li>
                                <li>El RUC: 20607132241</li>
                                <li>La dirección del domicilio fiscal es: Av. Francisco torres 410, Urbanización Tungasuca</li>
                            </ul>
                            <p><strong>Objeto del Contrato</strong></p>
                            <p>
                                La presente política de contrataciones tiene por objeto regular la relación contractual de compra venta nacida entre LESSIN y el cliente en el momento en que este acepta durante el proceso de contratación online la casilla correspondiente. <br />
                                Esta web ofrece la posibilidad de contratar cursos en formato digital y descargables. Desde el momento de la aceptación, el usuario adquiere la condición de cliente de LESSIN <br />
                                La relación contractual de compraventa conlleva la entrega, a cambio de un precio determinado y públicamente expuesto a través del sitio <web className="br"></web>
                                Como condición para contratar alguno de los cursos ofrecidos por <strong>LESSIN</strong>, el Usuario debe contactar a través de la web https://enpp.edu.pe y proporcionar la información correspondiente a su solicitud completando el formulario correspondiente.
                            </p>
                            <p><strong>Política de devoluciones</strong></p>
                            <p>
                                El internet también tenemos el deber de respetar las normas que tutelan tus derechos y los nuestros, por eso, en Defensa de los Consumidores y Usuarios te informamos que, en lo referido a cursos, por ser un producto digital, sin soporte material de entrega presencial, se realizan devoluciones, solo bajo las siguientes situaciones, además debes de tener presente lo siguiente:
                            </p>
                            <ul>
                                <li>
                                    <strong>Del cliente:</strong> Desde el momento en que un usuario realiza una compra en LESSIN , pasa a convertirse de un usuario visitante a un cliente
                                </li>
                                <li>
                                    <strong>El uso de Cookies:</strong> Al momento de navegar por nuestra web, se almacenan “cookies” en tu ordenador, por eso debes leer nuestra política de cookies para ampliar información sobre el uso de estas y cómo puedes gestionarlas.
                                </li>
                                <li>
                                    <strong>Cursos digitales:</strong> El cliente desde el momento que realiza la compra de los cursos de descarga digital que son de venta final, es decir, los que al ser pagados automáticamente se realiza la entrega digitalmente, una vez facilitado el acceso a curso digital es tuyo para siempre para tu uso y disfrute por lo que no podemos ofrecer devolución del importe pagado.
                                </li>
                            </ul>
                            <p>
                                Solo los cursos y/o productos que especifiquen claramente en la descripción del mismo que tienen garantía de devolución son susceptibles de dicha devolución si se cumplen las condiciones citadas en la misma garantía. <br />
                                Esta siempre será claramente visible en la página de compra y descripción del producto, servicio o curso por lo que el comprador puede y debe leer la garantía antes de realizar el pago.
                            </p>
                            <p><strong>Descargo de responsabilidad</strong></p>
                            <p>
                                En reciprocidad a tu confianza, somos totalmente honestos contigo, explicándote a detalle todo lo que sucede desde el momento en que contratas los servicios de <strong>LESSIN</strong> o uno de mis infoproductos, a través del sitio web. <br />
                                Primero debes saber que no creemos ni propiciamos promesas de hacerte rico fácil y rápido y sin ningún esfuerzo de tu parte. <br />
                                Somos conscientes que todo éxito para lograr tus objetivos conlleva un trabajo detrás y los resultados no solo dependen de nosotros, sino también del tiempo que empleas y si pones en práctica o no nuestros lo aprendido en cada una de las lecciones del curso y recomendaciones. <br />
                                Sin embargo por sí solas no pueden ofrecerte resultados, si no las usas estratégicamente como te enseñamos y de la misma forma si solo aplicamos nuestros consejos y no tomas en cuenta las herramientas que te sugerimos, no podemos tener garantizar los mismos resultados.
                            </p>
                            <p><strong>Propiedad intelectual</strong></p>
                            <p>
                                El sitio web de propiedad de <strong>LESSIN</strong> y todo su contenido (incluyendo – pero no limitado a – posts, imprimibles, ebooks, cursos, vídeos, etc.) contienen propiedad intelectual de propiedad de <strong>LESSIN</strong>, incluidas marcas de comercio, derechos de autor, información propietaria y otros derechos. <br />
                                Por lo tanto, de los productos que adquieres no puedes modificar, publicar, transmitir, participar en la transferencia o venta, crear obras derivativas, plagiar, copiar, hacer pasar el trabajo como tuyo, distribuir, exhibir, reproducir, o de ninguna manera explotar de ninguna forma y en ningún formato ninguna parte del contenido de este sitio, sus servicios o cualquier propiedad intelectual, en todo ni en parte, sin nuestro consentimiento previo. <br />
                                El contenido que incluye cada uno de los cursos de <strong>LESSIN</strong> es de autoría de sus tutores y solo ellos pueden disponer de los derechos morales y considerar y se exhiben en la plataforma de <strong>LESSIN</strong> por la cesión de derechos patrimoniales sobre el contenido creado exclusivamente para <strong>LESSIN</strong>. <br />
                                A consecuencia en <strong>LESSIN</strong> si te encontramos transgrediendo los derechos de propiedad intelectual, nos reservamos el derecho de removerte inmediatamente de nuestros cursos, sin tener la obligación de reembolso, si eres descubierto violando nuestra propiedad intelectual y demandarte antes los tribunales correspondientes.
                            </p>
                            <p><strong>Del servicio de post venta</strong></p>
                            <p>
                                Este servicio es brindado por nuestro equipo de atención y bienestar del consumidor y nació con la finalidad de brindar una mejor experiencia al cliente y atender las necesidades que tienen nuestros después de haber realizado compras en nuestras webs. <br />
                                El personal asignado para la atención post venta, es asignado aleatoriamente en <strong>LESSIN</strong> y no será exclusivo de una persona en específico, por lo tanto, el usuario puede darse por satisfecho, con la prestación del servicio prestado por cualquier persona asignada de nuestro equipo de atención y satisfacción del usuario. <br />
                                Recuerda que solo los cursos y/o productos que especifiquen claramente en la descripción del mismo que tienen garantía de devolución son susceptibles de dicha devolución si se cumplen las condiciones citadas en la misma garantía. <br />
                                En otros casos, la devolución solo será aceptada si se cumplen todas las siguientes condiciones: el curso fué comprado por error, no se descargó ni consumió ningún tipo de contenido ni ninguna clase, han pasado menos de 7 días naturales desde la compra hasta la solicitud de devolución. Si alguna de estas condiciones no se cumple, no será posible concretar la devolución.
                            </p>
                        </div>
                        <div className="inlineFlex termBtn">
                            <a onClick={handleClose} className='btnSolid'>Entiendo</a>
                            <div className="inlineBlock termLinks">
                                <a href="#">Términos y Condiciones</a> <span>|</span>
                                <a href="#">Políticas de Privacidad</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>

            <Dialog
                open={polModal}
                onClose={polHandleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <div className="inlineFlex termCont termCont2">
                    <div className="inlineBlock termBox">
                        <div className="termTxt">
                            <p>
                                La política de privacidad en <a href="https://www.lessin.pe/" target='_blank'>https://www.lessin.pe/</a> es conforme lo dispuesto en la normativa vigente de protección de tus derechos, en aplicación de la Ley Nº 29733 que regula la Protección de Datos Personales, su reglamento Decreto Supremo N° 003-2013-JUS y la Ley N° 28493 que regula el uso de correo electrónico comercial no solicitado de la legislación peruana.
                            </p>
                            <p><strong>Identificación del responsable de los datos personales</strong></p>
                            <p>
                                El dominio y el sitio <a href="https://www.lessin.pe/" target='_blank'>https://www.lessin.pe/</a> es propiedad de INSTITUTO SUPERIOR DE SISTEMAS EMPRESARIALES Y GUBERNAMENTALES, identificado con RUC: 20607132241, en Lima – Perú, en lo siguiente (<strong>LESSIN</strong>), manifiesta en la presente POLÍTICA DE PRIVACIDAD el tipo de tratamiento de datos personales que recolectamos. <br />
                                <strong>LESSIN</strong>, se reserva el derecho a modificar la POLÍTICA DE PRIVACIDAD, su presentación, configuración y contenido del mismo, así como las condiciones requeridas para su acceso, navegación y uso. Después de la entrada en vigor de sus modificaciones o cambios suponen la aceptación de los mismos. <br />
                                <strong>LESSIN</strong>, se compromete a garantizar el derecho fundamental a la protección de datos personales de los usuarios registrados en nuestra lista de correos, clientes, y demás usuarios, implementando mecanismos y medidas técnicas, organizativas y legales que permiten proteger y resguardar su información personal. De esta forma, <strong>LESSIN</strong> se alinea a la Ley No 29733. Ley de Protección de Datos Personales. <br />
                                <strong>LESSIN</strong> es responsable del tratamiento de datos personales, y solo recolecta los datos que nos proporcionas voluntariamente, que serán almacenados por Cpanel, la plataforma de email marketing que usamos actualmente, este proveedor se encuentra ubicado en Europa y lo hemos elegido por su seriedad con el tratamiento de tus datos personales. <br />
                                El tratamiento de datos se efectuará únicamente con tu consentimiento, previa confirmación de la suscripción en la casilla de envío de información además de proporcionar información exclusiva y promociones, mantener contacto directo con los usuarios de la web, según lo contemplado en la ley de Protección de datos Personales y su reglamento en Perú.
                            </p>
                            <p><strong>¿Cómo se recolectan tus datos personales?</strong></p>
                            <p>
                                En los formularios de suscripción vas a encontrar la casilla para activar la suscripción, en los cuales puedes elegir suscribirte según tus preferencias y necesidades.
                            </p>
                            <ul>
                                <li>
                                    <strong>Función de comentarios del contenido:</strong> Si abrimos comentarios en algún contenido, cuenta con un formulario que puedes usar para publicar tus comentarios o preguntas, por lo tanto, antes de ser públicos los comentarios pasan por un filtro de aprobación, además de ello tienes la opción de elegir si se guarda o no tu nombre, correo electrónico y sitio web en este navegador para la próxima vez que hagas un comentario, si quieres recibir un email con los siguientes comentarios a la entrada, y si deseas recibir o no un email con cada nueva entrada, además los datos que proporcionas para realizar comentarios solo son exclusivamente usados para ese fin.
                                </li>
                                <li>
                                    <strong>El uso de Cookies:</strong> Al momento de navegar por nuestra web, se almacenan “cookies” en tu ordenador, por eso debes leer nuestra política de cookies para ampliar información sobre el uso de estas y cómo puedes gestionarlas.
                                </li>
                                <li>
                                    <strong>Al activar tu suscripción, debes saber que:</strong> Desde tu suscripción donde nos facilitas tu nombre de usuario y correo electrónico, asumimos que los datos personales facilitados a través de los diferentes formularios son veraces, puedes comunicar cualquier modificación de los mismos. Asimismo, asumimos que toda la información facilitada corresponde a tu situación real, que está puesta al día y es exacta.
                                </li>
                            </ul>
                            <p><strong>Legitimidad de los datos recogidos</strong></p>
                            <p><strong>LESSIN</strong> recoge y utiliza muchos tipos de información procedentes de un amplio rango de fuentes para diferentes propósitos.</p>
                            <p>	
                                Entre ellos se encuentran incluidos, pero no limitados, a los siguientes:
                            </p>
                            <ul>
                                <li>
                                    Promover y prestar los servicios contratados, siempre salvaguardando la privacidad de los interesados
                                </li>
                                <li>
                                    Innovar y mejorar los servicios que ofrecemos a los interesados ofreciéndoles una experiencia de uso más personalizada, así como la oferta de cursos y los datos recolectados sean de fácil acceso del titular de los datos. servicios que mejor se ajuste a sus necesidades y hábitos del interesado.
                                </li>
                                <li>
                                    Seleccionar y gestionar a nuestros empleados y colaboradores.
                                </li>
                            </ul>
                            <p><strong>Seguridad e integridad de los datos personales</strong></p>
                            <p>
                                Gestionamos y almacenamos de forma responsable la información de nuestros clientes, manteniéndola segura. <br />
                                Nuestra política de privacidad establece los niveles de seguridad requeridos dentro de los procesos de creación, lanzamiento de nuestros cursos e inscripción de nuestros alumnos en los mismos, para preservar la protección y la integridad de los datos de nuestros clientes e interesados. <br />
                                Esta Política se persigue la adopción de acciones destinadas a preservar los cuatro componentes básicos de la seguridad aplicados a la información:
                            </p>
                            <ul>
                                <li>
                                    Confidencialidad: Permitimos el acceso a los datos y a nuestros sistemas solo a aquellas personas debidamente autorizadas siguiendo el “principio de necesidad de uso”.
                                </li>
                                <li>
                                    Integridad: Preservamos la exactitud de la información y de los sistemas contra cualquier tipo de alteración, pérdida o destrucción, ya sea de forma accidental o fraudulenta.
                                </li>
                                <li>
                                    Disponibilidad: Establecemos los mecanismos necesarios para que la información y los datos recolectados sean de fácil acceso del titular de los datos.
                                </li>
                                <li>
                                    Auditabilidad: Facilitamos que cualquier acción o transacción pueda ser relacionada unívocamente asegurando el cumplimiento de controles clave establecidos en las correspondientes normativas.
                                </li>
                            </ul>
                            <p><strong>Ejercicio del derecho de acceso, rectificación, cancelación u oposición</strong></p>
                            <p>
                                Asimismo, puedes ejercer tu derecho de acceso, rectificación, cancelación, oposición y otros contemplados en la ley de Protección de Datos Personales, a través de los procedimientos implementados por LESSIN, para la atención de los mismos. <br />
                                Finalmente, hago de tu conocimiento que puedes acudir ante la Autoridad Nacional de Protección de Datos Personales en vía de reclamación o al Poder Judicial, o en la entidad correspondiente si te encuentras fuera del Perú, cuando LESSIN deniegue total o parcialmente el ejercicio de los derechos establecidos en la normativa de protección de datos personales.
                            </p>
                        </div>
                        <div className="inlineFlex termBtn">
                            <a onClick={handleClose} className='btnSolid'>Entiendo</a>
                            <div className="inlineBlock termLinks">
                                <a href="#">Términos y Condiciones</a> <span>|</span>
                                <a href="#">Políticas de Privacidad</a>
                            </div>
                        </div>
                    </div>
                </div>
            </Dialog>
        </footer>
    )
};

export default Footer;
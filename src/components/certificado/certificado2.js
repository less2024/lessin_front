// Css
import './certificado2.scss'

import cetificadoBack from '../../assets/img/certificado.png';
import Image from 'next/image';

import JsPDF from 'jspdf';


const CertificadoPdf = ({name,docente,course,fecha,closeModal}) => {

    const generatePDF = () => {

        const report = new JsPDF('portrait','pt','a4');
        report.html(document.querySelector('#report')).then(() => {
            report.save('lessin_certified.pdf');
        });
    }
    
    return (
        <div className="inlineBlock certificadoCont">
            <div className="certButtons">
                <a href="#" onClick={generatePDF} className="download">
                    Descargar
                </a>
                <a href="#" onClick={closeModal} className="close">
                    <span></span>
                </a>
            </div>
            <div className="inlineBlock certificadoBox">
                
                <div className='cetMask'>
                    <div className="name">
                        {name}
                    </div>
                    <div className="course">
                        {course}
                    </div>
                    <div className="docente">
                        {docente}
                    </div>
                    <div className="fecha">
                        {fecha}
                    </div>
                </div>
                <Image src={cetificadoBack} />
            </div>
            <div  id="report" className="inlineBlock certPdfExportCont">
                <div className="certPdfExport">
                    <Image src={cetificadoBack} />
                </div>
                <div className="certPdfExportTxt">
                    <h4>{name}</h4>
                    <h5>{course}</h5>
                    <p>{docente}</p>
                    <small>{fecha}</small>
                </div>
            </div>
        </div>
    )
};

export default CertificadoPdf;
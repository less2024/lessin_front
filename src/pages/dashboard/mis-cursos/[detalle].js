import '../../../styles/in-course.scss';

import { useState, useEffect, useContext } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import { userLessing } from "../../../context/user";

import in_course_ico_btn from '../../../assets/img/in_course_ico_btn.svg';
import detCourseTeacher from '../../../assets/img/detCourseTeacher.png';
import VideoFrame from '../../../components/dashboard/CursoVideo';
import axios from 'axios';
import { Modal } from '@mui/material';

// Imagenes
import celebrationCourse1 from '../../../assets/img/course_celebration1.svg';
import celebrationCourse2 from '../../../assets/img/course_celebration2.svg';
import CertificadoPdf from '@/components/certificado/certificado2';
import VideoFrameFirst from '@/components/dashboard/CursoVideoFirst';

export default function InCourse({data}) {

    const router = useRouter();
    const [dataCourse,setDataCourse] = useState(null);
    const [progressCourse,setProgressCourse] = useState(0);
    const [ idVideo,setIdVideo ] = useState({
        id:null,
        index:null,
        subIndex:null,
        lastTime:null
    });

    const [ idVideo2,setIdVideo2 ] = useState({
        id:null
    });
    const { loginData } = useContext(userLessing);
    const [fullScreen,setFullScreen] = useState(false);

    const changeScreen = () =>{
        setFullScreen(!fullScreen);
    }

    // Modal Finish
    const [openFinish, setOpenFinish] = useState(false);
    const handleOpenFinish = () => setOpenFinish(true);
    const handleCloseFinish = () => setOpenFinish(false);
    const [showCertified,setShowCertified] = useState(true);
    const [enablePopup,setEnablePopup] = useState(false);
    const [showNote,setShowNote] = useState(false);

    // First Visit
    const [firstVisit,setFirstVisit] = useState(true);

    const handleCertified = () =>{
        setShowCertified(false);
    }
    
    const videoFrameClick = (item,index,subIndex,lastTime) => {
        setFirstVisit(false);
        setIdVideo({
            id:item,
            index:index,
            subIndex:subIndex,
            lastTime:lastTime,
        });
    }

    // Update Total Time
    const [temarioList,setTemarioList] = useState(null);
    const verifyGetCourse = () =>{
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/courseVideo',
            {
                user_id:loginData.idUser,
                course_id:data[0].id
            }
        )
        .then((resp)=>{
            const currentdate = new Date();
            const dateFormat = currentdate.getFullYear() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getDate();
            if(resp.data.length === 0){
                const newTemas = [];
                data[0].acf.pcurso_temario.map((item,index)=>{
                    const newTemasSub = [];
                    newTemas.push({
                        pcurso_temario_titulo:item.pcurso_temario_titulo,
                        pcurso_temario_lista:newTemasSub
                    });
                    item.pcurso_temario_lista.map((subItem,index)=>{
                        newTemasSub.push({
                            pcurso_temario_ltime:0,
                            pcurso_temario_lpercent:0,
                            pcurso_temario_lactive:false,
                            pcurso_temario_lduracion:subItem.pcurso_temario_lduracion,
                            pcurso_temario_lmateriales:subItem.pcurso_temario_lmateriales,
                            pcurso_temario_ltitulo:subItem.pcurso_temario_ltitulo,
                            pcurso_temario_lvideo:subItem.pcurso_temario_lvideo,
                        });
                    });
                });

                setIdVideo2({
                    id:data[0].acf.pcurso_video,
                });

                axios.post('https://api.lessin.pe/wp-json/usuarios/v1/addCourseVideo',
                    {
                        courses_list:JSON.stringify(newTemas),
                        user_id:loginData.idUser,
                        course_time:"0",
                        course_state:"0",
                        course_id:data[0].id,
                        course_name:data[0].title.rendered,
                        course_company:loginData.company,
                        course_ini:dateFormat,
                        course_company_name:loginData.titulo,
                        course_progress:"0",
                        course_user_name: loginData.nombresCompletos,
                        course_user_login: loginData.usuario,
                        course_user_phone:loginData.telefono,
                        course_user_email:loginData.correo
                    }
                )
                .then((addresp2)=>{

                    setTemarioList(newTemas);
                    axios.post('https://api.lessin.pe/wp-json/usuarios/v1/registerVisitCourse',{
                        user_id:addresp2.data,
                        date_reg: dateFormat
                    }).then((regvisitResp)=>{
                        console.log('visit register exit!!')
                    })
                    
                })
            }else{
                setTemarioList(JSON.parse(resp.data[0].courses_list));
                setFirstVisit(false);
                let totalSecondList = 0;
                let advanceSecondList = 0;
                
                const tmpLoadProgress = JSON.parse(resp.data[0].courses_list);
                tmpLoadProgress.map((item) =>{
                    item.pcurso_temario_lista.map((subItem)=>{
                        totalSecondList = totalSecondList + parseInt(subItem.pcurso_temario_lduracion);
                        const secondSumAdvance = (parseInt(subItem.pcurso_temario_lduracion) /100) * parseInt(subItem.pcurso_temario_lpercent);
                        advanceSecondList =  advanceSecondList + secondSumAdvance;
                      })
                })

                if(resp.data[0].course_state === '0'){
                    setEnablePopup(true);
                }

                setIdVideo({
                    ...idVideo,
                    id:tmpLoadProgress[0].pcurso_temario_lista[0].pcurso_temario_lvideo,
                    index:0,
                    subIndex:0,
                    lastTime:tmpLoadProgress[0].pcurso_temario_lista[0].pcurso_temario_ltime
                })

                const progressPercentTmp = (100 * advanceSecondList)/totalSecondList;
                setProgressCourse(progressPercentTmp);

                axios.post('https://api.lessin.pe/wp-json/usuarios/v1/registerVisitCourse',{
                    user_id:resp.data[0].id,
                    date_reg: dateFormat
                }).then((regvisitResp)=>{
                    console.log('visit register exit!!')
                })
            }
        })
    }

    // Get Date Right Now
    const currentdateCert = new Date();
    const dateFormatCert = currentdateCert.getFullYear() + "/" + (currentdateCert.getMonth()+1) + "/" + currentdateCert.getDate();

    useEffect(()=>{
        verifyGetCourse();
        setDataCourse(data[0]);
        if(!loginData){
            router.push({
                pathname: '/login',
                query: {
                    redirect: '/dashboard/mis-cursos/'+data[0].slug
                }
            })
        }
    },[]);

    return (
        <div className="pageCont pageInCourse inlineBlock">
            <section className="secBox pdcDet">

                <div className="inlineBlock picBlockMenu"></div>
                <div className={fullScreen  ? 'inlineFlex pageInCourseCont pageInCourseContActive' : 'inlineFlex pageInCourseCont'}>
                    <div className="inlineFlex picMedia">
                        <div className="inlineBlock picVideo">
                            {dataCourse &&
                                firstVisit ?
                                    <VideoFrameFirst 
                                        idVideo={idVideo2.id}
                                        key={'asda65d4ad654das65d4s978a1'}
                                    />
                                :
                                    <VideoFrame 
                                        data={temarioList} 
                                        idVideo={idVideo.id } 
                                        dataChange={setTemarioList} 
                                        index={idVideo.index} 
                                        subIndex={idVideo.subIndex}
                                        lastTime={idVideo.lastTime}
                                        loginData={loginData ? loginData : null}
                                        courseId={dataCourse ? dataCourse.id : null}
                                        courseProgress={setProgressCourse}
                                        courseObs={progressCourse}
                                        docente={data[0].acf.pcurso_profesor}
                                        showCertified={enablePopup}
                                        setShowCertified={setOpenFinish}
                                        setShowNextvid={setShowNote}
                                        key={'a1ds748a74sd1814ds8d1'}
                                    />
                            }
                            
                            {showNote &&
                                <>
                                    {temarioList &&
                                        temarioList &&
                                        temarioList.length > 0 &&
                                        temarioList.map((item,index) =>(
                                            <>
                                                {item.pcurso_temario_lista &&
                                                    item.pcurso_temario_lista.length> 0 &&
                                                    item.pcurso_temario_lista.map((subItem,subIndex)=>{
                                                        
                                                        if(subItem.pcurso_temario_lactive){
                                                            const nextSubIndex = subIndex+1;
                                                            const next = item.pcurso_temario_lista[subIndex+1];
                                                            const tmpIndex = index;
                                                            if(subIndex === (item.pcurso_temario_lista.length -1)){
                                                                const tmpIndexReset = index + 1;
                                                                if(temarioList.length ===(index +1 )){
                                                                }else{
                                                                    const nextSub = temarioList[tmpIndexReset].pcurso_temario_lista[0];
                                                                    return (
                                                                        <div className="videoNoteRight">
                                                                            <h5>Siguiente clase</h5>
                                                                            <p>
                                                                                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M2 2L8 8L2 14" stroke="#5CE1E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                                {nextSub.pcurso_temario_ltitulo}
                                                                            </p>
                                                                            <a 
                                                                            href="#" 
                                                                            //onClick={()=>updateObjetc(tmpIndex,tmpSubIndex,nextSub.pcurso_temario_ltime,nextSub.pcurso_temario_lpercent)} 
                                                                            onClick={()=>videoFrameClick(nextSub.pcurso_temario_lvideo,tmpIndex,nextSubIndex,nextSub.pcurso_temario_ltime)}
                                                                            className="btnNext"
                                                                            >
                                                                                Ver clase
                                                                                <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                    <path d="M2 2L8 8L2 14" stroke="#5CE1E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                                                </svg>
                                                                            </a>
                                                                        </div>
                                                                    )
                                                                }

                                                            }else{
                                                                return (
                                                                    <div className="videoNoteRight">
                                                                        <h5>Siguiente clase</h5>
                                                                        <p>
                                                                            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M2 2L8 8L2 14" stroke="#5CE1E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            </svg>
                                                                            {next.pcurso_temario_ltitulo}
                                                                        </p>
                                                                        <a 
                                                                            href="#" 
                                                                            //onClick={()=>updateObjetc(index,nextSubIndex,next.pcurso_temario_ltime,next.pcurso_temario_lpercent)} 
                                                                            onClick={()=>videoFrameClick(next.pcurso_temario_lvideo,tmpIndex,nextSubIndex,next.pcurso_temario_ltime)}
                                                                            className="btnNext"
                                                                        >
                                                                            Ver siguiente clase
                                                                            <svg width="10" height="16" viewBox="0 0 10 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                                <path d="M2 2L8 8L2 14" stroke="#5CE1E6" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                                                            </svg>
                                                                        </a>
                                                                    </div>
                                                                )
                                                            }
                                                        }
                                                    })
                                                }
                                            </>
                                        ))
                                    }
                                </>
                            }
                        </div>
                        
                        <div className="inlineFlex picPaginate">

                            {temarioList &&
                                temarioList &&
                                temarioList.length > 0 &&
                                temarioList.map((item,index) =>(
                                    <>
                                        {item.pcurso_temario_lista &&
                                            item.pcurso_temario_lista.length> 0 &&
                                            item.pcurso_temario_lista.map((subItem,subIndex)=>{
                                                
                                                if(subItem.pcurso_temario_lactive){
                                                    
                                                    var nextSubIndex = subIndex-1;
                                                    var next = item.pcurso_temario_lista[subIndex-1];
                                                    
                                                    if(subIndex !== 0){
                                                        return (
                                                            <a 
                                                                href="#" 
                                                                className='prev'
                                                                onClick={()=>videoFrameClick(next.pcurso_temario_lvideo,index,nextSubIndex,next.pcurso_temario_ltime)}
                                                            >
                                                                {next.pcurso_temario_ltitulo}
                                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                            </a>
                                                        )
                                                    }else{
                                                        if(index !== 0){
                                                            const indexTmp =  index - 1 ;
                                                            const subIndexTmp =  temarioList[indexTmp].pcurso_temario_lista.length - 1;
                                                            const snext = temarioList[indexTmp].pcurso_temario_lista[subIndexTmp];
                                                            return (
                                                                <a 
                                                                    href="#" 
                                                                    className='prev'
                                                                    onClick={()=>videoFrameClick(snext.pcurso_temario_lvideo,indexTmp,subIndexTmp,snext.pcurso_temario_ltime)}
                                                                >
                                                                    {snext.pcurso_temario_ltitulo}
                                                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                </a>
                                                            )    
                                                        }

                                                    }
                                                }
                                            })
                                        }
                                    </>
                                ))
                            }

                            {temarioList &&
                                temarioList &&
                                temarioList.length > 0 &&
                                temarioList.map((item,index) =>(
                                    <>
                                        {item.pcurso_temario_lista &&
                                            item.pcurso_temario_lista.length> 0 &&
                                            item.pcurso_temario_lista.map((subItem,subIndex)=>{
                                                
                                                if(subItem.pcurso_temario_lactive){
                                                    const nextSubIndex = subIndex+1;
                                                    const next = item.pcurso_temario_lista[subIndex+1];
                                                    if(subIndex === (item.pcurso_temario_lista.length -1)){
                                                        const tmpIndex = index + 1;
                                                        const tmpSubIndex = 0;
                                                        
                                                        if(temarioList.length ===(index +1 )){
                                                        }else{
                                                            const nextSub = temarioList[tmpIndex].pcurso_temario_lista[0];
                                                            return (
                                                                <a 
                                                                    href="#" 
                                                                    className='next'
                                                                    onClick={()=>videoFrameClick(nextSub.pcurso_temario_lvideo,tmpIndex,tmpSubIndex,nextSub.pcurso_temario_ltime)}
                                                                >
                                                                    <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                        <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                    </svg>
                                                                    {nextSub.pcurso_temario_ltitulo}
                                                                </a>
                                                            )
                                                        }

                                                    }else{

                                                        return (
                                                            <a 
                                                                href="#" 
                                                                className='next'
                                                                onClick={()=>videoFrameClick(next.pcurso_temario_lvideo,index,nextSubIndex,next.pcurso_temario_ltime)}
                                                            >
                                                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                                                </svg>
                                                                {next.pcurso_temario_ltitulo}
                                                            </a>
                                                        )
                                                    }
                                                }
                                            })
                                        }
                                    </>
                                ))
                            }

                        </div>

                        {false &&
                        <div className="inlineBlock picComments">
                            <div className="inlineBlock picCommentsBox">
                                <h4>
                                    Comentarios de estudiantes
                                </h4>
                                <div className="inlineFlex picCommentsItem">
                                    <figure>
                                        <Image src={detCourseTeacher} width={50} height={50} alt="profesor" />
                                    </figure>
                                    <div className="txt">
                                        <h5>Diego Viegas Lopez</h5>
                                        <p>hace 2 semanas</p>
                                    </div>
                                    <div className="commend">
                                        <p>Lorem ipsum dolor sit amet consectetur. Tellus pulvinar sit tellus adipiscing congue bibendum turpis varius. Viverra nunc vitae enim risus sit egestas eu. Ultricies scelerisque purus vulputate ipsum. Facilisis in malesuada vitae pulvinar scelerisque.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                        }
                    </div>
                    {fullScreen &&
                        <div className="btnFullScreen" onClick={changeScreen}>
                            <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M5 1L1 5L5 9" stroke="#fff" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Ver temario
                        </div>
                    }

                    <div className="picSidebar">
                        <div className="inlineFlex picBread">
                            <div className="minBar" onClick={changeScreen}>
                                Minimizar barra
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                            <div className="back" onClick={()=>console.log(temarioList)}>
                                Volver al curso
                                <svg width="6" height="10" viewBox="0 0 6 10" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M5 1L1 5L5 9" stroke="#F50F57" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                </svg>
                            </div>
                        </div>
                        <div className="inlineBlock picClassList">

                            {temarioList &&
                                temarioList &&
                                temarioList.length > 0 &&
                                temarioList.map((item,index) =>{
                                
                                return (
                                    <div className="picClassItem">
                                        <h3>
                                            <svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                                                <path d="M2 11C2 12.1819 2.23279 13.3522 2.68508 14.4442C3.13738 15.5361 3.80031 16.5282 4.63604 17.364C5.47177 18.1997 6.46392 18.8626 7.55585 19.3149C8.64778 19.7672 9.8181 20 11 20C12.1819 20 13.3522 19.7672 14.4442 19.3149C15.5361 18.8626 16.5282 18.1997 17.364 17.364C18.1997 16.5282 18.8626 15.5361 19.3149 14.4442C19.7672 13.3522 20 12.1819 20 11C20 9.8181 19.7672 8.64778 19.3149 7.55585C18.8626 6.46392 18.1997 5.47177 17.364 4.63604C16.5282 3.80031 15.5361 3.13738 14.4442 2.68508C13.3522 2.23279 12.1819 2 11 2C9.8181 2 8.64778 2.23279 7.55585 2.68508C6.46392 3.13738 5.47177 3.80031 4.63604 4.63604C3.80031 5.47177 3.13738 6.46392 2.68508 7.55585C2.23279 8.64778 2 9.8181 2 11Z" stroke="#F50F57" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"/>
                                            </svg>
                                            {item.pcurso_temario_titulo}
                                        </h3>

                                        {item.pcurso_temario_lista &&
                                            item.pcurso_temario_lista.length > 0 &&
                                            <ul>
                                            {item.pcurso_temario_lista.map((subItem,subIndex)=>{
                                                return (
                                                    <li 
                                                        onClick={()=>videoFrameClick(subItem.pcurso_temario_lvideo,index,subIndex,subItem.pcurso_temario_ltime)}
                                                        className={subItem.pcurso_temario_lactive ? 'active' : ''}
                                                    >
                                                        <svg width="20" height="20" viewBox="0 0 20 20">
                                                            <circle
                                                                fill="none"
                                                                cx="10px"
                                                                cy="10px"
                                                                r="7.5"
                                                            />
                                                            <circle 
                                                                fill="none"  
                                                                cx="10px"
                                                                cy="10px"
                                                                r="7.5"
                                                                className='progress' 
                                                                pathLength="100"
                                                                strokeDashoffset={subItem.pcurso_temario_lpercent}
                                                            />
                                                        </svg>
                                                        <a href="#">{subItem.pcurso_temario_ltitulo}</a>
                                                    </li>
                                                )
                                            })}
                                            </ul>
                                        }
                                    </div>
                                )
                            })}

                            {false &&
                            <div className="picClassItemDet" onClick={()=>console.log(dataCourse.acf.pcurso_temario)}>
                                <h4>Adobe Photoshop: Básico</h4>
                                <h2>2.1. Capas y Opacidad</h2>
                                <a href="#" className="btnSolid btnDownload">
                                    Descargar material
                                    <Image src={in_course_ico_btn} alt="download" title="download" />
                                </a>
                                <div className="banner">

                                </div>
                            </div>
                            }
                        </div>

                        <div className="inlineFlex picProgress">
                            <div className="picProgressLbl">
                                Progreso
                            </div>
                            <div className="picProgressLbl">
                                {progressCourse.toFixed(1)}% completado
                            </div>
                            <div className="inlineFlex lineBox">
                                <span style={{width: progressCourse.toFixed(2) + "%"}} ></span>
                            </div>
                        </div>
                    </div>

                    {false &&
                    <div className="inlineBlock picRespComment">
                        <div className="inlineBlock picComments">
                            <div className="inlineBlock picCommentsBox">
                                <h4>
                                    Comentarios de estudiantes
                                </h4>
                                <div className="inlineFlex picCommentsItem">
                                    <figure>
                                        <Image src={detCourseTeacher} width={50} height={50} alt="Profesor" title="Profesor" />
                                    </figure>
                                    <div className="txt">
                                        <h5>Diego Viegas Lopez</h5>
                                        <p>hace 2 semanas</p>
                                    </div>
                                    <div className="commend">
                                        <p>Lorem ipsum dolor sit amet consectetur. Tellus pulvinar sit tellus adipiscing congue bibendum turpis varius. Viverra nunc vitae enim risus sit egestas eu. Ultricies scelerisque purus vulputate ipsum. Facilisis in malesuada vitae pulvinar scelerisque.</p>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                    }
                </div>


                <Modal
                    open={openFinish}
                    onClose={handleCloseFinish}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    {showCertified ? 
                        <div className="courseCongratulation">
                            <div className="ccClose" onClick={handleCloseFinish}>
                                <span></span>
                            </div>
                            <div className="ccTop">
                                <Image src={celebrationCourse1} />
                            </div>
                            <div className="ccCloud ccCloud1"></div>
                            <div className="ccCloud ccCloud2"></div>
                            <div className="ccCloud ccCloud3"></div>
                            <div className="ccCloud ccCloud4"></div>
                            <div className="ccConfeti ccConfeti1"></div>
                            <div className="ccConfeti ccConfeti2"></div>
                            <div className="ccConfeti ccConfeti3"></div>
                            <div className="ccConfeti ccConfeti4"></div>
                            <div className="ccConfeti ccConfeti5"></div>
                            <div className="ccConfeti ccConfeti6"></div>
                            <div className="ccConfeti ccConfeti7"></div>
                            <div className="ccConfeti ccConfeti8"></div>
                            <div className="title">
                                <h4>¡Felicidades!</h4>
                                <p>Lograste terminar el curso.</p>
                                <div className="btnPrimary" onClick={handleCertified}>
                                    Certificado
                                </div>
                            </div>
                            <div className="ccBotom">
                                <Image src={celebrationCourse2} />
                            </div>
                        </div>
                    :
                        <div className="courseCongratulation courseCongratulationPdf">
                            <CertificadoPdf 
                                name={loginData ? loginData.usuario : 'User'} 
                                course={data[0].title.rendered} 
                                docente={data[0].acf.pcurso_profesor} 
                                fecha={dateFormatCert} 
                                closeModal={handleCloseFinish}
                            />
                        </div>
                    }
                </Modal>
            </section>
        </div>
    )

    
}


export async function getServerSideProps({params}) {
    try {
        const res = await fetch('https://api.lessin.pe/wp-json/wp/v2/cursos?slug='+params.detalle);
        const data = await res.json();

        return {
            props:{
                data
            }
        }

    } catch (error) {
        console.log(error); 
        return false 
    }
}

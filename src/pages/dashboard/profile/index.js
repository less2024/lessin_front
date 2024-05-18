import '../../../styles/profile.scss';

import { useState,useEffect,useContext } from 'react';

import Image from 'next/image';

// UI
import Container from '@mui/material/Container';

// Images
import icoEditPhoto from '../../../assets/img/ico_edit_photo.png';

import icoUserInscritos from '../../../assets/img/ico_user_inscritos.png';
import icoUserCompletados from '../../../assets/img/ico_user_completados.png';
import icoUserObtenidos from '../../../assets/img/ico_user_obtenidos.png';
import TextField from '@mui/material/TextField';

// Curos
import curso1 from '../../../assets/img/inicio_curso1.png';
import portadaGif from '../../../assets/img/platform_portada.jpg';

// Context 
import { userLessing } from "../../../context/user";
import ProfileAvatar from '@/components/dashboard/ProfileAvatar';
import Link from 'next/link';
import axios from 'axios';
import { Modal } from '@mui/material';

import CloseIcon from '@mui/icons-material/Close';

export default function Profile() {

    const [windowWidth, setWindowWidth] = useState(0);
    const { loginData,setLoginData } = useContext(userLessing);
    const [userLogin,setUserLogin] = useState();


    // Get information
    const [myCourses,setMyCourses] = useState([]);
    const [myCoursesFinish,setMyCoursesFinish] = useState([]);
    const [lastCourse,setLastCourse] = useState(null);
    const [lastCourseDet,setLastCourseDet] = useState(null);

    const getInfo = ()=>{
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/getCoursesUser',{
            user_id:loginData.idUser,
            course_company:loginData.company
        }).then((resp)=>{
            const myCoursesTmp = [];
            const myCoursesFinishTmp = [];
            if(resp.data.length > 0){
                resp.data.map((item,index)=>{
                    if(item.course_state === "0"){
                        myCoursesTmp.push(item);
                    }else{
                        myCoursesFinishTmp.push(item);
                    }

                    // Last course => Relacionados
                    const indexTmp = index + 1;
                    if(resp.data.length === indexTmp){
                        setLastCourse(item);
                        axios.get('https://api.lessin.pe/wp-json/wp/v2/cursos/'+item.course_id)
                        .then((respCourse)=>{
                            setLastCourseDet(respCourse.data);
                        })
                    }

                })
            }
            setMyCourses(myCoursesTmp);
            setMyCoursesFinish(myCoursesFinishTmp);
        })
    }

    // Change descripcion
    const [userDescription,setUserDescription] = useState(null);
    const [openModalDesc,setOpenModalDesc] = useState(false);
    const handleModalDescClose = ()=>{
        setOpenModalDesc(false)
    }
    const handleModalDescOpen = ()=>{
        setOpenModalDesc(true)
    }
    const changeDescription = (e) =>{
        setUserDescription(e.target.value);
    }
    const updateUserDescription = () =>{
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/updateDescriptionFront',{
            idCliente:loginData.idUser,
            description:userDescription,
        }).then((resp)=>{
            setLoginData({
                ...loginData,
                user_description:userDescription
            })

            if(typeof window !== 'undefined'){
                window.localStorage.setItem('dataKey',
                JSON.stringify(
                {
                    ...loginData,
                    user_description:userDescription
                }));
            }

            setOpenModalDesc(false);
        })
    }
    
    
    useEffect(() => {
        getInfo();
        setUserLogin(loginData);
        setWindowWidth(window.innerWidth);
        const handleWindowResize = () => {
            setWindowWidth(window.innerWidth);
        };

        setUserDescription(loginData.user_description);

        window.addEventListener('resize', handleWindowResize);

        return () => {
            window.removeEventListener('resize', handleWindowResize);
        };
    },[]);

    return (
        <div className="pageCont pageProfile inlineBlock">
            <section className="secBox profilePage">
                <div className="profileBackground">
                <div className="circleBack circlePink"></div>
                <div className="circleBack circleBlue"></div>
                </div>
                
                <div className="profilePageBox">
                    <div className="pHeaderPortada">
                        {userLogin ?
                            <Image src={userLogin.baner3} width={10} height={10} title="Portada" alt="Portada" />
                            :
                            
                            <Image src={portadaGif} width={10} height={10} title="Portada" alt="Portada" />
                        }
                        
                    </div>
                    <div className="inlineBlock profilePageBody">
                        <Container>
                            <div className="inlineBlock pHeader">
                                <figure className='imgNoEdit'>
                                    {userLogin && <ProfileAvatar data={userLogin.avatar}/>}
                                </figure>
                                {userLogin &&
                                <div className="name">
                                    <h1>{userLogin.nombresCompletos}</h1>
                                </div>
                                }
                            </div>
                            {windowWidth < 993 && 
                                <div className="profileAboutResp">
                                    <div className="sbSumary">
                                        <div className="sbsItem">
                                            <h4>{myCourses.length}</h4>
                                            <div className="txt">
                                                <div className="ico">
                                                    <Image src={icoUserInscritos} />
                                                </div>
                                                <div className="title">
                                                    Cursos <br />
                                                    Inscritos
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sbsItem">
                                            <h4>{myCoursesFinish.length}</h4>
                                            <div className="txt">
                                                <div className="ico">
                                                    <Image src={icoUserCompletados} />
                                                </div>
                                                <div className="title">
                                                    Cursos <br />
                                                    completados
                                                </div>
                                            </div>
                                        </div>
                                        <div className="sbsItem">
                                            <h4>{myCoursesFinish.length}</h4>
                                            <div className="txt">
                                                <div className="ico">
                                                    <Image src={icoUserObtenidos} />
                                                </div>
                                                <div className="title">
                                                    Diplomas <br />
                                                    Obtenidos
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            }
                            <div className="inlineFlex profileAbout">
                                <div className="about">
                                    <h5>
                                        Sobre mí
                                        <div onClick={handleModalDescOpen} className="icoEdit">
                                            <Image src={icoEditPhoto} />
                                        </div>
                                    </h5>

                                    <div className="note">
                                        {userDescription ?
                                            <p>{userDescription}</p>
                                        :
                                            <p>Agregue alguna descripcion</p>
                                        }
                                    </div>
                                    
                                    {userLogin &&
                                        <div className="inlineBlock profileEditCont">
                                            <h3>Datos Personales <Link href="/dashboard/profile/edit" className="btnWhite">Editar perfil</Link> </h3>
                                            <form action="" className='inlineBlock'>
                                                <div className="inlineFlex formRow formRowFull">
                                                    <div className="formField">
                                                        <TextField 
                                                            id="standard-basic" 
                                                            label="Nombres" 
                                                            defaultValue="Juan" 
                                                            variant="standard" 
                                                            placeholder="Juan" 
                                                            value={userLogin.nombresCompletos ? userLogin.nombresCompletos : '--'}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="inlineFlex formRow">
                                                    <div className="formField">
                                                        <TextField 
                                                            id="standard-basicasd" 
                                                            label="Email" 
                                                            variant="standard" 
                                                            
                                                            value={userLogin.correo ? userLogin.correo : '--'}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="formField">
                                                        <TextField 
                                                            id="standard-basic" 
                                                            label="Teléfono" 
                                                            variant="standard" 
                                                            defaultValue="987 654 321"
                                                            value={userLogin.telefono ? userLogin.telefono : '--'}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="inlineFlex formRow">
                                                    <div className="formField">
                                                        <TextField 
                                                            id="standard-basic" 
                                                            label="Empresa" 
                                                            variant="standard" 
                                                            defaultValue="Rimac Seguros" 
                                                            value={userLogin.titulo ? userLogin.titulo : '--'}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="formField">
                                                        <TextField 
                                                            id="standard-basic" 
                                                            label="Usuario" 
                                                            variant="standard" 
                                                            placeholder="user123" 
                                                            value={userLogin.usuario ? userLogin.usuario : '--'}
                                                            disabled
                                                        />
                                                    </div>
                                                </div>
                                                <div className="profileEditBtnResp">
                                                    <a href="#" className="btnWhite">Editar perfil</a>
                                                </div>
                                            </form>
                                        </div>
                                    }
                                </div>
                                <div className="sidebar">
                                    {windowWidth > 991 && 
                                        <div className="sbSumary">
                                            <div className="sbsItem">
                                                <h4>{myCourses.length}</h4>
                                                <div className="txt">
                                                    <div className="ico">
                                                        <Image src={icoUserInscritos} />
                                                    </div>
                                                    <div className="title">
                                                        Cursos <br />
                                                        Inscritos
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sbsItem">
                                                <h4>{myCoursesFinish.length}</h4>
                                                <div className="txt">
                                                    <div className="ico">
                                                        <Image src={icoUserCompletados} />
                                                    </div>
                                                    <div className="title">
                                                        Cursos <br />
                                                        completados
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="sbsItem">
                                                <h4>{myCoursesFinish.length}</h4>
                                                <div className="txt">
                                                    <div className="ico">
                                                        <Image src={icoUserObtenidos} />
                                                    </div>
                                                    <div className="title">
                                                        Diplomas <br />
                                                        Obtenidos
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    }
                                    {lastCourse &&
                                        <div className="sbSumary">
                                        
                                            <div className="sbLastCource">
                                                <h3>Último curso
                                                    <Link href={'/cursos'} className="btnWhite">Ver cursos</Link>
                                                </h3>
                                                <figure>
                                                    {lastCourseDet ?
                                                        <Image src={lastCourseDet.acf.imagen_catalogo} width={50}  height={50} alt={lastCourseDet.title.rendered} title={lastCourseDet.title.rendered} />
                                                        :
                                                        <Image src={curso1} />
                                                    }
                                                    <figcaption>
                                                        <p>{lastCourse.course_progress}% avanzado</p>
                                                    </figcaption>
                                                </figure>
                                                {lastCourseDet &&
                                                <Link className='btnSolid' href={'/cursos/'+lastCourseDet.slug}>
                                                    Continuar curso
                                                </Link>
                                                }
                                            </div>
                                            
                                        </div>
                                    }
                                </div>
                            </div>
                        </Container>
                    </div>
                </div>

                <Modal
                    open={openModalDesc}
                    onClose={handleModalDescClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <div className="pchangeDescBox">
                        <div onClick={handleModalDescClose} className="pchangeClose">
                            <CloseIcon />
                        </div>
                        <h3>Cambiar descripcion</h3>
                        <div className="formField">
                            <TextField 
                                id="outlined-basic" 
                                label="Descripcion" 
                                variant="standard" 
                                multiline
                                value={userDescription}
                                fullWidth={true}
                                onChange={changeDescription}
                                rows={4}
                                inputProps={{ maxLength: 255 }}
                            />
                        </div>
                        <a href="#" onClick={updateUserDescription} className="btnSolid">
                            Actualizar
                        </a>
                    </div>
                </Modal>
                
            </section>
        </div>
    )
}
  
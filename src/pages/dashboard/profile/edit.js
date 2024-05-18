import '../../../styles/profile.scss';


import { useState,useContext } from 'react';

import Image from 'next/image';

// UI
import Container from '@mui/material/Container';


// Images
import icoEditPhoto from '../../../assets/img/ico_edit_photo.png';

import TextField from '@mui/material/TextField';

// Context 
import { userLessing } from "../../../context/user";
import { useEffect } from 'react';
import Link from 'next/link';

import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import ProfileAvatar from '@/components/dashboard/ProfileAvatar';
import ChangeProfile from '@/components/dashboard/ChangeProfile';
import portadaGif from '../../../assets/img/platform_portada.jpg';

// Avatar

export default function ProfileEdit() {

    const { loginData,setLoginData } = useContext(userLessing);
    const [userLogin,setUserLogin] = useState();
    const [loadingForm,setLoadingForm] = useState(false);
    const [openChangeModal,setOpenChangeModal] = useState(false);
    const closeChangeModal = ()=> setOpenChangeModal(false);
    const [userForm,setUserForm] = useState({
        name:'',
        email:'',
        phone:''
    });

    const validationSchema = Yup.object().shape({
        name: Yup.string().min(3, "Deben tener al menos 3 caracteres.").required(),
        email: Yup.string().email().required(),
        phone: Yup.number().min(3, "Deben tener al menos 6 digitos.").required()
    });

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm({
        mode: "all",
        shouldUnregister: true,
        resolver: yupResolver(validationSchema),
    });

    const onSubmit = async (data) => {
        setLoadingForm(true)
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/updateUserFront',{
            idCliente:loginData.idUser,
            name:data.name,
            phone:data.phone,
            email:data.email

        }).then((resp)=>{

            setLoginData({
                ...loginData,
                correo:data.email,
                telefono:data.phone,
                nombresCompletos:data.name
            })

            if(typeof window !== 'undefined'){
                window.localStorage.setItem('dataKey',
                JSON.stringify(
                {
                    ...loginData,
                    correo:data.email,
                    telefono:data.phone,
                    nombresCompletos:data.name
                }));
            }

            setTimeout(() => {
                setLoadingForm(false)
            }, 1000);
        })
    }

    const changeField = (e)=>{
        setUserForm({
            ...userForm,
            [e.target.name]:e.target.value
        })
    }
    
    useEffect(()=>{
        setUserLogin(loginData);
        setUserForm({
            name:loginData.nombresCompletos,
            email:loginData.correo,
            phone:loginData.telefono
        })
    },[loginData])

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
                                <figure className='imgWidthEdit'>
                                    {userLogin && <ProfileAvatar data={userLogin.avatar}/>}
                                    <div className="ico" onClick={()=>setOpenChangeModal(true)}>
                                        <Image src={icoEditPhoto} />
                                    </div>
                                </figure>

                                <div className="name">
                                    {userLogin &&
                                        <h1>{userLogin.nombresCompletos}</h1>
                                    }
                                </div>
                            </div>
                            <div className="inlineFlex profileAbout profileAbout2">
                                <div className="sidebar">

                                    <div className="sbSumary">
                                        <ul className="sbProfileMenu">
                                            <li>
                                                <Link href="/dashboard/profile/edit" className='btnWhite active' >
                                                    Edita tus datos personales
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/dashboard/profile/change-password" className='btnWhite' >
                                                    Cambia tu contraseña
                                                </Link>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                                <div className="about">

                                    <div className="inlineBlock profileEditCont profileEditCont2">
                                        <div className="inlineBlock profileBread">
                                            <a href="#" className="profileBack">
                                                Volver
                                            </a>
                                        </div>
                                        <h3>Datos Personales  </h3>
                                        {userLogin &&
                                        <form onSubmit={handleSubmit(onSubmit)} className={loadingForm ? 'inlineBlock disableForm':'inlineBlock'}>
                                            <div className="inlineFlex formRow formRowFull">
                                                <div className="formField">
                                                    <TextField 
                                                        id="standard-basic" 
                                                        label="Nombres" 
                                                        defaultValue="Juan" 
                                                        variant="standard" 
                                                        name="name"
                                                        value={userForm.name}
                                                        {...register("name")}
                                                        onChange={changeField}
                                                        error={errors.name ? true : false}
                                                    />
                                                </div>
                                            </div>
                                            <div className="inlineFlex formRow">
                                                <div className="formField">
                                                    <TextField 
                                                        id="standard-basicasd" 
                                                        label="Email" 
                                                        variant="standard"
                                                        value={userForm.email}
                                                        name="email"
                                                        {...register("email")}
                                                        onChange={changeField}
                                                        error={errors.email ? true : false}
                                                    />
                                                </div>
                                                <div className="formField">
                                                    <TextField 
                                                        id="standard-basic" 
                                                        label="Teléfono" 
                                                        variant="standard"
                                                        
                                                        value={userForm.phone}
                                                        name="phone"
                                                        {...register("phone")}
                                                        onChange={changeField}
                                                        error={errors.phone ? true : false}
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
                                            <button type='submit' href="#" className="btnWhite">Guardar cambios</button>
                                        </form>
                                        }
                                    </div>
                                </div>

                            </div>
                        </Container>
                    </div>

                    <ChangeProfile data={userLogin ? userLogin.avatar : null} modal={openChangeModal} modalClose={closeChangeModal} />
                </div>
            </section>
        </div>
    )
}
  
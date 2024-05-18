import '../../../styles/profile.scss';

import { useState,useContext,useEffect } from 'react';

import Image from 'next/image';

// UI
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';


import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import portadaGif from '../../../assets/img/platform_portada.jpg';

// Context 
import { userLessing } from "../../../context/user";
import Link from 'next/link';
import ProfileAvatar from '@/components/dashboard/ProfileAvatar';

export default function ProfileChangePassword() {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    const { loginData } = useContext(userLessing);
    const [userLogin,setUserLogin] = useState();
    const [loadingForm,setLoadingForm] = useState(false);

    const validationSchema = Yup.object().shape({
        password: Yup.string().min(8, "Deben tener al menos ocho caracteres.").required()
            .matches(/^(?=.*[a-z])/,"Incluir mayúsculas y minúsculas.")
            .matches(/^(?=.*[A-Z])/,"Incluir mayúsculas y minúsculas.")
            .matches(/^(?=.*[0-9])/,"Incluir números.")
            .matches(/^(?=.*[!@#\$%\^&\*])/,"Incluir símbolos."),
        passwordConfirm: Yup
            .string()
            .required('Las contraseñas no coinciden.')
            .oneOf([Yup.ref('password'), null], 'Passwords must match'),

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
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/changePassword',{
            idCliente:loginData.idUser,
            password:data.password
        }).then((resp)=>{
            setTimeout(() => {
                setLoadingForm(false)
                reset()
            }, 1000);
        })
        
    }

    useEffect(()=>{
        setUserLogin(loginData);
    },[])


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
                                                <Link href="/dashboard/profile/edit" className='btnWhite ' >
                                                    Edita tus datos personales
                                                </Link>
                                            </li>
                                            <li>
                                                <Link href="/dashboard/profile/change-password" className='btnWhite active' >
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
                                        <h3>Cambiar contraseña </h3>
                                        <form onSubmit={handleSubmit(onSubmit)} className={loadingForm ? 'inlineBlock disableForm':'inlineBlock'}>
                                            <div className="inlineFlex formRow">
                                                <div className="formField">
                                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                        <Input
                                                            id="standard-adornment-password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                            }
                                                            {...register("password")}
                                                            error={errors.password ? true : false}
                                                        />
                                                    </FormControl>
                                                </div>
                                                <div className="formField">
                                                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                                                        <InputLabel htmlFor="standard-adornment-password">Password</InputLabel>
                                                        <Input
                                                            id="standard-adornment-password"
                                                            type={showPassword ? 'text' : 'password'}
                                                            endAdornment={
                                                            <InputAdornment position="end">
                                                                <IconButton
                                                                aria-label="toggle password visibility"
                                                                onClick={handleClickShowPassword}
                                                                onMouseDown={handleMouseDownPassword}
                                                                >
                                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                                                </IconButton>
                                                            </InputAdornment>
                                                            }
                                                            {...register("passwordConfirm")}
                                                            error={errors.passwordConfirm ? true : false}
                                                        />
                                                    </FormControl>
                                                </div>
                                            </div>
                                            <div className="formDateValid">
                                                {errors.password?.message ==='Deben tener al menos ocho caracteres.' && <p>(*) Deben tener al menos ocho caracteres</p>}
                                                {errors.password?.message ==='Incluir mayúsculas y minúsculas.' && <p>(*) Incluir mayúsculas y minúsculas</p>}
                                                {errors.password?.message ==='Incluir números.' && <p>(*) Incluir números</p>}
                                                {errors.password?.message ==='Incluir símbolos.' && <p>(*) Incluir símbolos</p>}
                                                {errors.passwordConfirm?.message && <p>(*) Las contraseñas no coinciden.</p>}
                                            </div>
                                            <div className="inlineFlex formRow formRowBtn">
                                                <button href="#" type='submit' className='btnWhite'>
                                                    Guardar cambios
                                                </button>
                                            </div>
                                        </form>
                                    </div>
                                </div>

                            </div>
                        </Container>
                    </div>
                </div>
                
            </section>
        </div>
    )
}
  
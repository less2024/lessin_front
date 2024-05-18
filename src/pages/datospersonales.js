
import '../styles/login.scss';

import { useState,useContext,useEffect } from 'react';

import Image from 'next/image';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import loginImg from '../assets/img/login_register_img.png';
import icoArrowBack from '../assets/img/ico_arrow_back.png';

// Redes Sociales
import icoGoogle from '../assets/img/ico_google.png';
import icoFb from '../assets/img/ico_fb_white.png';

import axios from 'axios';
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import { useRouter } from 'next/router'

// Context 
import { userLessing } from "../context/user";

export default function Register() {

  const { loginData,setLoginData } = useContext(userLessing);
  const [loadingForm,setLoadingForm] = useState(false);
  const router = useRouter();
  const [userForm,setUserForm] = useState({
      name:'',
      email:'',
      phone:''
  });

  const validationSchema = Yup.object().shape({
      name: Yup.string().min(3, "Deben tener al menos 3 caracteres."),
      email: Yup.string().email(),
      phone: Yup.number().min(3, "Deben tener al menos 6 digitos.")
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

    const emailBody = {
      "email_aaareg": data.email,
      "name_aaareg": data.name.split(' ')[0],
    };
  
    const form = new FormData();
    for (const field in emailBody) {
        form.append(field, emailBody[field]);
    }

    axios.post(`https://api.lessin.pe/wp-json/contact-form-7/v1/contact-forms/620/feedback`,form).then((resp)=>{
    }).catch((error)=>{
      console.log(error)
    })


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

      if(router.query.redirect){
        router.push(router.query.redirect);
      }else{
        router.push('/dashboard');
      }
      

    })


  }

  const changeField = (e)=>{
    setUserForm({
      ...userForm,
      [e.target.name]:e.target.value
    })
  }

  useEffect(()=>{
    if(loginData){    
      setUserForm({
        name:loginData.nombresCompletos,
        email:loginData.correo,
        phone:loginData.telefono
      })
    }else{
      router.push('/login')
    }
  },[loginData])

  return (

    <div className="pageCont inlineBlock">
      <section className="secBox loginCont">
        <Container maxWidth="xm">
          <div className="inlineFlex loginBox">
            <div className="loginForm">
              <div className="title">
                <h2>
                  ¡Actualiza tus <br />
                  datos!
                </h2>
                <p>
                  Te invitamos a completar tu perfil para <br />
                  disfrutar de una experiencia personalizada.
              </p>
              </div>
              <form onSubmit={handleSubmit(onSubmit)}  className={loadingForm ? 'inlineBlock loginFormBox loginFormBoxDisabled' : 'inlineBlock loginFormBox'}>

                <div className="inlineBlock formFieldLogin">
                  <TextField 
                    id="standard-basic"
                    label="Nombres"
                    variant="standard"
                    placeholder="Ingresa tus nombres"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={userForm.name}
                    {...register("name")}
                    onChange={changeField}
                    error={errors.name ? true : false}
                  />
                </div>
              
                <div className="inlineBlock formFieldLogin">
                  <TextField 
                    id="standard-basic"
                    label="Email"
                    variant="standard"
                    placeholder="Ingresa tu email"
                    InputLabelProps={{
                      shrink: true,
                    }}
                    value={userForm.email}
                    name="email"
                    {...register("email")}
                    onChange={changeField}
                    error={errors.email ? true : false}
                  />
                </div>

                <div className="inlineFlex formFieldLogin">
                  <div className="formSubField">
                      <TextField 
                      id="standard-basic"
                      label="DNI"
                      variant="standard"
                      placeholder="Ingresa tu DNI"
                      InputLabelProps={{
                          shrink: true,
                      }}
                      value={loginData && loginData.usuario}
                      disabled
                      />
                  </div>
                  <div className="formSubField">
                      <TextField 
                        id="standard-basic"
                        label="Celular"
                        variant="standard"
                        placeholder="Ingresa tu celular"
                        InputLabelProps={{
                            shrink: true,
                        }}
                        value={userForm.phone}
                        name="phone"
                        {...register("phone")}
                        onChange={changeField}
                        error={errors.phone ? true : false}
                      />
                  </div>
                </div>

                <div className="inlineBlock formFieldLogin">
                  <button href="#" type="submit" className="btnSolid btnSolidArrow">
                    Continuar
                  </button>
                </div>
              </form>
            </div>
            <figure className="loginImg">
              <Image src={loginImg} />
            </figure>
            <a href="#" className="loginBackHome">
              <Image src={icoArrowBack} />
              Regresar a Inicio
            </a>
          </div>
        </Container>
        <div className="loginCover"></div>
      </section>
    </div>
  )
}
  
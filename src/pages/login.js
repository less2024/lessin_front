

import '../styles/login.scss';

import { useState,useContext, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link'
import { useRouter } from 'next/router'

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import loginImg from '../assets/img/login_img.png';
import icoArrowBack from '../assets/img/ico_arrow_back.png';

import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

// Context 
import { userLessing } from "../context/user";

// Yup
//import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import axios from 'axios';



export default function Login() {

  const router = useRouter();
  const [body, setBody] = useState({
    email: "",
    password: ""
  });
  const { setLoginData,setLoading } = useContext(userLessing);

  // Toast
  const [openToas, setOpenToas] = useState(false);

  const handleCloseToas = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpenToas(false);
  };

  const changeManager = (e) => {
    setBody({
      ...body,
      [e.target.name]: e.target.value,
    });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .required("Ingrese un usuario valido.")
      .min(3,'Debe tener al menos 2 caracteres.')
      .max(40, 'No debe exceder los 40 caracteres.'),
    password: Yup.string()
      .required("Ingrese una contraseña valida por favor.")
      .min(3,'Debe tener al menos 2 caracteres.')
      .max(40, 'No debe exceder los 40 caracteres.'),
  });

  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "all",
    shouldUnregister: true,
    resolver: yupResolver(validationSchema),
  });

  const onSubmit = async (data) => {

    axios.post('https://api.lessin.pe/wp-json/usuarios/v1/login',{
      idCliente: data.email,
      password: data.password
      }).then((data2)=>{
        if(data2.data.length > 0){
          axios.post('https://api.lessin.pe/wp-json/jwt-auth/v1/token',{
            username: 'webing.pe',
            password: 'lessin2020root'
          }).then((respLog)=>{
            //console.log(data[0])
            axios.get('https://api.lessin.pe/wp-json/wp/v2/clientes/'+data2.data[0].user_client).
            then((resp)=>{
              var avatar = '';
              if(data2.data[0].user_avatar === null){
                avatar = 0;
              }else if(data2.data[0].user_avatar === ''){
                avatar = 0;
              }else{
                avatar = data2.data[0].user_avatar;
              }
              const dataLogin= {
                //nickname:data2.data[0].user_fullname,
                // user
                idUser:data2.data[0].id,
                nombresCompletos:data2.data[0].user_fullname,
                telefono:data2.data[0].user_phone,
                correo:data2.data[0].user_email,
                usuario:data2.data[0].user_login,
                user_description:data2.data[0].user_description,
                avatar:avatar,

                // Seguridad
                token:respLog.data.token,

                // company
                titulo:resp.data.title.rendered,
                descripcion:resp.data.acf.clientes_descripcion,
                company:data2.data[0].user_client,
                logo:resp.data.acf.clientes_logo,
                detalle:resp.data.acf.clientes_detalle,
                cover:resp.data.acf.clientes_cover,

                baner1:resp.data.acf.clientes_banner1,
                baner1_link:resp.data.acf.clientes_banner1_link,
                baner2:resp.data.acf.clientes_banner2,
                baner2_link:resp.data.acf.clientes_banner2_link,
                baner3:resp.data.acf.clientes_banner_gif
              };

              localStorage.setItem('dataKey', JSON.stringify(dataLogin));

              setLoginData(dataLogin);

              // Register visit
              const dateInitRange = new Date();
              const yearRangeFilter = dateInitRange.getFullYear();
              const montRangeFilter = dateInitRange.getMonth()+1;
              const dayRangeFilter = dateInitRange.getDate();
              axios.post('https://api.lessin.pe/wp-json/usuarios/v1/registerVisit',{
                user_id:data2.data[0].id,
                date_login: yearRangeFilter+'-'+montRangeFilter+'-'+dayRangeFilter
              }).then((resp)=>{
                console.log('visit register exit!!')
              })

              if(data2.data[0].user_state === '0'){
                if(router.query.redirect){
                  router.push({
                    pathname: '/datospersonales',
                    query: {
                        redirect: '/dashboard/mis-cursos/'+data[0].slug
                    }
                  })
                }else{
                  router.push('/datospersonales');
                }
              }else{
                if(router.query.redirect){
                  router.push(router.query.redirect);
                }else{
                  router.push('/dashboard');
                }
              }

            })
          })
        }else{
          setOpenToas(true);
        }
      })
  };
  
  useEffect(()=>{

  },[])

  return (
    <div className="pageCont inlineBlock">
      <section className="secBox loginCont">
        <Container maxWidth="xm">
          <div className="inlineFlex loginBox">
            <div className="loginForm">
              <div className="title">
                <h2>
                  ¡Nos alegra verte <br />
                  de nuevo por aquí!
                </h2>
                <p>Inicia sesión para acceder a tu cuenta</p>
              </div>
            
              <form onSubmit={handleSubmit(onSubmit)} className="inlineBlock loginFormBox">
                <div className="inlineBlock formFieldLogin">
                  <TextField 
                    id="email"
                    label="Usuario"
                    variant="standard"
                    placeholder="Ingresa su usuario"
                    onChange={changeManager}
                    InputLabelProps={{
                      shrink: true,
                    }}
                    {...register("email")}
                    error={errors.email ? true : false}
                  />
                </div>
                <div className="inlineBlock formFieldLogin">
                  {true &&
                  <FormControl sx={{ m: 1, width: '25ch' }} >
                    <InputLabel shrink={true} htmlFor="standard-adornment-password">Password</InputLabel>
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
                        shrink={true}
                        
                        placeholder="Ingrese su contraseña"
                        onChange={changeManager}
                        {...register("password")}
                        error={errors.password ? true : false}
                    />
                  </FormControl>
                  }
                  
                </div>


                <div className="inlineBlock formFieldLogin">
                  <button type='submit' href="#" className="btnSolid btnSolidArrow">
                    Iniciar Sesión
                  </button>
                  {false &&
                    <a href="#" className='inlineBlock linkForgot'>¿Olvidaste tu contraseña?</a>
                  }
                </div>
              </form>
            </div>
            <figure className="loginImg">
              <Image src={loginImg} width={'auto'} height={'auto'} alt="Login" />
            </figure>
            <Link href="/" className="loginBackHome">
              <Image src={icoArrowBack} alt="volver" /> Regresar a Inicio
            </Link>
          </div>
        </Container>
        <div className="loginCover"></div>
      </section>

      <Snackbar anchorOrigin={{ vertical:'top', horizontal:'left' }} open={openToas} autoHideDuration={2000} onClose={handleCloseToas}>
        {true &&
          <div className="inlineBlock formFieldLoginError">
            <p>
              Usuario y/o contraseña invalido.
            </p>
          </div>
        }
      </Snackbar>
    </div>
  )
  
}



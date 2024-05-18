

import '../styles/login.scss';

import { useState } from 'react';

import Image from 'next/image';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';

import loginImg from '../assets/img/login_forget_password.png';
import icoArrowBack from '../assets/img/ico_arrow_back.png';


export default function Register() {

    return (

      <div className="pageCont inlineBlock">
        <section className="secBox loginCont">
          <Container maxWidth="xm">
            <div className="inlineFlex loginBox">
              <div className="loginForm">
                <div className="title">
                    <h2>
                        ¡Restablece tu <br />
                        contraseña!
                    </h2>
                    <p>
                        Enviaremos instrucciones a tu correo electrónico <br />
                        registrado para restablecer tu contraseña.
                    </p>
                </div>
                <div className="inlineBlock loginFormBox">

                  <div className="inlineBlock formFieldLogin">
                    <TextField 
                      id="standard-basic"
                      label="Usuario"
                      variant="standard"
                      placeholder="Ingresa tu usuario"
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  </div>
                  

                  <div className="inlineBlock formFieldLogin">
                    <a href="#" className="btnSolid btnSolidArrow">
                        Recuperar contraseña
                    </a>
                    <a href="#" className='inlineBlock linkForgot'>Olvídenlo, ya lo recordé</a>
                  </div>

                </div>
              </div>
              <figure className="loginImg">
                <Image src={loginImg} />
              </figure>
              <a href="#" className="loginBackHome">
                <Image src={icoArrowBack} />
                Regresar
              </a>
            </div>
          </Container>
          <div className="loginCover"></div>
        </section>
      </div>
    )
  }
  
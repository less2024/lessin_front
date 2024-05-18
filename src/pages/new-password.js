
import '../styles/login.scss';

import { useState } from 'react';

import Image from 'next/image';

import Container from '@mui/material/Container';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

import loginImg from '../assets/img/login_new_password.png';
import icoArrowBack from '../assets/img/ico_arrow_back.png';


export default function NewPassword() {

    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event) => {
      event.preventDefault();
    };

    return (

      <div className="pageCont inlineBlock">
        <section className="secBox loginCont">
          <Container maxWidth="xm">
            <div className="inlineFlex loginBox">
              <div className="loginForm">
                <div className="title">
                    <h2>
                        ¡Hola, ***!
                    </h2>
                    <p>
                        Ingresa tu nueva contraseña
                    </p>
                </div>
                <div className="inlineBlock loginFormBox">

                  <div className="inlineBlock formFieldLogin">
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Nueva contraseña</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder="qqq"
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
                        />
                    </FormControl>
                  </div>
                  <div className="inlineBlock formFieldLogin">
                    <FormControl sx={{ m: 1, width: '25ch' }} variant="standard">
                        <InputLabel htmlFor="standard-adornment-password">Repite nueva contraseña</InputLabel>
                        <Input
                            id="standard-adornment-password"
                            type={showPassword ? 'text' : 'password'}
                            placeholder='asdasdd'
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
                        />
                    </FormControl>

                    <div className="inlineBlock formFieldValid">
                        <p>(*) Deben tener al menos ocho caracteres</p>
                        <p>(*) Incluir mayúsculas y minúsculas</p>
                        <p>(*) Incluir números</p>
                        <p>(*) Incluir símbolos</p>
                    </div>
                  </div>
                  

                  <div className="inlineBlock formFieldLogin">
                    <a href="#" className="btnSolid btnSolidArrow">
                    Continuar
                    </a>
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
  
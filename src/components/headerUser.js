import '../assets/css/components/headerUser.scss';

import { useState, useEffect,useContext } from 'react';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';


import SearchIcon from '@mui/icons-material/Search';
import Input from '@mui/material/Input';
import TextField from '@mui/material/TextField';
import InputAdornment from '@mui/material/InputAdornment';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';

import Autocomplete from '@mui/material/Autocomplete';

// Context 
import { userLessing } from "../context/user";

// Images
import icoGraduation from '../assets/img/ico_graduation.png';
import logoLessing from '../assets/img/logoLessingLogo.png';
import profileMini from '../assets/img/profile_mini.png';
import companyLogo from '../assets/img/companyLogo.png';

import icoProfileMenu1 from '../assets/img/ico_profile_menu1.svg';
import icoProfileMenu2 from '../assets/img/ico_profile_menu2.svg';
import icoProfileMenu3 from '../assets/img/ico_profile_menu3.svg';
import icoProfileMenu4 from '../assets/img/ico_profile_menu4.svg';
import ProfileAvatar from './dashboard/ProfileAvatar';



const HeaderUser = () => {

    const { loginData,logOut,courseUniv } = useContext(userLessing);
    const [menuProfile,setMenuProfile] = useState(true);
    const [menuLeft,setMenuLeft] = useState(true);
    const [dataUser,setDataUser] = useState();
    const router = useRouter();
    const [routerActive,setRouterActive] = useState(0);
    const [coursesList,setCoursesList]= useState([]);
    const [searchField,setSearchField] = useState();

    const openMenuProfile = () =>{
        setMenuProfile((current) => !current);
    }

    const openMenuLeft  = () =>{
        setMenuLeft((current) => !current);
    }

    const closeMenuLeft = () =>{
        setMenuLeft((current) => !current);
    }

    const closeMenuLeftLink = () =>{
        setMenuLeft(true);
        setMenuProfile(true);
    }

    useEffect(()=>{
        setDataUser(loginData);
        if(router.pathname === '/dashboard'){
            setRouterActive(0)
        }else{
            setRouterActive(1)
        }
        setCoursesList(courseUniv);
    },[router.pathname]);

    return (
        <header className='inlineBlock headerCont2'>
            <div className="headerTop">
                <div className="headerRespOpen" onClick={openMenuLeft}>
                    <ArrowForwardIosRoundedIcon/>
                </div>

                <figure>
                    <Link href="/dashboard">
                        <Image src={logoLessing} width={20} height={20} alt="Lessin Dashboard" title="Lessin Dashboard" />
                    </Link>
                </figure>

                <div className="headerSearch">
                    {false &&
                    <Input
                        id="input-with-icon-adornment"
                        placeholder="Sigue tu imaginación..."
                        startAdornment={
                        <InputAdornment position="start">
                            <SearchIcon />
                        </InputAdornment>
                        }
                    />
                    }

                    {coursesList &&
                    coursesList.length >0 &&
                    <Autocomplete
                        disablePortal
                        //value={searchField}
                        id="comboa56sdasd56asd"
                        options={coursesList}
                        onChange={(e, value) => {
                            setSearchField(value);
                            router.push('/dashboard/cursos/'+value.slug)
                        }}
                        //getOptionLabel={(option) => option.title.rendered}
                        getOptionLabel={option => option.title.rendered}
                        popupIcon={<SearchIcon />}
                        sx={{ width: '100%' }}
                        renderInput={(params) => {
                            return (
                                <TextField
                                    {...params}
                                    placeholder={"Sigue tu imaginación..."}
                                />
                            )
                        }}
                    />
                    }
                </div>

                <div className="headerProfile" onClick={openMenuProfile}>
                    <a href='#' className="ico">
                        <Image src={icoGraduation} width={20} height={20} alt="Graduation" title="Graduation" />
                    </a>
                    <a href='#' className="profile">
                        {loginData && <ProfileAvatar data={loginData.avatar} />}
                    </a>
                </div>
            </div>

            {dataUser &&
            <div className={menuLeft ? 'headerLeft' : 'headerLeft headerLeftOpen'}>
                <div className="companyLogo">
                    <Image src={ dataUser.logo !== '' ? dataUser.logo : companyLogo} width={50} height={50} alt="Company"/>
                </div>
                <ul className="hlMenu">

                    <li className={routerActive === 0 ? 'active' : ''}>
                        <Link href="/dashboard" onClick={closeMenuLeftLink}>
                            <svg width="26" height="26" viewBox="0 0 26 26" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M23.455 8.05814L15.4555 1.84188C14.7535 1.29624 13.8894 1 13 1C12.1106 1 11.2465 1.29624 10.5445 1.84188L2.5435 8.05814C2.06267 8.43172 1.67364 8.91014 1.40613 9.45687C1.13863 10.0036 0.999713 10.6042 1 11.2127V22.0028C1 22.7977 1.31607 23.56 1.87868 24.1221C2.44129 24.6842 3.20435 25 4 25H22C22.7957 25 23.5587 24.6842 24.1213 24.1221C24.6839 23.56 25 22.7977 25 22.0028V11.2127C25 9.97936 24.43 8.81494 23.455 8.05814Z" stroke="#5CE1E6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Inicio</span>
                        </Link>
                    </li>
                    <li className={routerActive === 1 ? 'active' : ''}>
                        <Link href="/dashboard/mis-cursos/" onClick={closeMenuLeftLink}>
                            <svg width="26" height="20" viewBox="0 0 26 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M7.66667 18.1667H3.66667C2.95942 18.1667 2.28115 17.9209 1.78105 17.4833C1.28095 17.0457 1 16.4522 1 15.8334V4.16671C1 3.54787 1.28095 2.95438 1.78105 2.51679C2.28115 2.07921 2.95942 1.83337 3.66667 1.83337H22.3333C23.0406 1.83337 23.7189 2.07921 24.219 2.51679C24.719 2.95438 25 3.54787 25 4.16671V17C25 17.3095 24.8595 17.6062 24.6095 17.825C24.3594 18.0438 24.0203 18.1667 23.6667 18.1667M11.6667 15.8334C11.6667 15.524 11.8071 15.2272 12.0572 15.0084C12.3072 14.7896 12.6464 14.6667 13 14.6667H18.3333C18.687 14.6667 19.0261 14.7896 19.2761 15.0084C19.5262 15.2272 19.6667 15.524 19.6667 15.8334V17C19.6667 17.3095 19.5262 17.6062 19.2761 17.825C19.0261 18.0438 18.687 18.1667 18.3333 18.1667H13C12.6464 18.1667 12.3072 18.0438 12.0572 17.825C11.8071 17.6062 11.6667 17.3095 11.6667 17V15.8334Z" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            <span>Cursos</span>
                        </Link>
                    </li>
                </ul>
                <div className="headerLogout">
                    <Link href="/login" className="logout" onClick={closeMenuLeftLink}>
                        <svg width="24" height="22" viewBox="0 0 24 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M14.3333 6.33268V3.99935C14.3333 3.38051 14.0875 2.78702 13.6499 2.34943C13.2123 1.91185 12.6188 1.66602 12 1.66602H3.83333C3.21449 1.66602 2.621 1.91185 2.18342 2.34943C1.74583 2.78702 1.5 3.38051 1.5 3.99935V17.9993C1.5 18.6182 1.74583 19.2117 2.18342 19.6493C2.621 20.0868 3.21449 20.3327 3.83333 20.3327H12C12.6188 20.3327 13.2123 20.0868 13.6499 19.6493C14.0875 19.2117 14.3333 18.6182 14.3333 17.9993V15.666M8.5 10.9993H22.5M22.5 10.9993L19 7.49935M22.5 10.9993L19 14.4993" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span onClick={logOut} >Cerrar Sesión</span>
                    </Link>
                    <Link href="/dashboard/profile" className="profile" onClick={closeMenuLeftLink}>
                        {loginData && <ProfileAvatar data={loginData.avatar} />}
                        <span>{dataUser.nombresCompletos.split(' ')[0]}</span>
                    </Link>
                </div>
            </div>
            }

            <div className={menuProfile ? 'perfilMenu': 'perfilMenu perfilMenuOpen'}>
                <div className="headerSearch headerSearch2">
                    {false &&
                    <Input
                        id="input-with-icon-adornment"
                        startAdornment={
                            <InputAdornment position="start">
                            <SearchIcon />
                            </InputAdornment>
                        }
                        placeholder="Sigue tu imaginación..."
                    />
                    }

                    <TextField
                        label="With normal TextField"
                        placeholder="Sigue tu imaginación..."
                        InputProps={{
                            startAdornment: (
                                <InputAdornment position="start">
                                <SearchIcon />
                                </InputAdornment>
                            )
                        }}
                    />
                </div>
                {dataUser &&
                <div className="title">
                    <figure>
                        {loginData && <ProfileAvatar data={loginData.avatar} />}
                    </figure>
                    <p>{dataUser.nombresCompletos.split(' ')[0]}</p>
                </div>
                }
                <ul className="list">
                    <li>
                        <Link href="/dashboard/profile"  onClick={closeMenuLeftLink}>
                            <Image src={icoProfileMenu1} alt="Mi Persil" title="Mi Persil" width={20} height={20} /> Mi Perfil
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/mis-cursos/"  onClick={closeMenuLeftLink}>
                            <Image src={icoProfileMenu2} alt="Mis Cursos" title="Mis Cursos" width={20} height={20} /> Mis Cursos
                        </Link>
                    </li>
                    <li>
                        <Link href="/dashboard/mis-cursos/mis-diplomas"  onClick={closeMenuLeftLink}>
                            <Image src={icoProfileMenu3} alt="Mis Diplomas" title="Mis Diplomas" width={20} height={20} /> Mis Diplomas
                        </Link>
                    </li>
                </ul>
                <div className="logout">
                    <a onClick={()=>{closeMenuLeftLink,logOut()}}>
                        <Image src={icoProfileMenu4} alt="Cerrar Sesión" title="Cerrar Sesión" width={20} height={20} />Cerrar Sesión
                    </a>
                </div>
            </div>
            <div className={menuProfile ? 'headerOverlay ' : 'headerOverlay headerOverlayOpen'}></div>
            <div onClick={closeMenuLeft} className={menuLeft ? 'headerOverlay headerOverlay2' : 'headerOverlay headerOverlay2 headerOverlayOpen'}></div>
        </header>
    )
};

export default HeaderUser;
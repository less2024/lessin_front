import '../assets/css/components/header.scss';

import { useEffect,useState,useContext } from 'react';
import { faker } from '@faker-js/faker';

import Link from 'next/link'
import Image from 'next/image';

import Container from '@mui/material/Container';

import KeyboardArrowDownOutlinedIcon from '@mui/icons-material/KeyboardArrowDownOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import ArrowForwardIosRoundedIcon from '@mui/icons-material/ArrowForwardIosRounded';
import MenuIcon from '@mui/icons-material/Menu';
import axios from 'axios';

// Context 
import { userLessing } from "../context/user";
import ProfileAvatar from './dashboard/ProfileAvatar';

const Header = () => {

    const [menuBar,setMenuBar] = useState();
    const [msElement, setMsElement] = useState(0);
    const [dataConfig,setDataConfig] = useState(null);
    const [dataCat,setDataCat] = useState(null);
    const { loginData } = useContext(userLessing);
    const [menuSub,setMenuSub] = useState(false);

    const subMenu = (tst) =>{
        setMsElement(tst);
    }

    // class subMenuBoxActive

    const getConfig = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/pages/228')
            .then((resp)=>{
                setDataConfig(resp.data)
            })
    }

    const getCategories = () =>{
        axios.get('https://api.lessin.pe/wp-json/wp/v2/categoria')
        .then((resp)=>{
            setDataCat(resp.data)
        })
    }

    useEffect(()=>{
        getCategories();
        getConfig();
        window.addEventListener("scroll", () => {
            if (window.scrollY > 10) {
                setMenuBar(true);
            } else {
                setMenuBar(false);
            }
        });  
        
    },[])

    return (
        <header className={menuBar ? 'inlineBlock headerCont headerContActive':'inlineBlock headerCont '}>

            <Container maxWidth="xm">
                <div className="inlineFlex headerBox" >
                    <div className="inlineFlex logoCont">
                        <div className="menuHamburguer">
                            <MenuIcon/>
                        </div>
                        <figure>
                            <Link href="/">
                                <svg width="77" height="32" viewBox="0 0 77 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.0793 23.8716C2.80289 23.8716 1.80472 23.5046 1.08262 22.7717C0.360511 22.0388 0 21.0003 0 19.6573V0L4.01542 0.00876382V19.5324C4.01542 20.297 4.32938 20.6793 4.95622 20.6793C5.27018 20.6793 6.21097 20.0078 6.52493 19.9048L7.37153 22.6939C6.53467 23.0653 5.01901 23.8716 4.07713 23.8716H4.0793Z" fill="#1A2D4D"/>
                                    <path d="M19.59 13.3494C19.59 10.3861 18.5128 8.90397 16.3584 8.90397C15.3754 8.90397 14.6067 9.27205 14.0524 10.0071C13.4981 10.7433 13.169 11.9209 13.064 13.5411H19.59V13.3494ZM23.5751 14.5325C23.5751 14.7462 23.5437 15.3005 23.4809 16.1955H13.064C13.1896 17.8376 13.6075 19.0098 14.3188 19.713C15.03 20.4163 15.9708 20.768 17.1422 20.768C17.8741 20.768 18.5648 20.6453 19.2133 20.3999C19.8618 20.1545 20.5514 19.7766 21.2843 19.265L22.9472 21.5995C21.1068 23.1134 19.0563 23.8704 16.7979 23.8704C14.2668 23.8704 12.317 23.0816 10.9464 21.5042C9.57581 19.9267 8.8916 17.773 8.8916 15.0441C8.8916 13.3166 9.18391 11.7654 9.7696 10.3905C10.3553 9.01571 11.2019 7.93885 12.3105 7.15997C13.4191 6.38218 14.7366 5.99219 16.2631 5.99219C18.5853 5.99219 20.3836 6.74369 21.66 8.24668C22.9364 9.74968 23.574 11.8442 23.574 14.5314L23.5751 14.5325Z" fill="#1A2D4D"/>
                                    <path d="M32.2761 5.99316C34.5139 5.99316 36.4799 6.66469 38.1742 8.00775L36.6055 10.4068C35.183 9.48993 33.7918 9.03202 32.4331 9.03202C31.6385 9.03202 31.0214 9.18648 30.5819 9.49541C30.1423 9.80433 29.9225 10.2151 29.9225 10.7267C29.9225 11.1101 30.0167 11.43 30.2051 11.6864C30.3935 11.9416 30.7334 12.1826 31.2249 12.4061C31.7164 12.6296 32.4429 12.8804 33.4053 13.1576C35.2046 13.6473 36.5373 14.298 37.4056 15.1086C38.2738 15.9193 38.708 17.0487 38.708 18.4991C38.708 20.184 38.0389 21.4997 36.6997 22.4494C35.3616 23.3981 33.6987 23.8725 31.711 23.8725C30.3513 23.8725 29.1117 23.6588 27.9933 23.2327C26.8739 22.8066 25.9071 22.2205 25.0908 21.4734L27.0991 19.1707C28.5422 20.2793 30.0481 20.8336 31.6168 20.8336C32.5165 20.8336 33.2321 20.6529 33.7658 20.2902C34.2996 19.9276 34.5659 19.427 34.5659 18.7873C34.5659 18.2965 34.4663 17.9076 34.2682 17.6195C34.069 17.3314 33.7139 17.0761 33.2018 16.8515C32.6886 16.6281 31.8897 16.3553 30.8016 16.0354C29.1073 15.5665 27.8634 14.9104 27.0677 14.069C26.273 13.2266 25.8757 12.1771 25.8757 10.9184C25.8757 9.9807 26.142 9.13828 26.6758 8.39226C27.2095 7.64624 27.9619 7.06016 28.9352 6.63292C29.9074 6.20678 31.0214 5.99316 32.2772 5.99316H32.2761Z" fill="#1A2D4D"/>
                                    <path className="line" d="M53.8431 27.9355H0.0576172V31.9998H53.8431V27.9355Z" fill="#F50F57"/>
                                    <path d="M47.41 5.99316C49.6478 5.99316 51.6149 6.66469 53.3081 8.00775L51.7394 10.4068C50.3169 9.48993 48.9257 9.03202 47.5659 9.03202C46.7713 9.03202 46.1542 9.18648 45.7147 9.49541C45.2751 9.80433 45.0554 10.2151 45.0554 10.7267C45.0554 11.1101 45.1495 11.43 45.3379 11.6864C45.5263 11.9416 45.8662 12.1826 46.3577 12.4061C46.8492 12.6296 47.5757 12.8804 48.5381 13.1576C50.3364 13.6473 51.6701 14.298 52.5384 15.1086C53.4067 15.9193 53.8408 17.0487 53.8408 18.4991C53.8408 20.184 53.1717 21.4997 51.8325 22.4494C50.4933 23.3981 48.8304 23.8725 46.8438 23.8725C45.4841 23.8725 44.2445 23.6588 43.1261 23.2327C42.0067 22.8066 41.0399 22.2205 40.2236 21.4734L42.2319 19.1707C43.675 20.2793 45.1809 20.8336 46.7496 20.8336C47.6493 20.8336 48.366 20.6529 48.8986 20.2902C49.4324 19.9276 49.6987 19.427 49.6987 18.7873C49.6987 18.2965 49.5991 17.9076 49.401 17.6195C49.2029 17.3314 48.8467 17.0761 48.3346 16.8515C47.8225 16.6281 47.0225 16.3553 45.9344 16.0354C44.2401 15.5665 42.9951 14.9104 42.2005 14.069C41.4059 13.2266 41.0085 12.1771 41.0085 10.9184C41.0085 9.9807 41.2749 9.13828 41.8086 8.39226C42.3423 7.64624 43.0947 7.06016 44.068 6.63292C45.0402 6.20678 46.1542 5.99316 47.409 5.99316H47.41Z" fill="#1A2D4D"/>
                                    <path d="M60.413 5.99316H56.3965V23.8714H60.413V5.99316Z" fill="#1A2D4D"/>
                                    <path fillRule="evenodd" clipRule="evenodd" d="M58.3926 0C58.9902 0 59.4763 0.191709 59.8509 0.575126C60.2244 0.958543 60.4117 1.43179 60.4117 1.99486C60.4117 2.55794 60.2244 3.0268 59.8509 3.40146C59.4774 3.77611 58.9913 3.96453 58.3926 3.96453C57.7939 3.96453 57.3327 3.77721 56.9592 3.40146C56.5857 3.02571 56.3984 2.55794 56.3984 1.99486C56.3984 1.43179 56.5857 0.959639 56.9592 0.575126C57.3327 0.191709 57.8113 0 58.3926 0Z" fill="#1A2D4D"/>
                                    <path d="M72.2934 5.99316C73.7788 5.99316 74.9339 6.45874 75.76 7.3899C76.586 8.32105 76.9996 9.6192 76.9996 11.2843V23.8714H72.9831V11.9416C72.9831 10.9119 72.8109 10.1888 72.4656 9.77256C72.1202 9.35628 71.6135 9.14814 70.9445 9.14814C70.2754 9.14814 69.6324 9.37271 69.0781 9.82186C68.5238 10.271 67.9846 10.9228 67.4628 11.7773V23.8714H63.4463V6.48613H66.9291L67.243 8.75377C68.6028 6.91337 70.2863 5.99316 72.2945 5.99316H72.2934Z" fill="#1A2D4D"/>
                                </svg>
                            </Link>
                        </figure>

                        <div className="smallMenu">
                            {dataConfig &&
                                dataConfig.acf &&
                                dataConfig.acf.menu_general &&
                                dataConfig.acf.menu_general.length > 0 &&
                                <ul>
                                    {dataConfig.acf.menu_general.map((item,index) =>{
                                        if(item.menu_list){
                                            return (
                                                <li 
                                                    className='subMenu' 
                                                    key={faker.string.uuid()}
                                                    onMouseEnter={() => setMenuSub(true)}
                                                    onMouseLeave={() => setMenuSub(false)}
                                                >
                                                    <Link href={item.menu_general_slug} className='space'>{item.menu_general_titulo} <KeyboardArrowDownOutlinedIcon/></Link>
                                                    <div className={menuSub ? 'subMenuBox subMenuBoxActive' : 'subMenuBox'}>
                                                        <div className="smbItem smbItem1">
                                                            <div className="title">
                                                                Esto es <strong>lessin</strong>
                                                            </div>
                                                            <div className="smbCat">
                                                                <a href="#">Categorías <ArrowForwardIosRoundedIcon/></a>
                                                            </div>
                                                        </div>
                                                        <div className="smbItem smbItem2">
                                                            {item.menu_list &&
                                                                item.menu_list.length > 0 &&
                                                                <ul className="smbCatList">
                                                                    {item.menu_list.map((subItem,index)=>{
                                                                        var icoCat = '';
                                                                        if(dataCat){
                                                                            dataCat.map((item)=>{
                                                                                if(parseInt(item.id) === parseInt(subItem.menu_catico)){
                                                                                    icoCat = item.acf.catcur_icono
                                                                                }
                                                                            })
                                                                        }
                                                                        return (
                                                                            <li key={faker.string.uuid()}>
                                                                                <a hef="#" className={msElement === index ? 'active':''} onClick={()=>{subMenu(index)}} >
                                                                                    {icoCat !== '' &&
                                                                                        <Image src={icoCat} width={50} height={50}  alt={subItem.menu_cat} title={subItem.menu_cat} />
                                                                                    }
                                                                                    {subItem.menu_cat} <ArrowForwardIosRoundedIcon/>
                                                                                </a>
                                                                            </li>
                                                                        )
                                                                    })}
                                                                </ul>
                                                            }
                                                        </div>
                                                        {item.menu_list.length  > 0 &&
                                                            <div className="smbItem smbItem3">
                                                                {
                                                                    item.menu_list.map((subItem,index)=>{
                                                                        var icoCat2 = '';
                                                                        if(dataCat){
                                                                            dataCat.map((item)=>{
                                                                                if(parseInt(item.id) === parseInt(subItem.menu_catico)){
                                                                                    icoCat2 = item.acf.catcur_icono
                                                                                }
                                                                            })
                                                                        }
                                                                        if(msElement === index){
                                                                            return (
                                                                                <div key={faker.string.uuid()} className="smbResp" >
                                                                                    <h3>
                                                                                        {icoCat2 !== '' &&
                                                                                        <Image 
                                                                                            src={icoCat2} 
                                                                                            alt={subItem.menu_cat} 
                                                                                            title={subItem.menu_cat} 
                                                                                            width={50} 
                                                                                            height={50} 
                                                                                            
                                                                                        />
                                                                                        }
                                                                                            {subItem.menu_cat}
                                                                                        </h3>
                                                                                    {subItem.menu_sublista &&
                                                                                        <ul key={faker.string.uuid()}>
                                                                                            {subItem.menu_sublista.length > 0 &&
                                                                                                subItem.menu_sublista.map((subItem2)=>(
                                                                                                <li  key={faker.string.uuid()}>
                                                                                                    <Link href={'/cursos/'+subItem2.menu_slslug}>{subItem2.menu_sltitulo}</Link>
                                                                                                </li>
                                                                                            ))}
                                                                                        </ul>
                                                                                    
                                                                                    }
                                                                                </div>
                                                                            )
                                                                        }

                                                                    })
                                                                }
                                                            </div>
                                                        }
                                                    </div>
                                                </li>
                                            )
                                        }else{
                                            return (
                                                <li key={faker.string.uuid()}>
                                                    <Link href={item.menu_general_slug}>{item.menu_general_titulo}</Link>
                                                </li>
                                            )
                                        }
                                    })}
                                </ul>
                            }

                        </div>

                    </div>

                    <div className="hLogin">
                        {loginData ?
                            <Link href="/dashboard" className='plataforma'>
                                <ProfileAvatar data={loginData.avatar} />
                                Plataforma {false && <strong> {loginData.nombresCompletos.split(' ')[0]}</strong>}
                            </Link>
                        :
                            <Link href="/login">
                                Iniciar Sesión <AccountCircleOutlinedIcon />
                            </Link>
                        }
                    </div>

                    {true &&
                    <div className="menuResp">
                        {dataConfig &&
                            dataConfig.acf &&
                            dataConfig.acf.menu_general &&
                            dataConfig.acf.menu_general.length > 0 &&
                        <ul key={faker.string.uuid()}>
                            {dataConfig.acf.menu_general.map((item,index) =>{
                                if(item.menu_list){
                                    return (
                                        <li key={faker.string.uuid()}>
                                            <a href="#">
                                                {item.menu_general_titulo} <KeyboardArrowDownOutlinedIcon/>
                                            </a>
                                            {item.menu_list &&
                                                item.menu_list.length > 0 &&
                                            <ul key={faker.string.uuid()}>
                                                <li key={faker.string.uuid()}>
                                                    <a href="#">
                                                        Categorías <KeyboardArrowDownOutlinedIcon/>
                                                    </a>

                                                    <ul key={faker.string.uuid()}>

                                                        {item.menu_list.map((subItem,index)=>{
                                                            var icoCat3 = '';
                                                            if(dataCat){
                                                                dataCat.map((item)=>{
                                                                    if(parseInt(item.id) === parseInt(subItem.menu_catico)){
                                                                        icoCat3 = item.acf.catcur_icono
                                                                    }
                                                                })
                                                            }
                                                            return (
                                                                <li key={faker.string.uuid()}>
                                                                    <a href="#"  >
                                                                        {icoCat3 !== '' &&
                                                                        <Image src={icoCat3} width={50} height={50} alt="Sub menu" title='Sub menu' />
                                                                        }
                                                                        {subItem.menu_cat} <ArrowForwardIosRoundedIcon/>
                                                                    </a>
                                                                    {subItem.menu_sublista &&
                                                                    <ul key={faker.string.uuid()}>
                                                                        {subItem.menu_sublista.length > 0 &&
                                                                            subItem.menu_sublista.map((subItem2)=>(
                                                                            <li key={faker.string.uuid()}><Link href={'/cursos/'+subItem2.menu_slslug}>{subItem2.menu_sltitulo}</Link></li>
                                                                        ))}
                                                                        
                                                                    </ul>
                                                                    }
                                                                </li>
                                                            )
                                                        })}
                                                    </ul>
                                                </li>
                                            </ul>
                                            }
                                        </li>
                                    )
                                }else{
                                    return (
                                        <li key={faker.string.uuid()}>
                                            <Link href={item.menu_general_slug}>{item.menu_general_titulo}</Link>
                                        </li>
                                    )
                                }
                            })}
                        </ul>
                        }
                    </div>
                    }
                </div>
            </Container>
            <div className="headerOverlayNotUser"></div>
        </header>
    )
};

export default Header;
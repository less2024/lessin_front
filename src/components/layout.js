import '../styles/global.scss';
import '../assets/css/widget.scss';

import { useEffect,useState } from 'react';
import dynamic from 'next/dynamic';

//import Header from '../components/header';
//import HeaderUser from '../components/headerUser';
//import Footer from '../components/footer';
//import FooterUser from '../components/footerUser';
//import Widget from './widget';


const DynamicHeader = dynamic(() => import('../components/header'), {
  loading: () => 'Loading...',
})

const DynamicHeaderUser = dynamic(() => import('../components/headerUser'), {
  loading: () => 'Loading...',
})

const DynamicFooter = dynamic(() => import('../components/footer'), {
  loading: () => 'Loading...',
})

const DynamicFooterUser = dynamic(() => import('../components/footerUser'), {
  loading: () => 'Loading...',
})
const DynamicWidget = dynamic(() => import('./widget'), {
  loading: () => 'Loading...',
})


import Contetxt  from "../context/user";

import { useRouter } from 'next/router'

import SplashComponent from './splash';
import TransitionEffect3 from './transition/transition';

const DynamicProgress = dynamic(() => import('nextjs-progressbar'), {
  loading: () => 'Loading...',
})


export default function RootLayout({ children }) {
  
  const router = useRouter();
  const routerComponents = router.pathname;
  const [components,setComponents] = useState('');
  const [load,setLoad] = useState(false);
  //const shouldReduceMotion = useReducedMotion();
  const [loadDash,setLoadDash] = useState(false);
  const [inCourse,setInCourse] = useState(false);

  const handleComponents = () =>{
    if(routerComponents === '/login'){
      setComponents('componentNone');
    }else if(routerComponents === '/datospersonales'){
      setComponents('componentNone');
    }else if(routerComponents === '/forget-password'){
      setComponents('componentNone');
    }else if(routerComponents === '/new-password'){
      setComponents('componentNone');
    }else if(routerComponents === '/libro-de-reclamos'){
      setComponents('componentDefault');
    }else if(routerComponents === '/cursos'){
      setComponents('componentDefault');
    }else if(routerComponents === '/cursos2'){
      setComponents('componentDefault');
    }else if(routerComponents === '/detalle-curso'){
      setComponents('componentDefault');
    }else if(routerComponents === '/in-course'){
      setComponents('componentUser');
    }else if(routerComponents === '/'){
      setComponents('componentDefault');
    }else if(routerComponents === '/cursos/[detalle]'){
      setComponents('componentDefault');
    }else{
      setComponents('componentUser');
    }

    if(routerComponents === '/dashboard'){
      const child = document.getElementById('blurPages');
      child.parentElement.classList.add('blurPagesDisable');
    }else{
      const child = document.getElementById('blurPages');
      child.parentElement.classList.remove('blurPagesDisable');
    }

    
  }


  useEffect(() => {
    console.log(routerComponents)
    setTimeout(()=>{
      setLoad(true);
      if(routerComponents === '/dashboard'){
        setLoadDash(true);
      }
      if(routerComponents === '/dashboard/mis-cursos/[detalle]'){
        setInCourse(true);
      }
    },1400)
    handleComponents();
  }, [routerComponents]);


  return (
    <main>

      {routerComponents === '/' &&
        <SplashComponent page={load}  />
      }
      {routerComponents === '/dashboard' &&
        <SplashComponent page={loadDash}  />
      }
      {routerComponents === '/dashboard/mis-cursos/[detalle]' &&
        <SplashComponent page={inCourse}  />
      }

      <Contetxt>
        {components === 'componentDefault'  && <DynamicHeader/> }
        {components === 'componentUser'  && <DynamicHeaderUser/> }
        {components === ''  && '' }

        
          <TransitionEffect3 >
            {children}
          </TransitionEffect3>
          {routerComponents !== '/dashboard/mis-cursos/[detalle]' &&
            <DynamicWidget/>
          }
          <DynamicProgress  color="#F50F57" height={4} />
        {components == 'componentDefault'  ? <DynamicFooter/> : components == 'componentUser' ? <DynamicFooterUser/> : '' }
      </Contetxt>
    </main>
  )
}


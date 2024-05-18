import { createContext, useState } from "react";
import { useRouter } from 'next/router';
import { useEffect } from "react";
import axios from 'axios';

export const userLessing = createContext(null);

function Context({ children }) {

  const router = useRouter();
  const routeTemp =  router.pathname;
  const [loading,setLoading] = useState(false);
  const [loginData, setLoginData] = useState(
    () => {
      if(typeof window !== 'undefined'){
        return JSON.parse(window.localStorage.getItem('dataKey'));
      }
    }
  );

  const logOut = () =>{
    window.localStorage.removeItem('dataKey');
    router.push('/login');
    setLoginData(null);
  }

  // Cursos StatesGenerales
  const [categoriesUniv,setCategoriesUniv] = useState(null);
  const [courseUniv,setCoursesUniv] = useState(null);
  
  // Cursos
  const getCourses = () =>{
      axios.get('https://api.lessin.pe/wp-json/wp/v2/cursos?per_page=100')
          .then((resp)=>{
            setCoursesUniv(resp.data);
          }).catch((error)=>{
              console.log(error)
          })
  }

  const getCategories = ()=>{
      axios.get('https://api.lessin.pe/wp-json/wp/v2/categoria')
          .then((resp)=>{
            setCategoriesUniv(resp.data);
          }).catch((error)=>{
              console.log(error)
          })
  }

  useEffect(()=>{
    getCourses();
    getCategories();
  },[])


  return (
      <userLessing.Provider
        value={
          {
            loading,
            setLoading,
            loginData,
            setLoginData,
            logOut,

            // Data universal
            categoriesUniv,
            courseUniv
            
          }
        }
      >
        {children}
      </userLessing.Provider>
  );
}

export default Context;
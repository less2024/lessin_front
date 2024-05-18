
import Image from 'next/image';
import { faker } from '@faker-js/faker';

import '../../assets/css/components/home/Docentes.scss';
import Link from 'next/link';
import { useState } from 'react';

const HomeDocentes = ({data,link}) => {

    // Animacion docentes
    const [docenteItem,setDocenteItem] = useState(0);
        const docentAnim = (index)=>{
        setDocenteItem(index)
    }


    return (
        <div className={link ? 'inlineFlex docentesBox docentesBoxDash':'inlineFlex docentesBox'}>

            <div className="title">

                {data &&
                    data.acf.docentes_titulo &&
                    <h2><div dangerouslySetInnerHTML={{__html:data.acf.docentes_titulo}}></div></h2>
                }

                {data &&
                    data.acf.docentes_txt &&
                    <p><div dangerouslySetInnerHTML={{__html:data.acf.docentes_txt}}></div></p>
                }
                
                <Link href={link ? link :'/cursos'} className='btnSolid btnSolidArrow'>
                    Ir a catálogo de cursos
                </Link>
            </div>

          
            {true &&
                data &&
                <div className="docentesAcordeon">
                    {data.acf.docentes_lista &&
                        data.acf.docentes_lista.map((item,index)=>{
                        return (
                            <div onClick={()=>{docentAnim(index)}} className={docenteItem === index ? 'docenteItem docenteItemActive': 'docenteItem'}>
                                <Image src={item.docentes_limg} width={50} height={50} alt={item.docentes_lnombre} title={item.docentes_lnombre} />
                                <div className="title">
                                <h5>{item.docentes_lnombre}</h5>
                                <p>{item.docentes_lcurso}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            }
        </div>
    )
};

export default HomeDocentes;
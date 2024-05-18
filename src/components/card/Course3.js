// Css
import '../../assets/css/components/CardCourse3.scss';

import Image from 'next/image';
import { faker } from '@faker-js/faker';
import Link from 'next/link';

// Curos
import icoPlay from '../../assets/img/ico_play.png';


const CardCourse3 = ({data,returnData,modal}) => {

    const openCourseModal = (item) =>{
        returnData(item)
        return modal(true)
    }

    return (
        <div className="lfbItem" key={faker.string.uuid()} onClick={()=>openCourseModal(data)}>
            <figure>
                <Image src={data.acf.m_catalogo && data.acf.m_catalogo} width={100} height={100} title={data.title.rendered} alt={data.title.rendered} />
                <div className="play">
                    <Image src={icoPlay} width={10} height={10} alt="play" title="play" />
                </div>
            </figure>
            <div className="txt">
                <div className="category">
                    Fecha: {data.acf.m_fecha}
                </div>
                <h4>
                    {data.title.rendered}
                </h4>
                <p>
                {data.acf.m_sdescripcion}
                </p>
                <div 
                    className='more'
                    //onClick={()=>{window.open(data.acf.m_link, '_blank')}}
                >
                        Ver más
                </div>
            </div>
        </div>
    )
};

export default CardCourse3;
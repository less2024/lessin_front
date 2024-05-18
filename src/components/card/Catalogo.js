// Css
import '../../assets/css/components/CardCatalogo.scss'

import Image from 'next/image';
import { faker } from '@faker-js/faker';


// Curos
import icoStart from '../../assets/img/ico_curso_star.svg';
import icoCursoStudent from '../../assets/img/ico_curso_student.svg';

import inicio_curso1 from '../../assets/img/inicio_curso1.png';
import Link from 'next/link';


const CardCatalogo = ({data,categories,direct}) => {

    const openCourseModal = (item) =>{
        returnData(item)
        return modal(true)
    }

    return (
        <div className="cardCatalogo" key={faker.string.uuid()}>
            <Link href={ direct ? '/dashboard/mis-cursos/'+data.slug: '/cursos/'+data.slug}>
                <figure>
                    <Image src={data.acf.imagen_catalogo ? data.acf.imagen_catalogo : inicio_curso1} width={100} height={100} title={data.title.rendered} alt={data.title.rendered} />
                    <figcaption>
                        <div className="item">
                            <Image src={icoStart} alt="Valoraciones" title="Valoraciones" /> {data.acf.pcurso_valoracion4}
                        </div>
                        <div className="item">
                            <Image src={icoCursoStudent}  alt="Estudiantes" title="Estudiantes"  /> {data.acf.pcurso_estudiantes} estudiantes
                        </div>
                    </figcaption>
                </figure>
                <div className="txt">
                    <div className="catList">
                        {categories &&
                            data.categoria.length > 0 &&
                            categories.map((item)=>{
                            if(item.id === data.categoria[0]){
                                return (
                                    <a href=""  key={faker.string.uuid()}>{item.name}</a>
                                )
                            }
                        })}
                        
                    </div>
                    <h4>{data.title.rendered}</h4>
                    <p>Por: {data.acf.pcurso_profesor}</p>
                    <div  className='btnCurso'>
                        Detalles del curso
                    </div>
                </div>
            </Link>
        </div>
    )
};

export default CardCatalogo;
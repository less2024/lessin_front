// Css
import '../../assets/css/components/CardCourse2.scss';

import Image from 'next/image';
import { faker } from '@faker-js/faker';

// Curos
import icoStart from '../../assets/img/ico_curso_star.svg';
import icoCursoStudent from '../../assets/img/ico_curso_student.svg';

import inicio_curso1 from '../../assets/img/inicio_curso1.png';

const CardCourse2 = ({data,categories,modal,returnData}) => {

    const openCourseModal = (item) =>{
        returnData(item)
        return modal(true)
    }

    return (
        <div className="cursoItem2" key={faker.string.uuid()}>
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
                        var category = ''
                        if(item.id === data.categoria[0]){
                            return (
                                <a href=""  key={faker.string.uuid()}>{item.name}</a>
                            )
                        }
                    })}
                    
                </div>
                <h4>{data.title.rendered}</h4>
                <p>Por: {data.acf.pcurso_profesor}</p>
                    <div onClick={()=>openCourseModal(data)} className='btnCurso'>
                        Detalles del curso
                    </div>
            </div>
        </div>
    )
};

export default CardCourse2;
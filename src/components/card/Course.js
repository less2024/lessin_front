// Css
import '../../assets/css/components/CardCourse.scss'

import Image from 'next/image';
import { faker } from '@faker-js/faker';


// Curos
import icoStart from '../../assets/img/ico_curso_star.svg';
import icoCursoStudent from '../../assets/img/ico_curso_student.svg';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

import inicio_curso1 from '../../assets/img/inicio_curso1.png';

const CardCourse = ({data,categories,modal,returnData}) => {

    const openCourseModal = (item) =>{
        returnData(item)
        return modal(true)
    }

    return (
        <div className="cursoItem" key={faker.string.uuid()} onClick={()=>openCourseModal(data)}>
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
                                <div  key={faker.string.uuid()}>{item.name}</div>
                            )
                        }
                    })}
                    {data.categoria.length === 0 &&
                        <div  key={faker.string.uuid()}>No category</div>
                    }
                    
                </div>
                <h4>
                    <span>
                        {data.title.rendered}
                    </span>
                </h4>
                
                <small>Por: {data.acf.pcurso_profesor}</small>
                {data.acf.pcurso_desccorta === '' ?
                    <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Accusamus, tempore modi? Ipsam repellat quae facere inventore iure neque excepturi sint iste nesciunt, a alias assumenda officia tempore veritatis amet. Quibusdam?</p>
                    :
                    <p>{data.acf.pcurso_desccorta}</p>
                }
                

                <div className="inlineBlock btnBoxMore">
                    <div  className='btnCurso'>
                        Detalles del curso
                        <ArrowForwardIosIcon />
                    </div>
                </div>
            </div>
        </div>
    )
};

export default CardCourse;
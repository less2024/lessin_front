import Image from 'next/image';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { faker } from '@faker-js/faker';

import '../../assets/css/components/ModalCourse.scss';
import ico_det_curso_play from '../../assets/img/ico_det_curso_play.png';

import ico_det_curso_estudents from '../../assets/img/ico_det_curso_cont1.png';
import ico_det_curso_star from '../../assets/img/ico_det_curso_cont6.png';
import ico_det_curso_lessin from '../../assets/img/ico_det_curso_cont3.png';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CloseIcon from '@mui/icons-material/Close';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '88%',
  overflow: 'hidden',
  borderRadius:3,
  //boxShadow: 24,
  outline:'none'
};

const ModalCourse = ({data,modal,modalClose,categories,dashboard}) => {
    
    return (
        <Modal
            open={modal}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="courseModalClose" onClick={modalClose}>
                    <CloseIcon/>
                </div>
                {data &&
                    <div className="courseProductModal">
                        <figure>
                            <Link href={dashboard ? '/dashboard/cursos/'+data.slug : '/cursos/'+data.slug} onClick={modalClose} >
                                <Image src={data.acf.pcurso_videopreview} width={100} height={100} title={data.title.rendered} alt={data.title.rendered} />
                                <div className="play" >
                                    <Image src={ico_det_curso_play}  width={"50"} height={"50"} />
                                </div>
                            </Link>
                        </figure>
                        <div className="txt">
                            <div className="catList">
                                {
                                categories &&
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
                            <div className="caractBox">
                                <div className='item' >
                                    <Image src={ico_det_curso_star}  width={"50"} height={"50"}  />
                                    {data.acf.pcurso_valoracion}
                                </div>
                                <div className='item' >
                                    <Image src={ico_det_curso_estudents}  width={"50"} height={"50"}  />
                                    {data.acf.pcurso_estudiantes} estudiantes 
                                </div>
                                <div className='item' >
                                    <Image src={ico_det_curso_lessin} width={"50"} height={"50"}   />
                                    {data.acf.pcurso_lecciones} lecciones
                                </div>
                            </div>
                            <div className="descTxt">
                                <p>{data.acf.pcurso_desccorta}</p>
                            </div>
                            <div className="btnModalInsc">
                                <Link href={dashboard ? '/dashboard/cursos/'+data.slug : '/cursos/'+data.slug} onClick={modalClose} >
                                    Detalles del curso
                                    <ArrowForwardIosIcon />
                                </Link>
                            </div>
                        </div>
                    </div>
                }
            </Box>
        </Modal>
    )
};

export default ModalCourse;
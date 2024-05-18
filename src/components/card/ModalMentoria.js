import Image from 'next/image';
import Link from 'next/link';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { faker } from '@faker-js/faker';

import '../../assets/css/components/ModalCourse.scss';
import ico_det_curso_play from '../../assets/img/ico_det_curso_play.png';


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

const ModalMentoria = ({data,modal,modalClose,categories}) => {
    
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
                    <div className="courseProductModal courseProductModal2">
                        <figure>
                            <Image src={data.acf.m_catalogo} width={100} height={100} title={data.title.rendered} alt={data.title.rendered} />
                            <div className="play" >
                                <Image src={ico_det_curso_play}  width={"50"} height={"50"} />
                            </div>
                            <div className='fecha'>Fecha: {data.acf.m_fecha}</div>
                        </figure>
                        <div className="txt">
                            
                            <h4 onClick={()=>console.log(data)}>{data.title.rendered}</h4>
                            <p className='byMentor'>Por: {data.acf.m_mentor}</p>

                            <div className="descTxt">
                                <p>{data.acf.m_descripcion}</p>
                            </div>
                            <div className="btnModalInsc">
                                <Link href={'/cursos/'+data.slug} >
                                    Ver más
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

export default ModalMentoria;
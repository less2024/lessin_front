import Image from 'next/image';

import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { faker } from '@faker-js/faker';

import '../../assets/css/components/ModalChangeAvatar.scss';

import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useEffect, useState,useContext } from 'react';
import axios from 'axios';
import { userLessing } from "../../context/user";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  maxWidth: 600,
  width: '88%',
  overflow: 'hidden',
  borderRadius:3,
  outline:'none'
};

const ChangeProfile = ({data,modal,modalClose}) => {
    const [avatar,setAvatar] = useState();
    const { loginData,setLoginData } = useContext(userLessing);

    const avatarList = [
        {name:'Avatar #0'},
        {name:'Avatar #1'},
        {name:'Avatar #2'},
        {name:'Avatar #3'},
        {name:'Avatar #4'},
        {name:'Avatar #5'},
        {name:'Avatar #6'},
        {name:'Avatar #7'},
        {name:'Avatar #8'},
        {name:'Avatar #9'},
        {name:'Avatar #10'},
        {name:'Avatar #11'},
        {name:'Avatar #12'},
        {name:'Avatar #13'},
        {name:'Avatar #14'},
        {name:'Avatar #15'},
        {name:'Avatar #16'},
        {name:'Avatar #17'},
        {name:'Avatar #18'},
        {name:'Avatar #19'},
        {name:'Avatar #20'},
        {name:'Avatar #21'},
        {name:'Avatar #22'},
        {name:'Avatar #23'},
        {name:'Avatar #24'},
    ]

    const selectAvatar = (index)=>{
        setAvatar(index)
    }

    const updateAvatar = () =>{
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/updateAvatarFront',{
            idCliente:loginData.idUser,
            avatar:avatar,
        }).then((resp)=>{
            setLoginData({
                ...loginData,
                avatar:avatar
            })

            if(typeof window !== 'undefined'){
                window.localStorage.setItem('dataKey',
                JSON.stringify(
                {
                    ...loginData,
                    avatar:avatar
                }));
            }

            modalClose();
        })
    }

    useEffect(()=>{
        setAvatar(data)
    },[modal])

    return (
        <Modal
            open={modal}
            onClose={modalClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
        >
            <Box sx={style}>
                <div className="changeAvatarCont">
                    <h3>Seleccione su avatar</h3>
                    <ul>
                        {avatarList.map((item,index)=>{
                            if(parseInt(data) === parseInt(index)) {
                                return(
                                    <li key={faker.string.uuid()} onClick={()=>selectAvatar(index)} className={avatar === index && 'active'} >
                                        <div className="changeAvatarItem">
                                            <Image src={'/img/avatars/avatar_'+index+'.jpg'} width={50} height={50} alt={item.name} title={item.name} />

                                        </div>
                                        {false &&
                                        <div className="ico">
                                            <CheckCircleIcon />
                                        </div>
                                        }
                                    </li>
                                )

                            }else{
                                return(
                                    <li key={faker.string.uuid()} onClick={()=>selectAvatar(index)} className={avatar === index ? 'active': ''}>
                                        <div className="changeAvatarItem">
                                            <Image src={'/img/avatars/avatar_'+index+'.jpg'} width={50} height={50} alt={item.name} title={item.name} />
                                        </div>
                                        {false &&
                                        <div className="ico">
                                            <CheckCircleIcon />
                                        </div>
                                        }
                                    </li>
                                )
                            }

                        })}
                    </ul>
                    {avatar !== data &&
                    <div className="inlineFlex btnChangeBox">
                        <a className='btnSolid' onClick={updateAvatar}>
                            Actualizar avatar
                        </a>
                    </div>
                    }
                </div>
            </Box>
        </Modal>
    )
};

export default ChangeProfile;
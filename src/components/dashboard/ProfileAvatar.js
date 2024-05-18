import Image from 'next/image';

const ProfileAvatar = ({data}) => {      
    return (
        <Image src={'/img/avatars/avatar_'+data+'.jpg'} width={20} height={20} alt="Perfil" title="Perfil" />
    )
};

export default ProfileAvatar;
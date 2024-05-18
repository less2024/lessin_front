
import { useState, useEffect, useRef,useCallback } from "react";
import '../../assets/css/components/dashboard/Video.scss';
import dynamic from 'next/dynamic';
import ReactPlayer from 'react-player';
import axios from "axios";


const VideoFrame = ({data,dataChange,index,subIndex,idVideo,lastTime,loginData,courseId,courseProgress,courseObs,docente,showCertified,setShowCertified,setShowNextvid}) => {

  const [durationVideo,setDurationVideo] = useState();
  const videoPlayerRef = useRef(null);
  

  const updateObjetc = (i,ii,currentTime,duractionTime) =>{
    const temasList = [];
    if(data){
    data.map((obj,ind)=>{
      const temasSubList= [];
      if(ind === i){
        obj.pcurso_temario_lista.map((subObj,subInd)=>{
          if(subInd === ii){
            temasSubList.push({
              pcurso_temario_ltime:Math.round(currentTime),
              pcurso_temario_lpercent:Math.round((100 * currentTime) / duractionTime),
              pcurso_temario_lactive:true,
              pcurso_temario_lduracion:subObj.pcurso_temario_lduracion,
              pcurso_temario_lmateriales:subObj.pcurso_temario_lmateriales,
              pcurso_temario_ltitulo:subObj.pcurso_temario_ltitulo,
              pcurso_temario_lvideo:subObj.pcurso_temario_lvideo
            })
          }else{
            temasSubList.push({
              pcurso_temario_ltime:subObj.pcurso_temario_ltime ? subObj.pcurso_temario_ltime : 0 ,
              pcurso_temario_lpercent:subObj.pcurso_temario_lpercent ? subObj.pcurso_temario_lpercent : 0,
              pcurso_temario_lactive:false,
              pcurso_temario_lduracion:subObj.pcurso_temario_lduracion,
              pcurso_temario_lmateriales:subObj.pcurso_temario_lmateriales,
              pcurso_temario_ltitulo:subObj.pcurso_temario_ltitulo,
              pcurso_temario_lvideo:subObj.pcurso_temario_lvideo
            })
          }
        })
        temasList.push({
          pcurso_temario_titulo:obj.pcurso_temario_titulo,
          pcurso_temario_lista:temasSubList
        });
      }else{
        const temasSubList2= [];
        obj.pcurso_temario_lista.map((subObj)=>{
          temasSubList2.push({
            pcurso_temario_ltime:subObj.pcurso_temario_ltime ? subObj.pcurso_temario_ltime : 0 ,
            pcurso_temario_lpercent:subObj.pcurso_temario_lpercent ? subObj.pcurso_temario_lpercent : 0,
            pcurso_temario_lactive:false,
            pcurso_temario_lduracion:subObj.pcurso_temario_lduracion,
            pcurso_temario_lmateriales:subObj.pcurso_temario_lmateriales,
            pcurso_temario_ltitulo:subObj.pcurso_temario_ltitulo,
            pcurso_temario_lvideo:subObj.pcurso_temario_lvideo
          })
        });
        temasList.push({
          pcurso_temario_titulo:obj.pcurso_temario_titulo,
          pcurso_temario_lista:temasSubList2
        });
      }
    });
    }
    
    dataChange(temasList);
    //setShowNextvid(false);
    
  }

  const updateProgress = () =>{
    
    let totalSecondList = 0;
    let advanceSecondList = 0;

    data.map((item)=>{
      item.pcurso_temario_lista.map((subItem)=>{
        if(subItem.pcurso_temario_lduracion !== ''){
          totalSecondList = totalSecondList + parseInt(subItem.pcurso_temario_lduracion);
          const secondSumAdvance = (parseInt(subItem.pcurso_temario_lduracion) /100) * parseInt(subItem.pcurso_temario_lpercent);
          advanceSecondList =  advanceSecondList + secondSumAdvance;
        }
      })
    })

    const progressPercentTmp = Math.round((100 * advanceSecondList)/totalSecondList);
    courseProgress(progressPercentTmp);
  }

  const onReady = () => {
    updateObjetc(index,subIndex,lastTime,durationVideo);
    //console.log('ready');
  };

  const videoStart = () =>{
    videoPlayerRef.current.seekTo(lastTime,'seconds');
    //console.log('start');
    setShowNextvid(false);
  }

  const videoPause = () =>{
    updateProgress();
    //updateObjetc(index,subIndex,lastTime,durationVideo);
    savedList();
  }

  const videoPlay = (e) =>{
    //console.log('play');
    
  }

  
  const videoProgress = (e) =>{
    updateProgress();
    const timeProgress = parseInt(durationVideo) - parseInt(e.playedSeconds)
    if(timeProgress < 20){
      setShowNextvid(true)
    }else{
      setShowNextvid(false)
    }
    updateObjetc(index,subIndex,e.playedSeconds,durationVideo);
    savedList();
  }
  
  const videoError = () =>{
    //console.log('errrr');
  }

  const videoDuration = (e) =>{
    setDurationVideo(e);
  }

  const videoEnd = (e) =>{
    if(courseObs > 95){
      
        
        const currentdate = new Date();
        const dateFormat = currentdate.getFullYear() + "/" + (currentdate.getMonth()+1) + "/" + currentdate.getDate();
        axios.post('https://api.lessin.pe/wp-json/usuarios/v1/updateTimeForCourse',
          {

              user_id:loginData.idUser,
              course_id:courseId,
              course_progress:100,
              course_state:1,
              course_end:dateFormat,
              course_docente:docente
          }
        )
        .then((resp)=>{
          setShowCertified(true);
        }).catch((error)=>{
        });
      
      
    }else{
      axios.post('https://api.lessin.pe/wp-json/usuarios/v1/updateTimeForCourse',
        {

            user_id:loginData.idUser,
            course_id:courseId,
            course_progress:courseObs,
            course_state:'0',
            course_end:'',
            course_docente:docente
        }
      )
      .then((resp)=>{
      }).catch((error)=>{
      });
    }
  }

  const videoOnSeek = ()=>{
    //console.log('seek');
  }

  //Saved information
  const savedList =() =>{

    axios.post('https://api.lessin.pe/wp-json/usuarios/v1/updateCourseUser',
      {
          courses_list:JSON.stringify(data),
          user_id:loginData.idUser,
          course_time:"0",
          course_id:courseId,
          course_progress:courseObs
      }
    )
    .then((resp2)=>{
      //console.log(resp2.data)
    }).catch((error)=>{
      console.log(error);
    });
  }

  useEffect(()=>{
    //setShowNextvid(false)
  },[])

  return (
      <div className="inlineBlock ">
        <ReactPlayer 
          ref={videoPlayerRef}
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          className="lessinPlayer"
          url={'https://vz-8ee33ee6-69a.b-cdn.net/'+idVideo+'/play_720p.mp4'}
          playing={true}
          controls={true}
          onReady={onReady}
          onStart={videoStart}
          onPause={videoPause}
          onPlay={videoPlay}
          onProgress={videoProgress}
          onError={videoError}
          onDuration={videoDuration}
          onEnded={videoEnd}
          progressInterval={5000}
          onSeek={videoOnSeek}
          id="aasdad54d9as84d9as8d4"
        />

      </div>
  )
};

export default VideoFrame;
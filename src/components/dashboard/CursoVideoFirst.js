
import {  useEffect, useRef, useState } from "react";
import '../../assets/css/components/dashboard/Video.scss';
import dynamic from 'next/dynamic'
const ReactPlayer = dynamic(() => import("react-player"), { ssr: false });

const VideoFrameFirst = ({idVideo}) => {

  const videoPlayerRef2 = useRef(null);
  const [reactAutoplay,setReactAutoplay] = useState(true);
  const [reactVolume,setReactVolume] = useState(1);

  const onReady = () => {
  };

  const videoStart = () =>{
  }

  const videoPause = () =>{
  }

  const videoPlay = (e) =>{
  }

  const videoProgress = (e) =>{
  }
  
  const videoError = () =>{
  }

  const videoDuration = (e) =>{
  }

  const videoEnd = (e) =>{
  }

  const videoOnSeek = ()=>{
  }


  useEffect(()=>{

  },[])

  return (
      <div className="inlineBlock ">
        <ReactPlayer 
          ref={videoPlayerRef2}
          config={{ file: { attributes: { controlsList: 'nodownload' } } }}
          className="lessinPlayer"
          url={'https://vz-8ee33ee6-69a.b-cdn.net/'+idVideo+'/play_720p.mp4'}
          playing={reactAutoplay}
          controls={true}
          volume={reactVolume}
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
          id="asdad56a4sas6d54das65d"
        />

      </div>
  )
};

export default VideoFrameFirst;
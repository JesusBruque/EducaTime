import React, {FunctionComponent, useEffect} from "react";
import Plyr from "plyr";
import styles from '../styles/Video.module.css';
import utilStyles from '../styles/Utils.module.css';
import {faTimes,faPlay,faVolumeUp,faVolumeDown,faVolumeMute,faExpand,faCompress} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    src:string,
    autoPlay?:boolean,
    onClose:() => void,
    title:string
}
const VideoComponent: FunctionComponent<Props> = (props) => {


   useEffect(() => {
       const player = new Plyr('#player',{controls:['play','play-large','progress','fullscreen','volume','current-time','mute']});
       player.once('canplay', () => {
           player.play();
       });
   },[]);



    return (
        <div className={styles.videoContainer}>
            <div className={utilStyles.background}></div>
            <div className={styles.videoMarco}>
                <div className={styles.videoHeader}>
                    <FontAwesomeIcon icon={faTimes} onClick={props.onClose} className={utilStyles.icon}/>
                    <span>{props.title}</span>
                </div>
                <video id="player" playsInline controls>
                    <source src={props.src} type="video/mp4"/>
                </video>
            </div>
        </div>
    )
};

export default VideoComponent;

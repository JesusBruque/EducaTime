import React, {FunctionComponent, useEffect} from "react";
import ReactDOM from 'react-dom';
import Plyr from "plyr";
import styles from '../styles/Video.module.css';
import utilStyles from '../styles/Utils.module.css';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";

type Props = {
    src:string,
    autoPlay?:boolean,
    onClose:() => void,
    title:string
}

const VideoComponent: FunctionComponent<Props> = (props) => {
    let element = document.createElement('div');

    useEffect(() => {
        console.log('efecto video');
        if(!document.getElementById('video-container')){
            element.id = 'video-container';
            document.querySelector('#__next').appendChild(element);
        }
        const player = new Plyr('#player',{controls:['play','play-large','progress','fullscreen','volume','current-time','mute']});
        player.once('canplay', () => {
            player.play();
        });
    },[]);

    const videoContent = () => {
        return <div className={styles.videoContainer}>
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
    };

    return ReactDOM.createPortal(videoContent(),document.getElementById('video-container'));
};

export default VideoComponent;

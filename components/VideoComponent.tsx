import React, {FunctionComponent, useEffect, useRef} from "react";
import ReactDOM from 'react-dom';
import Plyr from "plyr";
import styles from '../styles/Video.module.css';
import utilStyles from '../styles/Utils.module.css';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Hls from "hls.js/dist/hls";
import axios from 'axios';

type Props = {
    src:string,
    autoPlay?:boolean,
    onClose:() => void,
    title:string,
    hls?:boolean
}

const VideoComponent: FunctionComponent<Props> = (props) => {
    const sourceRef = useRef(null);
    if(!document.getElementById('video-container')){
        let element = document.createElement('div');
        element.id = 'video-container';
        document.querySelector('#__next').appendChild(element);
    }

    useEffect(() => {
        const player = new Plyr('#player',{controls:['play','play-large','progress','fullscreen','volume','current-time','mute']});
        player.once('canplay', () => {
            player.play();
        });

        axios.get('http://localhost:5000/api/course/get_signed_cookies',{withCredentials:true}).then(res => {
            console.log(res);
            document.cookie =  `"CloudFront-Signature=${ res.data.cookies["CloudFront-Key-Pair-Id"]};domain=https://d2nmzq3hxlvmns.cloudfront.net; path=/;`;
            document.cookie =  `"CloudFront-Policy= ${ res.data.cookies["CloudFront-Policy"]};domain=https://d2nmzq3hxlvmns.cloudfront.net; path=/;`;
            document.cookie =  `"CloudFront-Key-Pair-Id=${ res.data.cookies["CloudFront-Key-Pair-Id"]};domain=https://d2nmzq3hxlvmns.cloudfront.net; path=/;`;
            if(props.hls && Hls.isSupported()){
                const hls = new Hls({xhrSetup: function(xhr, url) {
                        console.log(xhr);
                        xhr.withCredentials = false;
                    }});
                hls.loadSource(props.src);
                hls.attachMedia(sourceRef.current)
            }else{
                sourceRef.current.src = props.src;
            }
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
                <video id="player" playsInline controls ref={sourceRef}>
                </video>
            </div>
        </div>
    };

    return ReactDOM.createPortal(videoContent(),document.getElementById('video-container'));
};

export default VideoComponent;

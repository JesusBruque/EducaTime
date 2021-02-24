import React, {FunctionComponent, useEffect, useRef} from "react";
import ReactDOM from 'react-dom';
import Plyr from "plyr";
import styles from '../styles/Video.module.css';
import utilStyles from '../styles/Utils.module.css';
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import Hls from "hls.js/dist/hls";
import gsap from "gsap";

type Props = {
    src:string,
    autoPlay?:boolean,
    onClose:() => void,
    title:string,
    hls?:boolean,
    poster?:string
}

const VideoComponent: FunctionComponent<Props> = (props) => {
    const sourceRef = useRef(null);
    if(!document.getElementById('video-container')){
        let element = document.createElement('div');
        element.id = 'video-container';
        document.querySelector('#__next').appendChild(element);
    }

    const startLoader = () => {
        if(!document.querySelector('#video-loader') && document.querySelector('.plyr')){
            let playBtn = document.querySelector('.plyr>button') as HTMLElement;
            playBtn.style.display = 'none';
            let loader = document.createElement('div');
            loader.id='video-loader';
            let loaderContainer = document.createElement('div');
            loaderContainer.id='video-loader--container';
            let loaderObject = document.createElement('div');
            loaderObject.id = 'casor-loader--object';
            for(let i = 0;i<2;i++){
                let loaderBall = document.createElement('div');
                loaderBall.classList.add('loader-circle');
                loaderObject.appendChild(loaderBall);
            }
            loader.appendChild(loaderContainer);
            loader.appendChild(loaderObject);
            document.querySelector('.plyr').appendChild(loader);
            let balls = document.querySelectorAll('#casor-loader--object .loader-circle');
            let timeline = gsap.timeline({repeat:-1,repeatDelay:-.5,yoyo:true,smoothChildTiming:true});
            timeline.fromTo(balls[0],{scale:.2,z:-50},{duration:2,scale:1.1,z:0,ease:'power3.inOut'},"init");
            timeline.fromTo(balls[1],{z:0,scale:1.1},{duration:2,scale:.2,z:-50,ease:'power3.inOut'},"init");
        }
    }

    useEffect(() => {
        const player = new Plyr('#player',{controls:['play','play-large','progress','fullscreen','volume','current-time','mute']});
        player.once('canplay', () => {
            player.play();
        });
        player.once('loadstart', () => {
            startLoader();
        });
        player.once('loadeddata', () => {
            console.log('YA SE HA CARGADO EL PRIMER FRAME');
            if(document.querySelector('#video-loader')){
                document.querySelector('#video-loader').remove();
                let playBtn = document.querySelector('.plyr>button') as HTMLElement;
                playBtn.style.display = 'block';
            }
        });
        if(props.hls && Hls.isSupported()){
            const hls = new Hls();
            hls.loadSource(props.src);
            hls.attachMedia(sourceRef.current)
        }else{
            sourceRef.current.src = props.src;
        }
    },[]);

    const videoContent = () => {
        return <div className={styles.videoContainer}>
            <div className={utilStyles.background}></div>
            <div className={styles.videoMarco}>
                <div className={styles.videoHeader}>
                    <FontAwesomeIcon icon={faTimes} onClick={props.onClose} className={utilStyles.icon}/>
                    <span>{props.title}</span>
                </div>
                <video id="player" playsInline controls ref={sourceRef} poster={props.poster}>
                </video>
            </div>
        </div>
    };

    return ReactDOM.createPortal(videoContent(),document.getElementById('video-container'));
};

export default VideoComponent;

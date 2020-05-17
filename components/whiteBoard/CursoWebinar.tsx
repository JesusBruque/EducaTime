import React, {FunctionComponent, useState} from "react";
import VideoComponent from "../VideoComponent";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import styles from '../../styles/whiteBoard/whiteBoard.module.css';
type Props = {
    curso:any
}
const Webinar :FunctionComponent<Props>= (props) => {
    const {curso} = props;
    const [videoPlaying,setVideoPlaying] = useState(false);
    return (
        <div>
            <h2>{curso.title}</h2>
            <div>
                <div  className={`${styles.resourceContainer} ${styles.webinar}`}>
                    <img src={curso.thumbnail} alt={'curso thumbnail'} />
                    <FontAwesomeIcon icon={faPlayCircle} color={'var(--main-color)'}  onClick={() => {setVideoPlaying(true)}}/>
                </div>
            </div>
            {videoPlaying && <VideoComponent src={curso.webinar} onClose={() => {setVideoPlaying(false)}} title={curso.title}  hls={true}/>}
        </div>
    )
};

export default Webinar;

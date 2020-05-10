import React, {FunctionComponent, useState} from "react";
import CursoItem from "./CursoItem";
import cursosStyle from '../../styles/cursos/CourseItem.module.css';
import Course from "../../utils/Course";
import {Router} from "next/router";
import VideoComponent from "../VideoComponent";

type Props = {
    cursos:Course[],
    router:Router,
    admin:boolean
}
const CursoGrid: FunctionComponent<Props> = (props) => {
    const {cursos,router,admin} = props;
    const [cursoPlaying,setCursoPlaying] = useState(null);
    return (
        <React.Fragment>
            {cursos.map(curso =>{
                return <CursoItem key={curso._id} curso={curso} router={router} setCursoPlaying={setCursoPlaying} admin={admin}/>
            })}
            {cursoPlaying && <VideoComponent src={cursoPlaying.video} onClose={() => setCursoPlaying(null)} title={cursoPlaying.title} hls={true}/>}
        </React.Fragment>
    )
};

export default CursoGrid;

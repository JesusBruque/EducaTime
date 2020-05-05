import React,{useState} from "react";
import CursoItem from "./CursoItem";
import cursosStyle from '../../styles/cursos/CourseItem.module.css';
import Course from "../../utils/Course";
import {Router} from "next/router";
import VideoComponent from "../VideoComponent";

const CursoGrid = (props:{cursos:Course[], router:Router}) => {
    const {cursos} = props;
    const [cursoPlaying,setCursoPlaying] = useState(null);
    return (
        <React.Fragment>
            {cursos.map(curso =>{
                return <CursoItem key={curso._id} curso={curso} router={props.router} setCursoPlaying={setCursoPlaying}/>
            })}
            {cursoPlaying && <VideoComponent src={cursoPlaying.video} onClose={() => setCursoPlaying(null)} title={cursoPlaying.title}/>}
        </React.Fragment>
    )
};

export default CursoGrid;

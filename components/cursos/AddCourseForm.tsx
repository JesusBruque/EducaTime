import styles from "../../styles/cursos/AddCurso.module.css";
import React, {Dispatch} from "react";
import Course from "../../utils/Course";
import MainInfoCourse from "./MainInfoContainer";
import TrailerPriceCourse from "./TrailerPriceContainer";
import EstructureAddCourse from "./EstructuraContainer";
import WebUtils from "../../webUtils/WebUtils";

type Props = {
    cursoInfo:Course,
    setCursoInfo:Dispatch<Course>,
    cursoFiles:{thumbnail:File,video:File},
    setCursoFiles:Dispatch<any>
    webinarFile:File,
    setWebinarFile:Dispatch<File>,
    setVideoPlaying:Dispatch<any>,
    utils:WebUtils
}
const AddCourseForm = (props:Props) => {

    const handleInfoCursoChange = (content,property) => {
        props.setCursoInfo({...props.cursoInfo,[property]:content});
    };


    return (
        <div className={styles.addContainer}>
            <div>
                <TrailerPriceCourse cursoInfo={props.cursoInfo} setCursoInfo={props.setCursoInfo} cursoFiles={props.cursoFiles} setCursoFiles={props.setCursoFiles} handleInfoCursoChange={handleInfoCursoChange} setVideoPlaying={props.setVideoPlaying}/>
                <EstructureAddCourse cursoInfo={props.cursoInfo} setCursoInfo={props.setCursoInfo} setVideoPlaying={props.setVideoPlaying} webinarFile={props.webinarFile} setWebinarFile={props.setWebinarFile} handleInfoCursoChange={handleInfoCursoChange}/>
            </div>
            <MainInfoCourse utils={props.utils} cursoInfo={props.cursoInfo} setCursoInfo={props.setCursoInfo} handleInfoCursoChange={handleInfoCursoChange}/>
        </div>
    )
};
export default AddCourseForm;

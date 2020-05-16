import Course from "../../utils/Course";
import React, { Dispatch, FunctionComponent, useState, useEffect } from "react";
import CursoOpen from "./CursoOpen";
import WebUtils from "../../webUtils/WebUtils";
import VideoComponent from "../VideoComponent";
import Webinar from "./CursoWebinar";


type Props = {
    cursos: Course[] | any,
    teacher: boolean,
    user,
    cargarContenido: boolean,
    setCargarContenido: Dispatch<boolean>,
    utils: WebUtils,
    cursoIndex: number,
    cursoTeacherIndex: number
}
const CursosContent: FunctionComponent<Props> = (props) => {
    const [curso, setCurso] = useState(null);
    useEffect(() => {
        if (props.cursoIndex !== null) {
            setCurso(props.cursos[props.cursoIndex].idCurso)
        }
        if (props.cursoTeacherIndex !== null) {
            setCurso(props.cursos[props.cursoTeacherIndex]);
        }
    }, [props.cursoIndex, props.cursoTeacherIndex, props.cursos]);
    return (
        <div>
            {
                props.cursos.length < 1 && <div><h3><b>No tienes cursos para ver!</b></h3></div>
            }
            {
                props.cursos.length > 0 && curso && (curso.lections.length > 0 && !curso.webinar ? <CursoOpen cursoIndex={props.cursoIndex} user={props.user} curso={curso} setCurso={setCurso} teacher={props.teacher} cargarContenido={props.cargarContenido} setCargarContenido={props.setCargarContenido} utils={props.utils} />
                    : <Webinar curso={curso} />)
            }
        </div>
    )
};

export default CursosContent;

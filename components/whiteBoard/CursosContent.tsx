import Course from "../../utils/Course";
import {FunctionComponent} from "react";
import CursoOpen from "./CursoOpen";


type Props = {
    cursos:Course[] | any,
    teacher:boolean
}
const CursosContent: FunctionComponent<Props> = (props) => {
    return (
        <div>
            {
                props.cursos.length < 1 && <div><h3><b>No tienes cursos para ver!</b></h3></div>
            }
            {
                props.cursos.length > 0 && props.cursos.length > 1 && <div>{props.cursos.map(curso => {return <div>{props.teacher ? curso.title : curso.idCurso.title}</div>})}</div>
            }
            {
                props.cursos.length > 0 && props.cursos.length === 1 && <CursoOpen curso={props.teacher ? props.cursos[0] : props.cursos[0].idCurso} teacher={props.teacher}/>
            }
        </div>
    )
};

export default CursosContent;

import React, {FunctionComponent, useEffect} from 'react';
import {User} from "../../utils/Authentication";
import Course from "../../utils/Course";

type Props={
    onClickOption:() => void,
    user:User,
    teacherCourses?:Course[],
    taskPend?:{}[],
}

const LateralMenu: FunctionComponent<Props> = (props) => {

    useEffect(()=> {
        console.log(props.user);
    },[]);
    return (
        <div>
            {
                props.user.roles.includes('user') &&
                    <React.Fragment>
                        <div>
                            <span>Mis cursos</span>
                            <div>
                                {/*{props.user.cursos.map(curso => {return <span>{curso.title}</span>})}*/}
                            </div>
                        </div>
                        <div>
                            <span>Mis tareas</span>
                        </div>
                        <div>
                            <span>Pagos pendientes</span>
                        </div>
                    </React.Fragment>
            }
            {
                props.user.roles.includes('teacher') &&
                    <React.Fragment>
                        <div>
                            <span>Mis cursos (Profesor)</span>
                            <div></div>
                        </div>
                        <div>
                            <span>Tareas por corregir</span>
                        </div>
                    </React.Fragment>
            }
        </div>
    )
}

export default LateralMenu;

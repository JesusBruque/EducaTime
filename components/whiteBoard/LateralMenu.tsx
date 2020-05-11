import React, {FunctionComponent, useEffect} from 'react';
import {User} from "../../utils/Authentication";
import Course from "../../utils/Course";
import styles from '../../styles/whiteBoard/LateralMenu.module.css';

type Props={
    onClickOption:(e) => void,
    user:any,
    teacherCourses?:Course[],
    taskPend?:boolean,
    paymentPend?:boolean,
    optionSelected:string
}

const  LateralMenu: FunctionComponent<Props> = (props) => {

    useEffect(()=> {
        console.log(props.user);
    },[]);
    return (
        <div className={styles.lateralMenu}>
            <div>
                {
                    props.user.roles.includes('user') &&
                    <React.Fragment>
                        <div style={{marginBottom:'15px'}}>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'cursos' ? styles.optionSelected : ''}`} onClick={props.onClickOption} data-option={'cursos'}>Mis cursos</span>
                            <div className={`${styles.childs}`}>
                                {props.user.cursos.map((userCourse,i) => {
                                    return <div key={i}>
                                        <span className={`${styles.title}`}  onClick={props.onClickOption} data-option={'cursos'} data-option-index={i}>{userCourse.idCurso.title}</span>
                                        <div className={`${styles.childs} ${styles.bloques}`}>
                                            {userCourse.idCurso.lections.map((lection,i) => {
                                                return <div key={i}><span className={`${styles.subTitle}`}>{lection.title}</span></div>
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'tareas' ? styles.optionSelected : ''} ${!props.taskPend ? styles.optionDisabled : ''}`} onClick={props.onClickOption} data-option={'tareas'}>Mis tareas</span>
                        </div>
                        <div>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'pagos' ? styles.optionSelected : ''} ${!props.paymentPend ? styles.optionDisabled : ''}`} onClick={props.onClickOption} data-option={'pagos'}>Pagos pendientes</span>
                        </div>
                    </React.Fragment>
                }
                {
                    props.user.roles.includes('teacher') &&
                    <React.Fragment>
                        <div>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'cursos-teacher' ? styles.optionSelected : ''} ${(!props.teacherCourses || props.teacherCourses.length < 1) ? styles.optionDisabled : ''}`} onClick={props.onClickOption} data-option={'cursos-teacher'}>Mis cursos (Profesor)</span>
                            <div></div>
                        </div>
                        <div>
                            <span className={styles.mainTitle} onClick={props.onClickOption} data-option={'tareas-teacher'}>Tareas por corregir</span>
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default LateralMenu;

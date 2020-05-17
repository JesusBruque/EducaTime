import React, { FunctionComponent, useEffect } from 'react';
import { User } from "../../utils/Authentication";
import Course from "../../utils/Course";
import styles from '../../styles/whiteBoard/LateralMenu.module.css';
import moment from 'moment';

type Props = {
    onClickOption: (e) => void,
    user: any,
    teacherCourses?: Course[],
    taskPend?: number,
    paymentPend?: number,
    optionSelected: string,
    cursoIndex?: number,
    cursoTeacherIndex?: number,
    tasksToReview?: number
}

const LateralMenu: FunctionComponent<Props> = (props) => {
    const canShowLection = (userCourse, lection) => {
        const user = props.user;
        const feeState = userCourse.feeState;
        let indexLastFee = -1;
        feeState.filter((x, index) => {
            if (x.paid && index > indexLastFee)
                indexLastFee = index
            return false;
        });
        if (indexLastFee === feeState.length - 1) return true;
        const fee = feeState[indexLastFee + 1];
        console.log(feeState);
        console.log(indexLastFee);
        const feeInfo = userCourse.idCurso.fees.find(x => x._id + '' === fee.idFee + '');
        if (moment(feeInfo.date).isBefore(lection.dateAvailable))
            return false;
        return true;
    }
    return (
        <div className={styles.lateralMenu}>
            <div>
                {
                    props.user.roles.includes('user') &&
                    <React.Fragment>
                        <div style={{ marginBottom: '15px' }}>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'cursos' ? styles.optionSelected : ''}`} onClick={props.onClickOption} data-option={'cursos'}>Mis cursos</span>
                            <div className={`${styles.childs}`}>
                                {props.user.cursos.map((userCourse, i) => {
                                    return <div key={i} className={`${styles.childrenContainer} ${props.cursoIndex === i ? styles.open : ''}`}>
                                        <span className={`${styles.title} ${props.cursoIndex === i ? styles.optionSelected : ''} `} onClick={props.onClickOption} data-option={'cursos'} data-option-index={i}>{userCourse && userCourse.idCurso && userCourse.idCurso.title}</span>
                                        <div className={`${styles.childs} ${styles.bloques} ${props.cursoIndex === i ? styles.open : ''}`}>
                                            {userCourse && userCourse.idCurso && userCourse.idCurso.lections.map((lection, i) => {
                                                if (canShowLection(userCourse, lection))
                                                    return <div key={i}><span className={`${styles.subTitle}`}>{lection.title}</span></div>
                                            })}
                                        </div>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'tareas' ? styles.optionSelected : ''} ${props.user && props.user.homeworkPend && props.user.homeworkPend === 0 ? styles.optionDisabled : ''}`} onClick={props.user && props.user.homeworkPend && props.user.homeworkPend === 0 ? () => { } : props.onClickOption} data-option={'tareas'}>Mis tareas</span>
                            {props.user && props.user.homeworkPend > -1 && <span className={`${styles.numberIndicator} ${props.user.homeworkPend > 0 ? styles.red : styles.black}`}>{props.user.homeworkPend}</span>}
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center' }}>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'pagos' ? styles.optionSelected : ''} ${!(props.user && props.user.paymentPend && props.user.paymentPend > 0) ? styles.optionDisabled : ''}`} onClick={!(props.user && props.user.paymentPend && props.user.paymentPend > 0) ? () => { } : props.onClickOption} data-option={'pagos'}>Pagos pendientes</span>
                            {props.user && props.user.paymentPend > -1 && <span className={`${styles.numberIndicator} ${props.user.paymentPend > 0 ? styles.red : styles.black}`}>{props.user.paymentPend}</span>}
                        </div>
                    </React.Fragment>
                }
                {
                    props.user.roles.includes('teacher') && props.teacherCourses &&
                    <React.Fragment>
                        <div>
                            <span className={`${styles.mainTitle} ${props.optionSelected === 'cursos-teacher' ? styles.optionSelected : ''} ${(!props.teacherCourses || props.teacherCourses.length < 1) ? styles.optionDisabled : ''}`} onClick={(!props.teacherCourses || props.teacherCourses.length < 1) ? () => { } : props.onClickOption} data-option={'cursos-teacher'}>Mis cursos (Profesor)</span>
                            <div className={`${styles.childs}`}>
                                {props.teacherCourses.map((teacherCourse, i) => {
                                    return <div key={i} className={`${styles.childrenContainer} ${props.cursoTeacherIndex === i ? styles.open : ''}`}>
                                        <span className={`${styles.title} ${props.cursoTeacherIndex === i ? styles.optionSelected : ''} `} onClick={props.onClickOption} data-option={'cursos-teacher'} data-option-index={i}>{teacherCourse.title}</span>
                                    </div>
                                })}
                            </div>
                        </div>
                        <div>
                            <span className={`${!props.tasksToReview ? styles.optionDisabled : ''} ${styles.mainTitle}`} onClick={!props.tasksToReview ? () => { } : props.onClickOption} data-option={'tareas-teacher'}>Tareas por corregir</span>
                            {props.tasksToReview > 0 && <span className={styles.numberIndicator}>{props.tasksToReview}</span>}
                        </div>
                    </React.Fragment>
                }
            </div>
        </div>
    )
}

export default LateralMenu;

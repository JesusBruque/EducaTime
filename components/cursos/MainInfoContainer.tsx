import styles from "../../styles/cursos/AddCurso.module.css";
import utilsStyles from "../../styles/Utils.module.css";
import Button from "../Button";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEdit} from "@fortawesome/free-solid-svg-icons";
import TextEditor from "../TextEditor";
import React, {Dispatch, useState} from "react";
import Course from "../../utils/Course";
import WebUtils from "../../webUtils/WebUtils";

type Props = {
    cursoInfo:Course,
    setCursoInfo:Dispatch<Course>,
    handleInfoCursoChange:(content,property:string) => void,
    utils:WebUtils
}
const MainInfoCourse = (props:Props) => {

    const [inputEditing,setInputEditing] = useState(null);

    const handleChangeEditing  = (inputName : string) => {
        setInputEditing(inputName);
    };

    return (
        <div className={styles.cursoInfoDescription}>
            <div>
                <input style={{fontSize:'1.1em',fontWeight:'bold',width:'350px',textTransform:'uppercase'}} type={'text'} value={props.cursoInfo.title} className={styles.inputEditing} onChange={(e) => props.handleInfoCursoChange(e.target.value,'title')} placeholder={'Título del curso'}/>
            </div>
            <div>
                <div>
                    <div className={`${styles.line}`}>
                        <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>Descripción</h4>
                        {
                            inputEditing === 'description' ?
                                <Button action={() => setInputEditing(null)} text={'Guardar'} color={'blue'} />
                                :
                                <FontAwesomeIcon icon={faEdit}  onClick={() =>handleChangeEditing('description')} className={utilsStyles.icon}/>
                        }
                    </div>
                    <div>
                        {
                            inputEditing === 'description' ?
                                <TextEditor utils={props.utils} onChange={(content) =>props.handleInfoCursoChange(content,'description')} files={false} height={300} initialValue={props.cursoInfo.description} basic={true}/>
                                :
                                <div dangerouslySetInnerHTML={{__html: props.cursoInfo.description}} className={styles.cursoInfoDescriptionValue}></div>
                        }
                    </div>
                </div>
                <div>
                    <div className={`${styles.line}`}>
                        <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>A quién va dirigido</h4>
                        {
                            inputEditing === 'target' ?
                                <Button action={() => setInputEditing(null)} text={'Guardar'} color={'blue'} />
                                :
                                <FontAwesomeIcon icon={faEdit}  onClick={() =>handleChangeEditing('target')} className={utilsStyles.icon}/>
                        }
                    </div>
                    <div>
                        {
                            inputEditing === 'target' ?
                                <TextEditor utils={props.utils} onChange={(content) =>props.handleInfoCursoChange(content,'target')} files={false} height={300} initialValue={props.cursoInfo.target} basic={true}/>
                                :
                                <div dangerouslySetInnerHTML={{__html: props.cursoInfo.target}} className={styles.cursoInfoDescriptionValue}></div>
                        }
                    </div>
                </div>
                <div>
                    <div className={`${styles.line}`}>
                        <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>Lo que aprenderás</h4>
                        {
                            inputEditing === 'goals' ?
                                <Button action={() => setInputEditing(null)} text={'Guardar'} color={'blue'} />
                                :
                                <FontAwesomeIcon icon={faEdit}  onClick={() =>handleChangeEditing('goals')} className={utilsStyles.icon}/>
                        }
                    </div>
                    {
                        inputEditing === 'goals' ?
                            <TextEditor utils={props.utils} onChange={(content) => props.handleInfoCursoChange(content,'goals')} files={false}  height={300} initialValue={props.cursoInfo.goals} basic={true}/>
                            :
                            <div dangerouslySetInnerHTML={{__html: props.cursoInfo.goals}} className={styles.cursoInfoDescriptionValue}></div>
                    }
                </div>
                <div>
                    <div className={`${styles.line}`}>
                        <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>Requisitos</h4>
                        {
                            inputEditing === 'requirements' ?
                                <Button action={() => setInputEditing(null)} text={'Guardar'} color={'blue'} />
                                :
                                <FontAwesomeIcon icon={faEdit}  onClick={() =>handleChangeEditing('requirements')} className={utilsStyles.icon}/>
                        }
                    </div>
                    {
                        inputEditing === 'requirements' ?
                            <TextEditor utils={props.utils} onChange={(content) => props.handleInfoCursoChange(content,'requirements')} files={false} height={300} initialValue={props.cursoInfo.requirements} basic={true}/>
                            :
                            <div dangerouslySetInnerHTML={{__html: props.cursoInfo.requirements}} className={styles.cursoInfoDescriptionValue}></div>
                    }
                </div>
            </div>
        </div>
    )
};
export default MainInfoCourse;

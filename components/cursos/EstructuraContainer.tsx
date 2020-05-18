import styles from "../../styles/cursos/AddCurso.module.css";
import utilsStyles from "../../styles/Utils.module.css";
import React, {Dispatch, useState} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faTimes} from "@fortawesome/free-solid-svg-icons";
import Course from "../../utils/Course";

type Props = {
    cursoInfo:Course,
    setCursoInfo:Dispatch<Course>,
    setVideoPlaying:Dispatch<any>,
    webinarFile:File,
    setWebinarFile:Dispatch<File>,
    handleInfoCursoChange:(content,property:string) => void,
}
const EstructureAddCourse = (props:Props) => {
    const [showStructureDropDown,setShowStructureDropDown] = useState(false);

    const addBloque = () => {
        setShowStructureDropDown(false);
        props.setCursoInfo({...props.cursoInfo,lections:[...props.cursoInfo.lections,{title:'Nuevo bloque',order:props.cursoInfo.lections.length}]});
    };

    const handleChangeLection = (value,i) => {
        let newLections = [...props.cursoInfo.lections];
        newLections[i].title = value;
        newLections[i].order = i;
        props.setCursoInfo({...props.cursoInfo,lections: newLections});
    };
    const removeLection = (i) => {
        let newLections = [...props.cursoInfo.lections];
        newLections.splice(i,1);
        console.log(newLections);
        props.setCursoInfo({...props.cursoInfo,lections: newLections});
    };
    const handleChangeWebinar = (e) => {
        props.setCursoInfo({...props.cursoInfo,webinar:e.target.files[0].name});
        props.setWebinarFile(e.target.files[0]);
        setShowStructureDropDown(false);
    };


    return (
        <div className={styles.cursoInfoContent}>
            <div className={`${styles.line}`}>
                <h4 className={`${utilsStyles.sectionTitle} ${styles.subTitle}`}>Estructura del curso</h4>
                <div style={{position:'relative',display:'flex',alignItems:'center'}}>
                    {!props.webinarFile && <img src={'/assets/icons/add.svg'}  className={utilsStyles.icon} alt={'icono de añadir'} onClick={() => props.cursoInfo.lections.length>0 ? addBloque() : setShowStructureDropDown(true)}/>}
                    {showStructureDropDown && !props.cursoInfo.webinar &&
                    <React.Fragment>
                        <div className={utilsStyles.background} onClick={() => setShowStructureDropDown(false)}></div>
                        <div className={utilsStyles.dropDownAdd}>
                            <span onClick={addBloque}>Bloque</span>
                            {props.cursoInfo.lections.length <= 0 && <span><label htmlFor={'input-webinar'}>Video</label><input id={'input-webinar'} type={'file'} style={{display:'none'}} onChange={handleChangeWebinar}/></span>}
                        </div>
                    </React.Fragment>
                    }
                </div>
            </div>
            <div className={styles.bloquesInfo}>
                {
                    props.cursoInfo.lections && props.cursoInfo.lections.length > 0 && <input style={{fontSize:'1.1em',width:'100%',fontWeight:'bold'}} type={'text'} value={props.cursoInfo.teacher} className={utilsStyles.inputEditing} onChange={(e) => props.handleInfoCursoChange(e.target.value,'teacher')} placeholder={'Email del profesor'}/>
                }

                {
                    props.cursoInfo.lections && props.cursoInfo.lections.map((lection,i) => {
                        return <div style={{width:'100%'}} key={i}>
                            <input style={{fontSize:'1.1em',width:'150px',fontWeight:'bold'}} type={'text'} value={lection.title} className={utilsStyles.inputEditing} onChange={(e) => handleChangeLection(e.target.value,i)} placeholder={'Título del bloque'}/>
                            <FontAwesomeIcon icon={faTimes} onClick={() => removeLection(i)} className={utilsStyles.icon}/>
                        </div>
                    })
                }

                {
                    props.cursoInfo.lections && props.cursoInfo.lections.length===0 && (props.webinarFile || props.cursoInfo.webinar)&& <div className={styles.line}><span>{props.webinarFile ? props.webinarFile.name : 'Webinar del curso'}</span><FontAwesomeIcon icon={faTimes} style={{marginLeft:'4px'}} onClick={() => {props.setWebinarFile(null);props.setCursoInfo({...props.cursoInfo,webinar:''})}} className={utilsStyles.icon}/> <img src={'/assets/icons/play-button.svg'} className={utilsStyles.icon} alt={'icono de play'} onClick={() => props.setVideoPlaying(props.webinarFile ? props.webinarFile : props.cursoInfo.webinar)}/></div>
                }

            </div>
        </div>
    )
};

export default EstructureAddCourse;

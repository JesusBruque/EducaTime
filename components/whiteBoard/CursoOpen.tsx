import React, {Dispatch, FunctionComponent, useEffect, useState} from "react";
import Course from "../../utils/Course";
import utilsStyles from "../../styles/Utils.module.css";
import DatePicker from "../DatePicker";
import moment from "moment";
import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import MyDropzone from "../MyDropzone";
import {faClock,faFileDownload,faTimes,faFile, faPlayCircle} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {deleteVideoResource,deleteEvaluation,deleteTeoricalResources,deleteHomework,uploadHomeworkLectionFile,uploadTeoreticalResourceLectionFile,uploadLectionVideo,updateLectionDates,updateTaskDate, uploadEvaluationLectionFile} from '../../utils/Lection';
import VideoComponent from "../VideoComponent";
import WebUtils from "../../webUtils/WebUtils";
type Props = {
    curso:any,
    setCurso:Dispatch<any>,
    teacher:boolean,
    cargarContenido:boolean,
    setCargarContenido:Dispatch<boolean>,
    utils:WebUtils
};
const CursoOpen: FunctionComponent<Props> = (props) => {
    const {curso,setCurso} = props;
    const [videoPlaying,setVideoPlaying] = useState(null);

    const handleDeleteTarea = (i,lectionId,tarea) =>{
        props.utils.initLoader();
        props.utils.startLoader();
        deleteHomework(curso._id,lectionId,tarea).then((res)=>{
            console.log(res);
            if(res.status==200){
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({...curso,lections:lections});
                props.setCargarContenido(!props.cargarContenido);
            }
        }).catch((error)=>{
            console.error(error);
        })
    };
    const handleDeleteTeoricalResource = (i,lectionId,tareaId) => {
        props.utils.initLoader();
        props.utils.startLoader();
        deleteTeoricalResources(curso._id,lectionId,tareaId).then((res)=>{
            console.log(res);
            if(res.status==200){
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({...curso,lections:lections});
                props.setCargarContenido(!props.cargarContenido);
            }
        }).catch((error)=>{
            console.error(error);
        })
    };
    const handleDeleteVideoResource = (i,lectionId,resourceId) => {
        props.utils.initLoader();
        props.utils.startLoader();
        deleteVideoResource(curso._id,lectionId,resourceId).then((res)=>{
            console.log(res);
            if(res.status==200){
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({...curso,lections:lections});
                props.setCargarContenido(!props.cargarContenido);
            }
        }).catch((error)=>{
            console.error(error);
        })
    };
    const handleDeleteEvaluation = (i,lectionId,evalId) => {
        props.utils.initLoader();
        props.utils.startLoader();
        deleteEvaluation(curso._id,lectionId,evalId).then((res)=>{
            console.log(res);
            if(res.status==200){
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({...curso,lections:lections});
                props.setCargarContenido(!props.cargarContenido);
            }
        }).catch((error)=>{
            console.error(error);
        })
    }
    const initiateContentSelected = () => {
        let selections = [];
        curso.lections.map((lection,i) => {
            selections.push({lection:i,optionSelected:'RT'});
        });
        return selections;
    };
    const [contentSelected,setContentSelected] = useState(initiateContentSelected());
    useEffect(() => {
        console.log(curso);
    },[]);
    const [dateEditing,setDateEditing] = useState(null);
    const [taskDateEditing,setTaskDateEditing] = useState(null);

    const formatDates = (date) => {
        return moment(date,'DD/MM/YYYY').unix()*1000;
    };
    const changeContent = (opt,i) => {
        let newContent = [...contentSelected];
        newContent[i].optionSelected = opt;
        setContentSelected(newContent);
    };
    const handleChangeDatesLection = (i,lectionId, fInicio, fFin) => {
        props.utils.initLoader();
        props.utils.startLoader();
        updateLectionDates(formatDates(fInicio),formatDates(fFin),lectionId,curso._id).then(res => {
            if(res.status === 200){
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({...curso,lections:lections});
                props.setCargarContenido(!props.cargarContenido);
                props.utils.removeLoader();
            }else{
                window.alert('ERORRR');
            }
        }).catch(err => console.error(err));
        setDateEditing(null);
    };
    const handleFilesTeorical =  (files,lectionName,i) => {
        files.forEach((file) => {
            props.utils.initLoader();
            props.utils.startLoader();
            uploadTeoreticalResourceLectionFile(lectionName,file,curso._id).then((res) => {
                props.utils.removeLoader();
                if(res.status===200){
                    let lections = [...curso.lections];
                    lections[i] = res.data.lection;
                    setCurso({...curso,lections:lections});
                    props.setCargarContenido(!props.cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                props.utils.removeLoader();
            });
        });
    };
    const handleTaskFiles = (files,lectionName,i) => {
        files.forEach((file) => {
            props.utils.initLoader();
            props.utils.startLoader();
            uploadHomeworkLectionFile(lectionName,'tareas',file,curso._id).then((res)=>{
                props.utils.removeLoader();
                let lections = [...curso.lections];
                if(res.status===200){
                    lections[i] = res.data.lection;
                    setCurso({...curso,lections:lections});
                    props.setCargarContenido(!props.cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                props.utils.removeLoader();
            });
        })
    };
    const handleEvaluations = (files, lectionName,i) => {
        files.forEach((file) => {
            props.utils.initLoader();
            props.utils.startLoader();
            uploadEvaluationLectionFile(lectionName,'evaluacion',file,curso._id).then((res)=>{
                props.utils.removeLoader();
                let lections = [...curso.lections];
                if(res.status===200){
                    lections[i] = res.data.lection;
                    setCurso({...curso,lections:lections});
                    props.setCargarContenido(!props.cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                props.utils.removeLoader();
            });
        })
    };
    const handleVideosLections = (files,lectionName,i) => {
        files.forEach((file) => {
            props.utils.initLoader();
            props.utils.startLoader();
            uploadLectionVideo(lectionName,file,curso._id).then((res)=>{
                props.utils.removeLoader();
                let lections = [...curso.lections];
                if(res.status===200){
                    lections[i] = res.data.lection;
                    setCurso({...curso,lections:lections});
                    props.setCargarContenido(!props.cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                props.utils.removeLoader();
            });
        })
    };

    const handleChangeTaskDateEnd = (i,taskId,fechaFinTarea) => {
        props.utils.initLoader();
        props.utils.startLoader();
        updateTaskDate(taskId,formatDates(fechaFinTarea),curso._id).then(res => {
            props.utils.removeLoader();
            if(res.status === 200){
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({...curso,lections:lections});
                props.setCargarContenido(!props.cargarContenido);
            }else{
                window.alert('ERRORR');
            }
        }).catch(err => {
            props.utils.removeLoader();
            console.error(err)
        });
        setTaskDateEditing(null);
    };
    return (
        <div>
            <h2>{curso.title}</h2>
            {curso.lections.map((lection,i) => {
                return(
                    <div className={styles.lectionItem} key={i}>
                        <div className={styles.lectionHeader}>
                            <h3  style={{marginRight:'15px'}}>{lection.title}</h3>
                            {
                                props.teacher ?
                                    <div style={{display:'flex'}}>
                                        <div  style={{marginRight:'8px'}}>
                                            <span style={{color:'var(--main-color)',marginRight:'4px'}}>Fecha Inicio:</span>
                                            <b onClick={props.teacher ? () => setDateEditing(i) : () => {}} className={`${props.teacher ? styles.editable : ''}`}>{moment(lection.dateAvailable).format('DD/MM/YYYY')}</b>
                                        </div>
                                        <div>
                                            <span  style={{color:'var(--main-color)',marginRight:'4px'}}>Fecha Inicio:</span>
                                            <b onClick={props.teacher ? () => setDateEditing(i) : () => {}} className={`${props.teacher ? styles.editable : ''}`}>{moment(lection.dateEnd).format('DD/MM/YYYY')}</b>
                                        </div>
                                        {
                                            props.teacher && dateEditing === i && <div style={{position:'relative'}}>
                                                <div className={utilsStyles.background} onClick={()=>setDateEditing(null)}></div>
                                                <div className={utilsStyles.calendarPickerInput}>
                                                    <DatePicker rangeDate={true} selectDateEvent={(fechaInicio,fechaFin) => handleChangeDatesLection(i,lection._id,fechaInicio,fechaFin)} minDate={i === 0 ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div className={utilsStyles.timeLeft} style={moment(lection.dateEnd).diff( moment(),'days')< 5 ? {backgroundColor:'var(--red-color)'} : {backgroundColor:'var(--black-color)'}}>
                                        <FontAwesomeIcon icon={faClock} color={'white'} style={{marginRight:'4px'}}/>
                                        <span>(Quedan {moment(lection.dateEnd).diff( moment(),'days')} días)</span>
                                    </div>
                            }

                        </div>
                        <div className={styles.lectionContainer}>
                            <div className={styles.optionsSelector}>
                                <span className={`${contentSelected[i].optionSelected === 'RT' ? styles.optionSelected : ''}`} onClick={() => {changeContent('RT',i)}}>Recursos teóricos</span>
                                <span className={`${contentSelected[i].optionSelected === 'TA' ? styles.optionSelected : ''}`} onClick={() => {changeContent('TA',i)}}>Tareas</span>
                                <span className={`${contentSelected[i].optionSelected === 'EV' ? styles.optionSelected : ''}`} onClick={() => {changeContent('EV',i)}}>Evaluación</span>
                                <span className={`${contentSelected[i].optionSelected === 'RA' ? styles.optionSelected : ''}`} onClick={() => {changeContent('RA',i)}}>Recursos audiovisuales</span>
                            </div>
                            <div className={styles.lectionContent}>
                                {contentSelected[i].optionSelected === 'RT' &&
                                <div className={`${styles.resources} ${styles.teoricalResources}`}>
                                    {
                                        lection.teoricalResources && lection.teoricalResources.length > 0  ? lection.teoricalResources.map((resourceUrl,j)  => {
                                                return <div className={styles.resourceContainer} key={j}>
                                                    <a href={resourceUrl.url} target={'_blank'}>
                                                        <img src={curso.thumbnail} alt={'thumbnail del curso'}/>
                                                        <FontAwesomeIcon icon={faFile} color={'var(--main-color)'}/>
                                                    </a>
                                                    {props.teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteTeoricalResource(i,lection._id,resourceUrl._id)} className={styles.close}/>}
                                                </div>
                                            })
                                            :
                                            !props.teacher && <b>No hay ningún recurso teórico para este bloque aún!</b>
                                    }
                                    {
                                        props.teacher && <div className={styles.fileContainer}>
                                            <MyDropzone
                                                text={'Arrastra o pincha para añadir los ficheros.'}
                                                image={'/assets/icons/file.svg'}
                                                onAcceptFile={(files) => handleFilesTeorical(files,lection._id,i)}
                                                // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                                            />
                                        </div>
                                    }
                                </div>}
                                {contentSelected[i].optionSelected === 'TA' && <div className={styles.taskResources}>
                                    {
                                        lection.homework && lection.homework.length > 0  ? lection.homework.map((tarea,j)  => {
                                            return <div style={{display:'flex', alignItems:'center',marginBottom:'15px'}} key={tarea._id}>
                                                <div className={styles.taskItem}>
                                                    <a href={tarea.uploadFile} target={'_blank'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'}/>
                                                        <span>TAREA - {('0'+j).slice(-2)}</span>
                                                    </a>
                                                    {props.teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteTarea(i,lection._id,tarea._id)} className={styles.close}/>}
                                                </div>
                                                {
                                                    !props.teacher && <div className={utilsStyles.timeLeft} style={moment(tarea.deadline).diff( moment(),'days')< 5 ? {backgroundColor:'var(--red-color)'} : {backgroundColor:'var(--black-color)'}}>
                                                        <FontAwesomeIcon icon={faClock} color={'white'} style={{marginRight:'4px'}}/>
                                                        <span>(Quedan {moment(tarea.deadline).diff( moment(),'days')} días)</span>
                                                    </div>
                                                }
                                                {
                                                    props.teacher &&
                                                    <div style={{position:'relative',marginLeft:'8px'}}>
                                                        <span style={{color:'var(--main-color)',marginRight:'4px'}}>Fecha Limite:</span>
                                                        <b onClick={props.teacher ? () => setTaskDateEditing(j) : () => {}} className={`${props.teacher ? styles.editable : ''}`}>{moment(tarea.deadline).format('DD/MM/YYYY')}</b>
                                                        {taskDateEditing === j && <div>
                                                            <div className={utilsStyles.background} onClick={()=>setTaskDateEditing(null)}></div>
                                                            <div className={utilsStyles.calendarPickerInput}>
                                                                <DatePicker dateSelected={moment(tarea.deadline).format('DD/MM/YYYY')} rangeDate={false} selectDateEvent={(fechaInicio) => handleChangeTaskDateEnd(i,tarea._id,fechaInicio)} minDate={!lection.dateAvailable  ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')}/>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                }
                                            </div>
                                            })
                                            :
                                            !props.teacher && <b>No hay ninguna tarea en este bloque todavía!</b>
                                    }
                                    {
                                        props.teacher &&  <div className={styles.fileContainer}>
                                            <MyDropzone
                                                text={'Arrastra o pincha para añadir los ficheros.'}
                                                image={'/assets/icons/file.svg'}
                                                onAcceptFile={(files) => handleTaskFiles(files, lection._id,i)}
                                                // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                                            />
                                        </div>
                                    }
                                </div>}
                                {contentSelected[i].optionSelected === 'EV' && <div className={styles.evaluationsResources}>
                                    {
                                        lection.evaluations && lection.evaluations.length > 0  ? lection.evaluations.map((tarea,j)=> {
                                                return <div style={{display:'flex', alignItems:'center',marginBottom:'15px'}} key={tarea._id}>
                                                <div className={styles.taskItem}>
                                                    <a href={tarea.uploadFile} target={'_blank'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'}/>
                                                        <span>EVALUACION - {('0'+j).slice(-2)}</span>
                                                    </a>
                                                    {props.teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteEvaluation(i,lection._id,tarea._id)} className={styles.close}/>}
                                                </div>
                                                {
                                                    !props.teacher && <div className={utilsStyles.timeLeft} style={moment(tarea.deadline).diff( moment(),'days')< 5 ? {backgroundColor:'var(--red-color)'} : {backgroundColor:'var(--black-color)'}}>
                                                        <FontAwesomeIcon icon={faClock} color={'white'} style={{marginRight:'4px'}}/>
                                                        <span>(Quedan {moment(tarea.deadline).diff( moment(),'days')} días)</span>
                                                    </div>
                                                }
                                                {
                                                    props.teacher &&
                                                    <div style={{position:'relative',marginLeft:'8px'}}>
                                                        <span style={{color:'var(--main-color)',marginRight:'4px'}}>Fecha Limite:</span>
                                                        <b onClick={props.teacher ? () => setTaskDateEditing(j) : () => {}} className={`${props.teacher ? styles.editable : ''}`}>{moment(tarea.deadline).format('DD/MM/YYYY')}</b>
                                                        {taskDateEditing === j && <div>
                                                            <div className={utilsStyles.background} onClick={()=>setTaskDateEditing(null)}></div>
                                                            <div className={utilsStyles.calendarPickerInput}>
                                                                <DatePicker dateSelected={moment(tarea.deadline).format('DD/MM/YYYY')} rangeDate={false} selectDateEvent={(fechaInicio) => handleChangeTaskDateEnd(i,tarea._id,fechaInicio)} minDate={!lection.dateAvailable  ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')}/>
                                                            </div>
                                                        </div>}
                                                    </div>
                                                }
                                            </div>
                                            })
                                            :
                                            !props.teacher && <b>No hay ninguna evaluación disponible para este bloque. </b>
                                    }
                                    {props.teacher &&
                                    <div className={styles.fileContainer}>
                                        <MyDropzone
                                            text={'Arrastra o pincha para añadir los ficheros.'}
                                            image={'/assets/icons/file.svg'}
                                            onAcceptFile={(files) => handleEvaluations(files, lection._id, i)}
                                            // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                                        />
                                    </div>
                                    }
                                </div>}
                                {contentSelected[i].optionSelected === 'RA' &&
                                <div className={`${styles.resources} ${styles.videoResources}`}>
                                    {
                                        lection.video && lection.video.length > 0  ? lection.video.map((videoUrl,j)  => {
                                                return <div  className={styles.resourceContainer} key={j}>
                                                    <div>
                                                        <img src={curso.thumbnail} alt={'curso thumbnail'} />
                                                        <FontAwesomeIcon icon={faPlayCircle} color={'var(--main-color)'}  onClick={() => {setVideoPlaying({video:videoUrl.url,title:lection.title + '- video: ' + ('0'+i).slice(-2)})}}/>
                                                    </div>
                                                    {props.teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteVideoResource(i,lection._id,videoUrl._id)} className={styles.close}/>}
                                                </div>
                                        })
                                            :
                                            !props.teacher && <b>No hay ningún recursos audiovisual disponible para este bloque!</b>
                                    }
                                    {
                                        props.teacher && <div className={styles.fileContainer}>
                                            <MyDropzone
                                                filesAccepted={['video/*']}
                                                text={'Arrastra o pincha para añadir los ficheros.'}
                                                image={'/assets/icons/file.svg'}
                                                onAcceptFile={(files) => handleVideosLections(files,lection._id,i)}
                                                // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                                            />
                                        </div>
                                    }
                                </div>}
                            </div>
                        </div>
                    </div>
                    )
            })}
            {videoPlaying && <VideoComponent src={videoPlaying.video} onClose={() => setVideoPlaying(null)} title={videoPlaying.title} hls={true}/>}
        </div>
    )
};

export default CursoOpen;

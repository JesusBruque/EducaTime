import React, {FunctionComponent, useEffect, useState} from "react";
import Course from "../../utils/Course";
import utilsStyles from "../../styles/Utils.module.css";
import DatePicker from "../DatePicker";
import moment from "moment";
import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import MyDropzone from "../MyDropzone";
import {faClock,faFileDownload,faTimes,faFile} from "@fortawesome/free-solid-svg-icons";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {uploadHomeworkLectionFile,uploadTeoreticalResourceLectionFile,uploadLectionVideo} from '../../utils/Lection';
import VideoComponent from "../VideoComponent";
type Props = {
    curso:any,
    teacher:boolean
};
const CursoOpen: FunctionComponent<Props> = (props) => {

    const [curso,setCurso] = useState(props.curso);
    const [videoPlaying,setVideoPlaying] = useState(null);

    const initiateContentSelected = () => {
        let selections = [];
        curso.lections.map((lection,i) => {
            selections.push({lection:i,optionSelected:'RT'});
        });
        return selections;
    };
    const [contentSelected,setContentSelected] = useState(initiateContentSelected());

    const [dateEditing,setDateEditing] = useState(null);
    const [taskDateEditing,setTaskDateEditing] = useState(null);

    const changeContent = (opt,i) => {
        let newContent = [...contentSelected];
        newContent[i].optionSelected = opt;
        setContentSelected(newContent);
    };
    const handleChangeDatesLection = (i, fInicio, fFin) => {
        console.log(fInicio,fFin);
        setDateEditing(null);
    };
    const handleFilesTeorical =  (files,lectionName,i) => {
        files.forEach((file) => {
            uploadTeoreticalResourceLectionFile(lectionName,file,curso._id).then((res) => {
                if(res.status===200){
                    let lections = [...curso.lections];
                    if(res.status===200){
                        lections[i] = res.data.lection;
                        setCurso({...curso,lections:lections})
                    }
                }
                else window.alert('ERRORRRR');
            }).catch(err => console.error(err));
        });
    };
    const handleTaskFiles = (files,lectionName,i) => {
        files.forEach((file) => {
            uploadHomeworkLectionFile(lectionName,'tareas',file,curso._id).then((res)=>{
                let lections = [...curso.lections];
                if(res.status===200){
                    lections[i] = res.data.lection;
                    setCurso({...curso,lections:lections})
                }
                else window.alert('ERRORRRR');
            }).catch(err => console.error(err));
        })
    };
    const handleEvaluations = (files) => {
        console.log(files);
    };
    const handleVideosLections = (files,lectionName,i) => {
        files.forEach((file) => {
            uploadLectionVideo(lectionName,file,curso._id).then((res)=>{
                let lections = [...curso.lections];
                if(res.status===200){
                    lections[i] = res.data.lection;
                    setCurso({...curso,lections:lections})
                }
                else window.alert('ERRORRRR');
            }).catch(err => console.error(err));
        })
    };

    const handleChangeTaskDateEnd = (i,fechaFinTarea) => {
        console.log(fechaFinTarea);
        setTaskDateEditing(null)
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
                                            <span style={{color:'var(--main-color)'}}>Fecha Inicio:</span>
                                            <b onClick={props.teacher ? () => setDateEditing(i) : () => {}} className={`${props.teacher ? styles.editable : ''}`}>{moment(lection.dateAvailable).format('DD/MM/YYYY')}</b>
                                        </div>
                                        <div>
                                            <span  style={{color:'var(--main-color)'}}>Fecha Inicio:</span>
                                            <b onClick={props.teacher ? () => setDateEditing(i) : () => {}} className={`${props.teacher ? styles.editable : ''}`}>{moment(lection.dateEnd).format('DD/MM/YYYY')}</b>
                                        </div>
                                        {
                                            props.teacher && dateEditing === i && <div style={{position:'relative'}}>
                                                <div className={utilsStyles.background} onClick={()=>setDateEditing(null)}></div>
                                                <div className={utilsStyles.calendarPickerInput}>
                                                    <DatePicker rangeDate={true} selectDateEvent={(fechaInicio,fechaFin) => handleChangeDatesLection(i,fechaInicio,fechaFin)} minDate={i === 0 ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')} />
                                                </div>
                                            </div>
                                        }
                                    </div>
                                    :
                                    <div className={utilsStyles.timeLeft} style={moment().diff( moment(lection.dateEnd),'days')< 5 ? {backgroundColor:'var(--red-color)'} : {backgroundColor:'var(--black-color)'}}>
                                        <FontAwesomeIcon icon={faClock} color={'white'} style={{marginRight:'4px'}}/>
                                        <span>(Quedan {moment().diff( moment(lection.dateEnd),'days')} días)</span>
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
                                <div>
                                    {
                                        lection.teoricalResources && lection.teoricalResources.length > 0  ? lection.teoricalResources.map((resourceUrl,i)  => {
                                                return <div className={styles.fileContainer} key={i}><a href={resourceUrl} target={'_blank'}><FontAwesomeIcon icon={faFile} color={'var(--main-color)'}/></a></div>
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
                                {contentSelected[i].optionSelected === 'TA' && <div>
                                    {
                                        lection.homework && lection.homework.length > 0  ? lection.homework.map((tarea,i)  => {
                                            return <div style={{display:'flex', alignItems:'center'}} key={i}>
                                                <div className={styles.taskItem}>
                                                    <a href={tarea.uploadFile} target={'_blank'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'}/><span>TAREA - {('0'+1).slice(-2)}</span></a>
                                                    <FontAwesomeIcon icon={faTimes} onClick={() => console.log('eliminar tarea!!')} className={styles.close}/>
                                                </div>
                                                {
                                                    props.teacher &&
                                                    <div style={{position:'relative',marginLeft:'6px'}}>
                                                        <span style={{color:'var(--main-color)'}}>Fecha Limite:</span>
                                                        <b onClick={props.teacher ? () => setTaskDateEditing(i) : () => {}} className={`${props.teacher ? styles.editable : ''}`}>{moment(lection.dateAvailable).format('DD/MM/YYYY')}</b>
                                                        {taskDateEditing === i && <div>
                                                            <div className={utilsStyles.background} onClick={()=>setTaskDateEditing(null)}></div>
                                                            <div className={utilsStyles.calendarPickerInput}>
                                                                <DatePicker rangeDate={false} selectDateEvent={(fechaInicio) => handleChangeTaskDateEnd(i,fechaInicio)} minDate={!lection.dateAvailable  ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')}/>
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
                                {contentSelected[i].optionSelected === 'EV' && <div>
                                    {
                                        lection.evaluationResources && lection.evaluationResources.length > 0  ? lection.evaluationResources.map(video  => {
                                                return video.url
                                            })
                                            :
                                            !props.teacher && <b>No hay ninguna evaluación disponible para este bloque. </b>
                                    }
                                    {props.teacher &&
                                    <div className={styles.fileContainer}>
                                        <MyDropzone
                                            text={'Arrastra o pincha para añadir los ficheros.'}
                                            image={'/assets/icons/file.svg'}
                                            onAcceptFile={(files) => handleEvaluations(files)}
                                            // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                                        />
                                    </div>
                                    }
                                </div>}
                                {contentSelected[i].optionSelected === 'RA' && <div>
                                    {
                                        lection.video && lection.video.length > 0  ? lection.video.map((videoUrl,i)  => {
                                                return <div><button onClick={() => {setVideoPlaying({video:videoUrl,title:lection.title + '- video: ' + ('0'+i).slice(-2)})}}>play video</button></div>
                                        })
                                            :
                                            !props.teacher && <b>No hay ningún recursos audiovisual disponible para este bloque!</b>
                                    }
                                    {
                                        props.teacher && <div className={styles.fileContainer}>
                                            <MyDropzone
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

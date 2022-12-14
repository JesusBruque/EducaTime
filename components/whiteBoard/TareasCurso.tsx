import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFileDownload, faTimes, faReply } from "@fortawesome/free-solid-svg-icons";
import { deleteHomework, uploadHomeworkResponseFile, uploadHomeworkLectionFile, updateTaskDate } from '../../utils/Lection';
import {useEffect, useState} from 'react';
import MyDropzone from '../MyDropzone';
import utilsStyles from "../../styles/Utils.module.css";
import moment from 'moment';
import DatePicker from '../DatePicker';

const TareasCurso = ({ user, curso, setCurso = null, lection, teacher = null, utils, cargarContenido, setCargarContenido, showPendientes = true }) => {

    const [responding, setResponding] = useState(null)
    const [taskDateEditing, setTaskDateEditing] = useState(null);
    const formatDates = (date) => {
        return moment(date, 'DD/MM/YYYY').unix() * 1000;
    };
    const handleRespondingFiles = (file, idLection: string, idTarea: string) => {
        uploadHomeworkResponseFile(idLection, idTarea, file[0]).then((res) => {
            if (res.status === 200) {
                setCargarContenido(!cargarContenido);
                setResponding(null);
            }
            else window.alert('ERROR');
        }).catch(err => {
            console.error(err);
        });
    };
    const handleDeleteTarea = (lectionId, tarea) => {
        deleteHomework(curso._id, lectionId, tarea).then((res) => {
            if (res.status == 200) {
                let lections = [...curso.lections];
                let index = -1;
                lections.find((x, i) => {
                    if (x._id + '' === lectionId + '') {
                        index = i;
                        return true;
                    }
                    return false;
                })
                lections[index] = res.data.lection;
                if (setCurso)
                    setCurso({ ...curso, lections: lections });
                setCargarContenido(!cargarContenido);
            }
        }).catch((error) => {
            console.error(error);
        })
    };
    const canRespond = (lectionId: string, tareaId: string): boolean => {
        if (user && user.cursos) {
            for (let i = 0; i < user.cursos.length; i++) {
                const curso = user.cursos[i];
                const lection = curso.lections.find(x => x.idLection + '' === lectionId + '');
                if (lection) {
                    const find = lection.taskResponses.find(x => x.origin + '' === tareaId + '');
                    if (find) return false;
                }
            }
        }
        return true;

    }

    const handleTaskFiles = (files, lectionId) => {
        files.forEach((file) => {
            uploadHomeworkLectionFile(lectionId, 'tareas', file, curso._id).then((res) => {
                let lections = [...curso.lections];
                if (res.status === 200) {
                    let lections = [...curso.lections];
                    let index = -1;
                    lections.find((x, i) => {
                        if (x._id + '' === lectionId + '') {
                            index = i;
                            return true;
                        }
                        return false;
                    })
                    lections[index] = res.data.lection;

                    if (setCurso) setCurso({ ...curso, lections: lections });
                    setCargarContenido(!cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                utils.removeLoader();
            });
        })
    };
    const handleChangeTaskDateEnd = (lectionId, taskId, fechaFinTarea) => {
        updateTaskDate(taskId, formatDates(fechaFinTarea), curso._id).then(res => {
            if (res.status === 200) {
                let lections = [...curso.lections];
                let index = -1;
                lections.find((x, i) => {
                    if (x._id + '' === lectionId + '') {
                        index = i;
                        return true;
                    }
                    return false;
                })
                lections[index] = res.data.lection;
                if (setCurso) setCurso({ ...curso, lections: lections });
                setCargarContenido(!cargarContenido);
            } else {
                window.alert('ERRORR');
            }
        }).catch(err => {
            console.error(err)
        });
        setTaskDateEditing(null);
    };
    useEffect(() => {
        console.log(lection.homework);
    },[]);
    return <div className={styles.taskResources}>
        {
            lection.homework && lection.homework.length > 0 ? lection.homework.map((tarea, j) => {
                if (!showPendientes && !canRespond(lection._id, tarea._id)) return <div />
                return <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px', flexWrap:'wrap' }} key={tarea._id}>
                    <div className={styles.taskItem}>
                        <a href={tarea.uploadFile} target={'_blank'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'} />
                            <span>TAREA - {('0' + j).slice(-2)}</span>
                        </a>
                        {teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteTarea(lection._id, tarea._id)} className={styles.close} />}
                    </div>
                    {canRespond(lection._id, tarea._id) && <FontAwesomeIcon onClick={() => {
                        canRespond(lection._id, tarea._id);
                        if (responding && responding._id === tarea._id) setResponding(null)
                        else setResponding(tarea)
                    }} icon={faReply} color={'var(--main-color)'} style={{ cursor: 'pointer', margin: '0px 4px', height:'1em' }} />}
                    {!canRespond(lection._id, tarea._id) &&  <a href={'#'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'} style={{ height:'1.2em'}} /></a>}
                    {
                        !teacher && canRespond(lection._id,tarea._id) && <div className={utilsStyles.timeLeft} style={moment(tarea.deadline).diff(moment(), 'days') < 5 ? { backgroundColor: 'var(--red-color)' } : { backgroundColor: 'var(--black-color)' }}>
                            <FontAwesomeIcon icon={faClock} color={'white'} style={{ marginRight: '4px' }} />
                            <span>(Quedan {moment(tarea.deadline).diff(moment(), 'days')} d??as)</span>
                        </div>
                    }
                    {responding && responding._id === tarea._id &&
                        <div style={{width:'100%',margin:'12px 0'}}>
                            <div className={styles.fileContainer}>
                                <MyDropzone
                                    text={'Arrastra o pincha para a??adir los ficheros.'}
                                    image={'/assets/icons/file.svg'}
                                    onAcceptFile={(files) => handleRespondingFiles(files, lection._id, tarea._id)}
                                    // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                                />
                            </div>
                        </div>
                    }
                    {
                        teacher &&
                        <div style={{ position: 'relative', marginLeft: '8px' }}>
                            <span style={{ color: 'var(--main-color)', margin: '4px' }}>Fecha L??mite:</span>
                            <b onClick={teacher ? () => setTaskDateEditing(j) : () => { }} className={`${teacher ? styles.editable : ''}`}>{moment(tarea.deadline).format('DD/MM/YYYY')}</b>
                            {taskDateEditing === j && <div>
                                <div className={utilsStyles.background} onClick={() => setTaskDateEditing(null)}></div>
                                <div className={utilsStyles.calendarPickerInput}>
                                    <DatePicker dateSelected={moment(tarea.deadline).format('DD/MM/YYYY')} rangeDate={false} selectDateEvent={(fechaInicio) => handleChangeTaskDateEnd(lection._id, tarea._id, fechaInicio)} minDate={!lection.dateAvailable ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')} />
                                </div>
                            </div>}
                        </div>
                    }
                    {teacher &&  <div style={{margin:'8px', display:'grid', gridRowGap:'4px'}}>
                        <span>Respuestas:</span>
                        {tarea.userResponses.map((response,i) => {
                            return  <div key={i}><span style={{marginRight:'8px'}}></span><a href={response.file} target={'_blank'} style={{margin:'8px'}} ><FontAwesomeIcon icon={faFileDownload} style={{height:'1.3em'}} color={'var(--main-color)'} /></a></div>
                        })}
                    </div>}
                </div>
            })
                :
                !teacher && <b>No hay ninguna tarea en este bloque todav??a!</b>
        }
        {
            teacher && <div className={styles.fileContainer}>
                <MyDropzone
                    text={'Arrastra o pincha para a??adir los ficheros.'}
                    image={'/assets/icons/file.svg'}
                    onAcceptFile={(files) => handleTaskFiles(files, lection._id)}
                // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                />
            </div>
        }
    </div>
}

export default TareasCurso;

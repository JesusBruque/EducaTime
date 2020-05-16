import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faClock, faFileDownload, faTimes, faReply } from "@fortawesome/free-solid-svg-icons";
import { deleteHomework, uploadHomeworkResponseFile, uploadHomeworkLectionFile, updateTaskDate } from '../../utils/Lection';
import { useState } from 'react';
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

        utils.initLoader();
        utils.startLoader();
        uploadHomeworkResponseFile(idLection, idTarea, file[0]).then((res) => {
            utils.removeLoader();
            if (res.status === 200) {
                setCargarContenido(!cargarContenido);
                setResponding(null);
            }
            else window.alert('ERRORRRR');
        }).catch(err => {
            console.error(err);
            utils.removeLoader();
        });
        utils.removeLoader();
    };
    const handleDeleteTarea = (lectionId, tarea) => {
        utils.initLoader();
        utils.startLoader();
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
        let res = true;
        if (user && user.cursos) {
            for (let i = 0; i < user.cursos.length; i++) {
                const curso = user.cursos[i];
                const lection = curso.lections.find(x => x.idLection + '' === lectionId + '');
                if (lection) {
                    const find = lection.taskResponses.find(x => x.origin + '' === tareaId + '');
                    if (find) res = false;
                }
            }
        }
        return res;

    }

    const handleTaskFiles = (files, lectionId) => {
        files.forEach((file) => {
            utils.initLoader();
            utils.startLoader();
            uploadHomeworkLectionFile(lectionId, 'tareas', file, curso._id).then((res) => {
                utils.removeLoader();
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
        utils.initLoader();
        utils.startLoader();
        updateTaskDate(taskId, formatDates(fechaFinTarea), curso._id).then(res => {
            utils.removeLoader();
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
            utils.removeLoader();
            console.error(err)
        });
        setTaskDateEditing(null);
    };
    return <div className={styles.taskResources}>
        {
            lection.homework && lection.homework.length > 0 ? lection.homework.map((tarea, j) => {
                if (!showPendientes && !canRespond(lection._id, tarea._id)) return <div />
                return <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px' }} key={tarea._id}>
                    <div className={styles.taskItem}>
                        <a href={tarea.uploadFile} target={'_blank'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'} />
                            <span>TAREA - {('0' + j).slice(-2)}</span>
                        </a>
                        {teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteTarea(lection._id, tarea._id)} className={styles.close} />}
                    </div>
                    {canRespond(lection._id, tarea._id) && <FontAwesomeIcon onClick={() => {
                        if (responding && responding._id === tarea._id) setResponding(null)
                        else setResponding(tarea)
                    }} icon={faReply} color={'var(--main-color)'} style={{ cursor: 'pointer', margin: '0px 4px' }} />}
                    {!canRespond(lection._id, tarea._id) && <span>COMPLETADA</span>}
                    {responding && responding._id === tarea._id && <MyDropzone
                        text={'Arrastra o pincha para añadir los ficheros.'}
                        image={'/assets/icons/file.svg'}
                        onAcceptFile={(files) => handleRespondingFiles(files, lection._id, tarea._id)}
                    // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                    />}
                    {
                        !teacher && <div className={utilsStyles.timeLeft} style={moment(tarea.deadline).diff(moment(), 'days') < 5 ? { backgroundColor: 'var(--red-color)' } : { backgroundColor: 'var(--black-color)' }}>
                            <FontAwesomeIcon icon={faClock} color={'white'} style={{ marginRight: '4px' }} />
                            <span>(Quedan {moment(tarea.deadline).diff(moment(), 'days')} días)</span>
                        </div>
                    }

                    {
                        teacher &&
                        <div style={{ position: 'relative', marginLeft: '8px' }}>
                            <span style={{ color: 'var(--main-color)', marginRight: '4px' }}>Fecha Límite:</span>
                            <b onClick={teacher ? () => setTaskDateEditing(j) : () => { }} className={`${teacher ? styles.editable : ''}`}>{moment(tarea.deadline).format('DD/MM/YYYY')}</b>
                            {taskDateEditing === j && <div>
                                <div className={utilsStyles.background} onClick={() => setTaskDateEditing(null)}></div>
                                <div className={utilsStyles.calendarPickerInput}>
                                    <DatePicker dateSelected={moment(tarea.deadline).format('DD/MM/YYYY')} rangeDate={false} selectDateEvent={(fechaInicio) => handleChangeTaskDateEnd(lection._id, tarea._id, fechaInicio)} minDate={!lection.dateAvailable ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')} />
                                </div>
                            </div>}
                        </div>
                    }
                </div>
            })
                :
                !teacher && <b>No hay ninguna tarea en este bloque todavía!</b>
        }
        {
            teacher && <div className={styles.fileContainer}>
                <MyDropzone
                    text={'Arrastra o pincha para añadir los ficheros.'}
                    image={'/assets/icons/file.svg'}
                    onAcceptFile={(files) => handleTaskFiles(files, lection._id)}
                // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                />
            </div>
        }
    </div>
}

export default TareasCurso;
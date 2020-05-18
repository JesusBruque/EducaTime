
import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFileDownload, faTimes, faClock, faReply } from '@fortawesome/free-solid-svg-icons';
import { deleteEvaluation, uploadEvaluationLectionFile, updateEvaluationDate, uploadEvaluationResponseFile } from '../../utils/Lection';
import moment from 'moment';
import utilsStyles from "../../styles/Utils.module.css";
import { useState } from 'react';
import DatePicker from '../DatePicker';
import MyDropzone from '../MyDropzone';

const EvaluacionCurso = ({ user, lection, teacher, utils, curso, setCurso, cargarContenido, setCargarContenido }) => {

    const [taskDateEditing, setTaskDateEditing] = useState(null);
    const [responding, setResponding] = useState(null)

    const handleDeleteEvaluation = (lectionId: string, evalId: string) => {
        utils.initLoader();
        utils.startLoader();
        deleteEvaluation(curso._id, lectionId, evalId).then((res) => {
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
                setCurso({ ...curso, lections: lections });
                setCargarContenido(!cargarContenido);
            }
        }).catch((error) => {
            console.error(error);
        })
    }

    const handleEvaluations = (files, lectionId: string) => {
        files.forEach((file) => {
            utils.initLoader();
            utils.startLoader();
            uploadEvaluationLectionFile(lectionId, 'evaluacion', file, curso._id).then((res) => {
                utils.removeLoader();
                let lections = [...curso.lections];
                if (res.status === 200) {
                    let index = -1;
                    lections.find((x, i) => {
                        if (x._id + '' === lectionId + '') {
                            index = i;
                            return true;
                        }
                        return false;
                    })
                    lections[index] = res.data.lection;
                    setCurso({ ...curso, lections: lections });
                    setCargarContenido(!cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                utils.removeLoader();
            });
        })
    };
    const formatDates = (date) => {
        return moment(date, 'DD/MM/YYYY').unix() * 1000;
    };
    const handleChangeEvaluationDateEnd = (lectionId: string, evaluationId: string, fechaFinEvaluation) => {
        utils.initLoader();
        utils.startLoader();
        updateEvaluationDate(evaluationId, formatDates(fechaFinEvaluation), curso._id).then(res => {
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
                setCurso({ ...curso, lections: lections });
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
    const canRespond = (lectionId: string, evaluationId: string) => {
        if (user && user.cursos) {
            for (let i = 0; i < user.cursos.length; i++) {
                const curso = user.cursos[i];
                const lection = curso.lections.find(x => x.idLection + '' === lectionId + '');
                if (lection) {
                    const find = lection.evaluationResponses.find(x => x.origin + '' === evaluationId + '');
                    if (find)
                        return false;
                }
            }
        }
        return true;
    };
    const getUserFile = (lectionId:string,evaluationId:string) => {
        console.log('CONSEGUIR EL FICHERO DEL USUARIO');
    }
    const handleRespondingFiles = (file, idLection: string, idEvaluation: string) => {

        utils.initLoader();
        utils.startLoader();
        uploadEvaluationResponseFile(idLection, idEvaluation, file[0]).then((res) => {
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
    return (<div className={styles.evaluationsResources}>
        {
            lection.evaluations && lection.evaluations.length > 0 ? lection.evaluations.map((evaluation, j) => {
                return <div style={{ display: 'flex', alignItems: 'center', marginBottom: '15px',flexWrap:'wrap' }} key={evaluation._id}>
                    <div className={styles.taskItem}>
                        <a href={evaluation.uploadFile} target={'_blank'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'} />
                            <span>EVALUACION - {('0' + j).slice(-2)}</span>
                        </a>
                        {teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteEvaluation(lection._id, evaluation._id)} className={styles.close} />}
                    </div>
                    {canRespond(lection._id, evaluation._id) && <FontAwesomeIcon onClick={() => {
                        if (responding && responding._id === evaluation._id) setResponding(null)
                        else setResponding(evaluation)
                    }} icon={faReply} color={'var(--main-color)'} style={{ cursor: 'pointer', margin: '0px 4px' }} />}
                    {!canRespond(lection._id, evaluation._id) && <a href={'#'}><FontAwesomeIcon icon={faFileDownload} color={'var(--main-color)'} /></a>}
                    {
                        !teacher && <div className={utilsStyles.timeLeft} style={moment(evaluation.deadline).diff(moment(), 'days') < 5 ? { backgroundColor: 'var(--red-color)' } : { backgroundColor: 'var(--black-color)' }}>
                            <FontAwesomeIcon icon={faClock} color={'white'} style={{ marginRight: '4px' }} />
                            <span>(Quedan {moment(evaluation.deadline).diff(moment(), 'days')} días)</span>
                        </div>
                    }
                    {
                        teacher &&
                        <div style={{ position: 'relative', marginLeft: '8px' }}>
                            <span style={{ color: 'var(--main-color)', marginRight: '4px' }}>Fecha Limite:</span>
                            <b onClick={teacher ? () => setTaskDateEditing(j) : () => { }} className={`${teacher ? styles.editable : ''}`}>{moment(evaluation.deadline).format('DD/MM/YYYY')}</b>
                            {taskDateEditing === j && <div>
                                <div className={utilsStyles.background} onClick={() => setTaskDateEditing(null)}></div>
                                <div className={utilsStyles.calendarPickerInput}>
                                    <DatePicker dateSelected={moment(evaluation.deadline).format('DD/MM/YYYY')} rangeDate={false} selectDateEvent={(fechaInicio) => handleChangeEvaluationDateEnd(lection._id, evaluation._id, fechaInicio)} minDate={!lection.dateAvailable ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')} />
                                </div>
                            </div>}
                        </div>
                    }
                    {responding && responding._id === evaluation._id &&
                    <div style={{width:'100%',margin:'12px 0'}}>
                        <div className={styles.fileContainer}>
                            <MyDropzone
                                text={'Arrastra o pincha para añadir los ficheros.'}
                                image={'/assets/icons/file.svg'}
                                onAcceptFile={(files) => handleRespondingFiles(files, lection._id, evaluation._id)}
                                // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                            />
                        </div>
                    </div>}
                </div>
            })
                :
                !teacher && <b>No hay ninguna evaluación disponible para este bloque. </b>
        }
        {teacher &&
            <div className={styles.fileContainer}>
                <MyDropzone
                    text={'Arrastra o pincha para añadir los ficheros.'}
                    image={'/assets/icons/file.svg'}
                    onAcceptFile={(files) => handleEvaluations(files, lection._id)}
                // disabled={!!(cursoFiles.thumbnail && cursoFiles.video)}
                />
            </div>
        }
    </div>)
}
export default EvaluacionCurso;

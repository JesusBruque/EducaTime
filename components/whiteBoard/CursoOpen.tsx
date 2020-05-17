import React, { Dispatch, FunctionComponent, useEffect, useState } from "react";
import utilsStyles from "../../styles/Utils.module.css";
import DatePicker from "../DatePicker";
import moment from "moment";
import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import MyDropzone from "../MyDropzone";
import { faClock, faTimes, faFile, faPlayCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { deleteVideoResource, deleteTeoricalResources, uploadTeoreticalResourceLectionFile, uploadLectionVideo, updateLectionDates } from '../../utils/Lection';
import VideoComponent from "../VideoComponent";
import WebUtils from "../../webUtils/WebUtils";
import Button from "../Button";
import ValorarContent from './ValorarContent'
import TareasCurso from "./TareasCurso";
import EvaluacionCurso from "./EvaluacionCurso";
import AlumnosCurso from "./AlumnosCurso";

type Props = {
    cursoIndex?: number,
    curso: any,
    setCurso: Dispatch<any>,
    teacher: boolean,
    cargarContenido: boolean,
    setCargarContenido: Dispatch<boolean>,
    utils: WebUtils,
    user
};
const CursoOpen: FunctionComponent<Props> = (props) => {
    const [writeReview, setWriteReview] = useState(null);
    const { curso, setCurso } = props;
    const [videoPlaying, setVideoPlaying] = useState(null);
    const [showUsuarios, setShowUsuarios] = useState(false)
    const handleDeleteTeoricalResource = (i, lectionId, tareaId) => {
        props.utils.initLoader();
        props.utils.startLoader();
        deleteTeoricalResources(curso._id, lectionId, tareaId).then((res) => {
            if (res.status == 200) {
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({ ...curso, lections: lections });
                props.setCargarContenido(!props.cargarContenido);
            }
        }).catch((error) => {
            console.error(error);
        })
    };
    const handleDeleteVideoResource = (i, lectionId, resourceId) => {
        props.utils.initLoader();
        props.utils.startLoader();
        deleteVideoResource(curso._id, lectionId, resourceId).then((res) => {
            if (res.status == 200) {
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({ ...curso, lections: lections });
                props.setCargarContenido(!props.cargarContenido);
            }
        }).catch((error) => {
            console.error(error);
        })
    };
    const initiateContentSelected = () => {
        let selections = [];
        curso.lections.map((lection, i) => {
            selections.push({ lection: i, optionSelected: 'RT' });
        });
        return selections;
    };
    const [contentSelected, setContentSelected] = useState(initiateContentSelected());

    useEffect(() => {
        initiateContentSelected();
    }, [curso]);

    const [dateEditing, setDateEditing] = useState(null);

    const formatDates = (date) => {
        return moment(date, 'DD/MM/YYYY').unix() * 1000;
    };
    const changeContent = (opt, i) => {
        let newContent = [...contentSelected];
        newContent[i].optionSelected = opt;
        setContentSelected(newContent);
    };
    const handleChangeDatesLection = (i, lectionId, fInicio, fFin) => {
        props.utils.initLoader();
        props.utils.startLoader();
        updateLectionDates(formatDates(fInicio), formatDates(fFin), lectionId, curso._id).then(res => {
            if (res.status === 200) {
                let lections = [...curso.lections];
                lections[i] = res.data.lection;
                setCurso({ ...curso, lections: lections });
                props.setCargarContenido(!props.cargarContenido);
                props.utils.removeLoader();
            } else {
                window.alert('ERORRR');
            }
        }).catch(err => console.error(err));
        setDateEditing(null);
    };
    const handleFilesTeorical = (files, lectionName, i) => {
        files.forEach((file) => {
            props.utils.initLoader();
            props.utils.startLoader();
            uploadTeoreticalResourceLectionFile(lectionName, file, curso._id).then((res) => {
                props.utils.removeLoader();
                if (res.status === 200) {
                    let lections = [...curso.lections];
                    lections[i] = res.data.lection;
                    setCurso({ ...curso, lections: lections });
                    props.setCargarContenido(!props.cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                props.utils.removeLoader();
            });
        });
    };

    const handleVideosLections = (files, lectionName, i) => {
        files.forEach((file) => {
            props.utils.initLoader();
            props.utils.startLoader();
            uploadLectionVideo(lectionName, file, curso._id).then((res) => {
                props.utils.removeLoader();
                let lections = [...curso.lections];
                if (res.status === 200) {
                    lections[i] = res.data.lection;
                    setCurso({ ...curso, lections: lections });
                    props.setCargarContenido(!props.cargarContenido);
                }
                else window.alert('ERRORRRR');
            }).catch(err => {
                console.error(err);
                props.utils.removeLoader();
            });
        })
    };

    const handleShowValorarWindow = () => {
        setWriteReview(true);
    }
    const checkingValorarStatus = () => {
        const c = props.user.cursos;
        for (var i = 0; i < c.length; i++) {
            if (c[i].idCurso == curso) {
                return c[i].review.enabled;
            }
        }
        return false;
    }
    const canShowLection = (userCourse, lection) => {
        if (userCourse && lection) {
            const user = props.user;
            const feeState = userCourse.feeState;
            let indexLastFee = -1;
            feeState.filter((x, index) => {
                if (x.paid && index > indexLastFee)
                    indexLastFee = index
                return false;
            });
            if (indexLastFee === feeState.length - 1) return true;
            const fee = feeState[indexLastFee + 1]
            const feeInfo = userCourse.idCurso.fees.find(x => x._id + '' === fee.idFee + '');
            if (moment(feeInfo.date).isBefore(lection.dateAvailable))
                return false;
            return true;
        }
        return false;
    }
    return (
        <div>
            <h2>{curso.title}</h2>
            <h3>Profesor: {curso.teacher}</h3>
            {/* {writeReview && <ValorarContent user={props.user} cursoIndex={props.cursoIndex} cursoId={curso} setWriteReview={setWriteReview} />} */}
            {/* <Button action={handleShowValorarWindow} color={'var(--main-color)'} text='Valorar este curso' disabled={false} type={'button'} /> */}
            {props.teacher && props.user.email === curso.teacher && <span style={{ cursor: 'pointer' }} onClick={() => setShowUsuarios(!showUsuarios)}>Alumnos</span>}
            {props.teacher && props.user.email === curso.teacher && <AlumnosCurso show={showUsuarios} curso={curso} />}
            {curso.lections.map((lection, i) => {
                if (canShowLection(props.user.cursos[props.cursoIndex], lection))
                    return (
                        <div className={styles.lectionItem} key={i}>
                            <div className={styles.lectionHeader}>
                                <h3 style={{ marginRight: '15px' }}>{lection.title}</h3>
                                {
                                    props.teacher ?
                                        <div style={{ display: 'flex' }}>
                                            <div style={{ marginRight: '8px' }}>
                                                <span style={{ color: 'var(--main-color)', marginRight: '4px' }}>Fecha Inicio:</span>
                                                <b onClick={props.teacher ? () => setDateEditing(i) : () => { }} className={`${props.teacher ? styles.editable : ''}`}>{moment(lection.dateAvailable).format('DD/MM/YYYY')}</b>
                                            </div>
                                            <div>
                                                <span style={{ color: 'var(--main-color)', marginRight: '4px' }}>Fecha Fin:</span>
                                                <b onClick={props.teacher ? () => setDateEditing(i) : () => { }} className={`${props.teacher ? styles.editable : ''}`}>{moment(lection.dateEnd).format('DD/MM/YYYY')}</b>
                                            </div>
                                            {
                                                props.teacher && dateEditing === i && <div style={{ position: 'relative' }}>
                                                    <div className={utilsStyles.background} onClick={() => setDateEditing(null)}></div>
                                                    <div className={utilsStyles.calendarPickerInput}>
                                                        <DatePicker rangeDate={true} selectDateEvent={(fechaInicio, fechaFin) => handleChangeDatesLection(i, lection._id, fechaInicio, fechaFin)} minDate={i === 0 ? moment().format('DD/MM/YYYY') : moment(lection.dateAvailable).format('DD/MM/YYYY')} />
                                                    </div>
                                                </div>
                                            }
                                        </div>
                                        :
                                        <div className={utilsStyles.timeLeft} style={moment(lection.dateEnd).diff(moment(), 'days') < 5 ? { backgroundColor: 'var(--red-color)' } : { backgroundColor: 'var(--black-color)' }}>
                                            <FontAwesomeIcon icon={faClock} color={'white'} style={{ marginRight: '4px' }} />
                                            <span>(Quedan {moment(lection.dateEnd).diff(moment(), 'days')} días)</span>
                                        </div>
                                }

                            </div>
                            <div className={styles.lectionContainer}>
                                <div className={styles.optionsSelector}>
                                    <span className={`${contentSelected[i] && contentSelected[i].optionSelected === 'RT' ? styles.optionSelected : ''}`} onClick={() => { changeContent('RT', i) }}>Recursos teóricos</span>
                                    <span className={`${contentSelected[i] && contentSelected[i].optionSelected === 'TA' ? styles.optionSelected : ''}`} onClick={() => { changeContent('TA', i) }}>Tareas</span>
                                    <span className={`${contentSelected[i] && contentSelected[i].optionSelected === 'EV' ? styles.optionSelected : ''}`} onClick={() => { changeContent('EV', i) }}>Evaluación</span>
                                    <span className={`${contentSelected[i] && contentSelected[i].optionSelected === 'RA' ? styles.optionSelected : ''}`} onClick={() => { changeContent('RA', i) }}>Recursos audiovisuales</span>
                                </div>
                                <div className={styles.lectionContent}>
                                    {contentSelected[i] && contentSelected[i].optionSelected === 'RT' &&
                                        <div className={`${styles.resources} ${styles.teoricalResources}`}>
                                            {
                                                lection.teoricalResources && lection.teoricalResources.length > 0 ? lection.teoricalResources.map((resourceUrl, j) => {
                                                    return <div className={styles.resourceContainer} key={j}>
                                                        <a href={resourceUrl.url} target={'_blank'}>
                                                            <img src={curso.thumbnail} alt={'thumbnail del curso'} />
                                                            <FontAwesomeIcon icon={faFile} color={'var(--main-color)'} />
                                                        </a>
                                                        {props.teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteTeoricalResource(i, lection._id, resourceUrl._id)} className={styles.close} />}
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
                                                        onAcceptFile={(files) => handleFilesTeorical(files, lection._id, i)}
                                                    // disabled={!!(props.cursoFiles.thumbnail && props.cursoFiles.video)}
                                                    />
                                                </div>
                                            }
                                        </div>}
                                    {contentSelected[i] && contentSelected[i].optionSelected === 'TA' && <TareasCurso
                                        user={props.user}
                                        curso={curso}
                                        setCurso={setCurso}
                                        lection={lection} teacher={props.teacher} utils={props.utils}
                                        cargarContenido={props.cargarContenido} setCargarContenido={props.setCargarContenido} />}
                                    {contentSelected[i] && contentSelected[i].optionSelected === 'EV' && <EvaluacionCurso
                                        user={props.user}
                                        curso={curso}
                                        setCurso={setCurso}
                                        lection={lection}
                                        teacher={props.teacher}
                                        utils={props.utils}
                                        cargarContenido={props.cargarContenido}
                                        setCargarContenido={props.setCargarContenido} />}
                                    {contentSelected[i] && contentSelected[i].optionSelected === 'RA' &&
                                        <div className={`${styles.resources} ${styles.videoResources}`}>
                                            {
                                                lection.video && lection.video.length > 0 ? lection.video.map((videoUrl, j) => {
                                                    return <div className={styles.resourceContainer} key={j}>
                                                        <div>
                                                            <img src={curso.thumbnail} alt={'curso thumbnail'} />
                                                            <FontAwesomeIcon icon={faPlayCircle} color={'var(--main-color)'} onClick={() => { setVideoPlaying({ video: videoUrl.url, title: lection.title + '- video: ' + ('0' + i).slice(-2) }) }} />
                                                        </div>
                                                        {props.teacher && <FontAwesomeIcon icon={faTimes} onClick={() => handleDeleteVideoResource(i, lection._id, videoUrl._id)} className={styles.close} />}
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
                                                        onAcceptFile={(files) => handleVideosLections(files, lection._id, i)}
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
            {videoPlaying && <VideoComponent src={videoPlaying.video} onClose={() => setVideoPlaying(null)} title={videoPlaying.title} hls={true} />}
        </div>
    )
};

export default CursoOpen;

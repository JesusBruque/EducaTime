import utilsStyles from "../../../styles/Utils.module.css";
import React, {useEffect, useState} from "react";
import Course, {create, uploadCourseFile, validate} from '../../../utils/Course';
import LayoutAdmin from "../../../components/LayoutAdmin";
import VideoComponent from "../../../components/VideoComponent";
import AddCourseForm from "../../../components/cursos/AddCourseForm";
import Button from "../../../components/Button";
import ErrorsPanel from "../../../components/ErrorsPanel";
import Modal from "../../../components/Modal";

const AddCourse = (props) => {
    const [cursoInfo,setCursoInfo] = useState(new Course());
    const [errors,setErrors] = useState(null);

    const [cursoFiles,setCursoFiles] = useState({thumbnail:null,video:null});
    const [webinarFile,setWebinarFile] = useState(null);
    const [videoPlaying,setVideoPlaying] = useState(null);

    const [advertise,setAdvertise] = useState(false);

    const CreateCourse = () => {
        validate(cursoInfo).then(() => {
            props.utils.initLoader('Subiendo curso...');
            props.utils.startLoader();
            let uploadThumbnail: Promise<string> = new Promise((resolve, reject) => {
                uploadCourseFile(cursoInfo.title, cursoFiles.thumbnail,false,false).then(res => {
                    props.utils.changeTextLoader('Subiendo video...');
                    resolve(res.data.location);
                }).catch(err => reject(err));
            });

            let uploadVideo: Promise<string> = new Promise((resolve, reject) => {
                uploadCourseFile(cursoInfo.title, cursoFiles.video,true,false).then(res => resolve(res.data.location)).catch(err => reject(err));
            });
            let uploadWebinar: Promise<string> = new Promise(((resolve, reject) => {
                if (webinarFile) {
                    uploadCourseFile(cursoInfo.title, webinarFile,true,true).then(res => resolve(res.data.location)).catch(err => reject(err))
                } else {
                    resolve('');
                }
            }));
            let filePromises = [uploadThumbnail, uploadVideo, uploadWebinar];
            Promise.all(filePromises).then(values => {
                cursoInfo.thumbnail = values[0];
                cursoInfo.video = values[1];
                cursoInfo.webinar = values[2];
                props.utils.changeTextLoader('Subiendo la información del curso...');
                create(cursoInfo).then(() => {
                    props.utils.removeLoader();
                    setAdvertise(true);
                }).catch(() => {
                    window.alert('ERROR');
                    props.utils.removeLoader();
                })
            }).catch(() => {
                window.alert('ERROR');
                props.utils.removeLoader();
            });
        }).catch(errors => setErrors(errors));
    };

    return (
        <LayoutAdmin user={props.user} router={props.router} selected={'formacion'} setUser={props.setUser} utils={props.utils}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',alignItems:'center'}}>
                    <h1 className={`${utilsStyles.sectionTitle}`}>Añadir Curso</h1>
                    <Button color={'blue'} text={'Guardar curso'} action={CreateCourse}/>
                </div>
                <AddCourseForm utils={props.utils} cursoInfo={cursoInfo} setCursoInfo={setCursoInfo} cursoFiles={cursoFiles} setCursoFiles={setCursoFiles} webinarFile={webinarFile} setWebinarFile={setWebinarFile} setVideoPlaying={setVideoPlaying}/>
            </div>
            {videoPlaying && <VideoComponent src={URL.createObjectURL(videoPlaying)} autoPlay={true} title={videoPlaying.name} onClose={() => {setVideoPlaying(null); URL.revokeObjectURL(videoPlaying)}} />}
            {errors && <ErrorsPanel errors={errors} close={() => setErrors(null)}/>}
            {advertise && <Modal open={advertise} setOpen={setAdvertise}>
                <span>Se ha añadido un fichero de vídeo que será emitido por streaming, este proceso se está realizando en segundo plano y puede llevar unos minutos. Mientras este proceso se está llevando a cabo, el vídeo no estará disponible para su visualización.
                Disculpe las molestias.
                </span>
                <div style={{width:'100%',textAlign:'center',marginTop:'15px'}}><Button color={'blue'} text={'Ok, lo he entendido'} action={() => {setAdvertise(false); props.router.push('/admin/formacion');}}/></div>
            </Modal>}
        </LayoutAdmin>
    )
}

export default AddCourse;

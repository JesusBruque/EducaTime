import utilsStyles from "../../../styles/Utils.module.css";
import React, {useEffect, useState} from "react";
import moment from "moment";
import Course, {create, uploadCourseFile, validate} from '../../../utils/Course';
import LayoutAdmin from "../../../components/LayoutAdmin";
import VideoComponent from "../../../components/VideoComponent";
import AddCourseForm from "../../../components/cursos/AddCourseForm";
import Button from "../../../components/Button";
import ErrorsPanel from "../../../components/ErrorsPanel";

const AddCourse = (props) => {
    const [cursoInfo,setCursoInfo] = useState(new Course());
    const [errors,setErrors] = useState(null);

    const [cursoFiles,setCursoFiles] = useState({thumbnail:null,video:null});
    const [webinarFile,setWebinarFile] = useState(null);
    const [videoPlaying,setVideoPlaying] = useState(null);


    const CreateCourse = () => {
        validate(cursoInfo).then(() => {
            props.utils.initLoader('Subiendo curso...');
            props.utils.startLoader();
            let uploadThumbnail: Promise<string> = new Promise((resolve, reject) => {
                uploadCourseFile(cursoInfo.title, cursoFiles.thumbnail).then(res => {
                    props.utils.changeTextLoader('Thumbnail subido.');
                    resolve(res.data.location);
                }).catch(err => reject(err));
            });
            let uploadVideo: Promise<string> = new Promise((resolve, reject) => {
                props.utils.changeTextLoader('Subiendo video...');
                uploadCourseFile(cursoInfo.title, cursoFiles.video).then(res => resolve(res.data.location)).catch(err => reject(err));
            });
            let uploadWebinar: Promise<string> = new Promise(((resolve, reject) => {
                if (webinarFile) {
                    uploadCourseFile(cursoInfo.title, webinarFile).then(res => resolve(res.data.location)).catch(err => reject(err))
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
                    props.router.push('/admin/formacion');
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
        </LayoutAdmin>
    )
}

export default AddCourse;

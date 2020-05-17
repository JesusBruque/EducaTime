import LayoutAdmin from "../../../components/LayoutAdmin";
import utilsStyles from "../../../styles/Utils.module.css";
import Button from "../../../components/Button";
import AddCourseForm from "../../../components/cursos/AddCourseForm";
import VideoComponent from "../../../components/VideoComponent";
import ErrorsPanel from "../../../components/ErrorsPanel";
import React, {useState,useEffect} from "react";
import Course, {getCourseById, validate, edit, uploadCourseFile, create} from "../../../utils/Course";
import fetch from "isomorphic-unfetch";

type Props={
    curso:Course
}
const editCurso = (props) => {
    const [cursoInfo,setCursoInfo] = useState(props.curso);
    const [errors,setErrors] = useState(null);

    const [cursoFiles,setCursoFiles] = useState({thumbnail:null,video:null});
    const [webinarFile,setWebinarFile] = useState(null);
    const [videoPlaying,setVideoPlaying] = useState(null);


    const editCourse = () => {
        validate(cursoInfo).then(() => {
            props.utils.initLoader('Editando curso...');
            props.utils.startLoader();
            let uploadThumbnail: Promise<string> = new Promise((resolve, reject) => {
                if(cursoFiles.thumbnail){
                    uploadCourseFile(cursoInfo.title, cursoFiles.thumbnail,false,false).then(res => {
                        props.utils.changeTextLoader('Thumbnail subido.');
                        resolve(res.data.location);
                    }).catch(err => reject(err));
                }else{
                    resolve(cursoInfo.thumbnail);
                }
            });
            let uploadVideo: Promise<string> = new Promise((resolve, reject) => {
                if(cursoFiles.video){
                    props.utils.changeTextLoader('Subiendo video...');
                    uploadCourseFile(cursoInfo.title, cursoFiles.video,true,false).then(res => resolve(res.data.location)).catch(err => reject(err));
                }else{
                    resolve(cursoInfo.video)
                }
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
                props.utils.changeTextLoader('Editando información del curso...');
                edit(cursoInfo).then(() => {
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
        }).catch(errors =>{
            console.log(errors);
            setErrors(errors)
        });
    };
    return (
        <LayoutAdmin router={props.router} user={props.user} setUser={props.setUser} utils={props.utils} selected={'formacion'}>
            <div className={utilsStyles.sectionContainer}>
                <div style={{display:'flex',justifyContent:'space-between',flexWrap:'wrap',alignItems:'center'}}>
                    <h1 className={`${utilsStyles.sectionTitle}`}>Editar Curso</h1>
                    <Button color={'blue'} text={'Guardar curso'} action={editCourse}/>
                </div>
                <AddCourseForm utils={props.utils} cursoInfo={cursoInfo} setCursoInfo={setCursoInfo} cursoFiles={cursoFiles} setCursoFiles={setCursoFiles} webinarFile={webinarFile} setWebinarFile={setWebinarFile} setVideoPlaying={setVideoPlaying}/>
            </div>
            {videoPlaying && <VideoComponent src={typeof videoPlaying === 'string' ? videoPlaying : URL.createObjectURL(videoPlaying)} autoPlay={true} title={videoPlaying.name || 'Preview del curso'} hls={typeof videoPlaying === 'string'} onClose={() => {setVideoPlaying(null);typeof videoPlaying !== 'string' && URL.revokeObjectURL(videoPlaying)}} />}
            {errors && <ErrorsPanel errors={errors} close={() => setErrors(null)}/>}
        </LayoutAdmin>
    )
};
export const getServerSideProps =  async ctx => {
    const res = await fetch('http://localhost:3000/api/course/findById/'+ctx.params.editId);
    const data = await res.json();
    const curso = data.Course;
    return {props:{curso:curso}}
};
export default editCurso;

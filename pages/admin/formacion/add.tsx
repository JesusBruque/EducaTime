import utilsStyles from "../../../styles/Utils.module.css";
import React, {useState} from "react";
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

    const getFormDataCourse = (file,attr) => {
        let data = new FormData();
        data.append('file',file);
        data.append('attribute',attr);
        return data;
    };
    const CreateCourse = () => {
        validate(cursoInfo).then(() => {
            props.utils.initLoader('Subiendo curso...');
            props.utils.startLoader();
            create(cursoInfo).then((res) => {
                console.log(res);
                props.utils.changeTextLoader('Curso subido.');
                let curso = res.data.curso;
                /*--AHORA SUBIMOD THUMBNAIL--*/
                uploadCourseFile(curso._id,getFormDataCourse(cursoFiles.thumbnail,'thumbnail')).then(() => {
                    props.utils.changeTextLoader('Thumbnail subido.');
                    setTimeout(()=> props.utils.changeTextLoader('Subiendo video...'),100);
                    uploadCourseFile(curso._id,getFormDataCourse(cursoFiles.video,'video')).then((res) => {
                        props.utils.changeTextLoader('Video subido.');
                        console.log(res.data.curso);
                        if(webinarFile){
                            uploadCourseFile(curso._id,getFormDataCourse(webinarFile,'webinar')).then(() => {
                                props.utils.removeLoader();
                                props.router.push('/admin/formacion');
                            });
                        }else{
                            props.utils.removeLoader();
                            props.router.push('/admin/formacion');
                        }
                    }).catch(err => {
                        window.alert('ERROR');
                        props.utils.removeLoader();
                    });
                }).catch(err => {
                    window.alert('ERROR');
                    props.utils.removeLoader();
                });
            }).catch(err => {
                window.alert('ERROR');
                props.utils.removeLoader();
            });
        }).catch(errors => {
            setErrors(errors);
        });
    };


    return (
        <LayoutAdmin user={props.user} setUser={props.setUser} router={props.router} selected={'formacion'} utils={props.utils} >
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

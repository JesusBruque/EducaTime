import utilsStyles from "../../../styles/Utils.module.css";
import React, {useState} from "react";
import moment from "moment";
import Course, {create,validate} from '../../../utils/Course';
import LayoutAdmin from "../../../components/LayoutAdmin";
import VideoComponent from "../../../components/VideoComponent";
import AddCourseForm from "../../../components/cursos/AddCourseForm";
import Button from "../../../components/Button";
import ErrorsPanel from "../../../components/ErrorsPanel";

const AddCourse = (props) => {
    const [cursoInfo,setCursoInfo] = useState(new Course());
    const [errors,setErrors] = useState(null);
    const CreateCourse = () => {
        let errors  = validate(cursoInfo);
        if(errors.length > 0){
            setErrors(errors);
            return false
        }
        create(cursoInfo).then((res) => {
            console.log(res);
        }).catch(err => window.alert('ERROR'));
    };

    const [cursoFiles,setCursoFiles] = useState({thumbnail:null,video:null});
    const [webinarFile,setWebinarFile] = useState(null);
    const [videoPlaying,setVideoPlaying] = useState(null);


    return (
        <LayoutAdmin user={props.user} router={props.router} selected={'formacion'}>
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

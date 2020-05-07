import LayoutAdmin from "../../../components/LayoutAdmin";
import utilsStyles from "../../../styles/Utils.module.css";
import Button from "../../../components/Button";
import AddCourseForm from "../../../components/cursos/AddCourseForm";
import VideoComponent from "../../../components/VideoComponent";
import ErrorsPanel from "../../../components/ErrorsPanel";
import React, {useState} from "react";
import {getCourseById} from "../../../utils/Curso";
import Course from "../../../utils/Course";

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
        console.log('editar curso');
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
            {videoPlaying && <VideoComponent src={URL.createObjectURL(videoPlaying)} autoPlay={true} title={videoPlaying.name} onClose={() => {setVideoPlaying(null); URL.revokeObjectURL(videoPlaying)}} />}
            {errors && <ErrorsPanel errors={errors} close={() => setErrors(null)}/>}
        </LayoutAdmin>
    )
};
export const getServerSideProps =  async ctx => {
    const res = await getCourseById(ctx.params.editId);
    const curso = res.data.Course;
    return {props:{curso:curso}}
};
export default editCurso;

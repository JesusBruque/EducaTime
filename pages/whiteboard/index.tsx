import React,{useEffect, useState} from 'react';
import Layout from "../../components/Layout";
import {logout} from "../../utils/Authentication";
import {getCoursesByTeacher} from "../../utils/Course";
import useSWR from 'swr';
import LateralMenu from "../../components/whiteBoard/LateralMenu";
import {getUserData} from '../../utils/Authentication';
import styles from '../../styles/whiteBoard/whiteBoard.module.css';
import CursosContent from "../../components/whiteBoard/CursosContent";
import TareasContent from "../../components/whiteBoard/TareasContent";
import PagosContent from "../../components/whiteBoard/PagosContent";


const userWhiteBoard = (props) => {

    const [userData, setuserData] = useState(null);
    const [contentSelected,setContentSelected] = useState('cursos');
    const [coursesTeaching,setCoursesTeaching] = useState(null);

    const [cursoIndex, setCursoIndex] = useState(0);
    const [teacherCursoIndex,setTeacherCursoIndex] = useState(null);

    const [cargarContenido,setCargarContenido] = useState(false);
    const [contentLoaded,setContentLoaded] = useState(false);
    useEffect(() =>{
        props.utils.initLoader();
        props.utils.startLoader();
        if(props.user){
            getUserData().then(res => {
                if(res.status === 200){
                    props.utils.removeLoader();
                    setContentLoaded(true);
                    setuserData(res.data.user);
                    if(res.data.user.roles.includes('teacher')){
                        getCoursesByTeacher().then(res => {
                            setCoursesTeaching(res.data.cursos);
                        }).catch(err => console.error(err));
                    }
                }else{
                    props.utils.removeLoader();
                    window.alert('ERROR');
                }
            }).catch(err => console.error(err));
        }else{
            props.utils.removeLoader();
            console.log('eee');
            props.router.push('/login');
        }
    },[cargarContenido]);

    const handleChangeContent = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let opt = e.currentTarget.dataset.option;
        let ind = e.currentTarget.dataset.optionIndex;
        setContentSelected(opt);
        setCargarContenido(!cargarContenido);
        if(opt === 'cursos'){
            setTeacherCursoIndex(null);
            if(ind){
                setCursoIndex(+ind);
            }
            if(userData.cursos.length===1){
                setCursoIndex(0);
            }
        }
        if(opt=== 'cursos-teacher'){
            setCursoIndex(null);
            if(ind){
                setTeacherCursoIndex(+ind);
            }
            if(coursesTeaching.length===1){
                setTeacherCursoIndex(0);
            }
        }
    };
    return (
        <Layout user={props.user} setUser={props.setUser} router={props.router} utils={props.utils} whiteboard={true}>
            {userData &&
            <React.Fragment>
                <LateralMenu onClickOption={handleChangeContent} user={userData} optionSelected={contentSelected} teacherCourses={coursesTeaching} cursoIndex={cursoIndex} cursoTeacherIndex={teacherCursoIndex} />
                <div className={styles.mainContainer}>
                    {contentLoaded && contentSelected === 'cursos' && <CursosContent cursoIndex={cursoIndex} cursoTeacherIndex={teacherCursoIndex} cursos={userData.cursos} teacher={false} cargarContenido={cargarContenido} setCargarContenido={setCargarContenido} utils={props.utils} />}
                    {contentLoaded && contentSelected === 'tareas' && <TareasContent/>}
                    {contentLoaded && contentSelected === 'pagos' && <PagosContent />}
                    {contentLoaded && contentSelected === 'cursos-teacher' && <CursosContent cursoIndex={cursoIndex} cursoTeacherIndex={teacherCursoIndex} cursos={coursesTeaching} teacher={true} cargarContenido={cargarContenido} setCargarContenido={setCargarContenido} utils={props.utils}/>}
                    {contentLoaded && contentSelected === 'tareas-teacher' && <TareasContent />}
                </div>
            </React.Fragment>}
            {/*<button onClick={goLogOut}>salir</button>*/}

        </Layout>
    )
};

export default userWhiteBoard;

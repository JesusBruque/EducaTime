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

    const [cursoIndex, setCursoIndex] = useState(null);

    useEffect(() =>{
        if(props.user){
            getUserData().then(res => {
                if(res.status === 200){
                    setuserData(res.data.user);
                    setCursoIndex(res.data.user.cursos.length - 1);
                    if(res.data.user.roles.includes('teacher')){
                        getCoursesByTeacher().then(res => {
                            setCoursesTeaching(res.data.cursos);
                        }).catch(err => console.error(err));
                    }
                }else{
                    window.alert('ERROR');
                }
            }).catch(err => console.error(err));
        }else{
            props.router.push('/login');
        }
    },[]);

    const goLogOut = () => {
        logout().then(() => {
            props.router.push('/login');
            props.setUser(null);
        });
    };

    const handleChangeContent = (e) => {
        e.stopPropagation();
        e.preventDefault();
        let opt = e.currentTarget.dataset.option;
        let ind = e.currentTarget.dataset.optionIndex;
        setContentSelected(opt);
        if(ind){
            setCursoIndex(+ind);
        }else{
            if(opt === 'cursos' && userData.cursos.length===1){
                setCursoIndex(0);
            }else{
                setCursoIndex(null);
            }
        }
    };
    return (
        <Layout user={props.user} setUser={props.setUser} router={props.router} utils={props.utils} whiteboard={true}>
            {userData &&
            <React.Fragment>
                <LateralMenu onClickOption={handleChangeContent} user={userData} optionSelected={contentSelected} teacherCourses={coursesTeaching} cursoIndex={cursoIndex} />
                <div className={styles.mainContainer}>
                    {contentSelected === 'cursos' && <CursosContent cursos={userData.cursos} teacher={false} />}
                    {contentSelected === 'tareas' && <TareasContent/>}
                    {contentSelected === 'pagos' && <PagosContent />}
                    {contentSelected === 'cursos-teacher' && <CursosContent cursos={coursesTeaching} teacher={true} />}
                    {contentSelected === 'tareas-teacher' && <TareasContent />}
                </div>
            </React.Fragment>}
            {/*<button onClick={goLogOut}>salir</button>*/}

        </Layout>
    )
};

export default userWhiteBoard;

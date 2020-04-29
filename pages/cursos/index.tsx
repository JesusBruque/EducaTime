import CursoItem from '../../components/CursoItem'
import fetch from 'isomorphic-unfetch'
import React, {useEffect} from "react";
import Layout from '../../components/Layout'
import CursosUtilities from "../../webUtils/CursosUtilities";
import utilsStyles from '../../styles/Utils.module.css';
import CursoGrid from "../../components/CursosGrid";

const Cursos = (props) =>{

    useEffect(() => {
        let cu = new CursosUtilities('main');
        cu.initCursosScroll().then(() => {
            cu.enterAnimations();
        }).catch(err => console.error(err));
        console.log(props);
    },[]);
    return (
        <Layout router={props.router} user={props.user} setUser={props.setUser}>
            <img src={'https://casor-s3.s3.eu-west-3.amazonaws.com/nguyen-thu-hoai-v0H-vn0BixI-unsplash.jpg'} alt={'imagen'}/>
            <div className={utilsStyles.sectionContainer}>
                <h1 className={utilsStyles.sectionTitle}>Nuestros cursos</h1>
                <div className={utilsStyles.centeredContainer}>
                    <CursoGrid cursos={props.cursos}/>
                </div>
            </div>
        </Layout>
    )
};

export async function getServerSideProps(){
    const res = await fetch('http://localhost:5000/api/course/findAll');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos } }
}

export default Cursos;

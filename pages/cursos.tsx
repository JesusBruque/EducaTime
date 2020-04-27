import CursoItem from '../components/CursoItem'
import fetch from 'isomorphic-unfetch'
import React, {useEffect} from "react";
import Layout from '../components/Layout'
import CursosUtilities from "../webUtils/CursosUtilities";
import utilsStyles from '../styles/Utils.module.css';
import CursoGrid from "../components/CursosGrid";

const Cursos = ({cursos}) =>{

    useEffect(() => {
        let cu = new CursosUtilities('main');
        cu.initCursosScroll().then(() => {
            cu.enterAnimations();
        }).catch(err => console.error(err));
    },[]);
    return (
        <Layout>
            <div className={utilsStyles.sectionContainer}>
                <h1 className={utilsStyles.sectionTitle}>Nuestros cursos</h1>
                <div className={utilsStyles.centeredContainer}>
                    <CursoGrid cursos={cursos}/>
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

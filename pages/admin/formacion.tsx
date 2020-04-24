import Layout from "../../components/Layout";
import CursoGrid from "../../components/CursosGrid";
import fetch from "isomorphic-unfetch";
import React, {useEffect} from "react";
import WebUtils from "../../webUtils/WebUtils";
import utilsStyles from "../../styles/Utils.module.css";

const Formacion = ({cursos}) => {

    return (
        <div className={utilsStyles.sectionContainer}>
            <h1 className={utilsStyles.sectionTitle}>Formación</h1>
            <div className={utilsStyles.centeredContainer}>
                <CursoGrid cursos={cursos}/>
            </div>
        </div>
    )
};

export async function getServerSideProps(){
    const res = await fetch('http://localhost:5000/api/course/findAll');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos }}
}

export default Formacion;

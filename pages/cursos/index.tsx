import CursoItem from '../../components/cursos/CursoItem';
import fetch from 'isomorphic-unfetch'
import React, {useEffect} from "react";
import Layout from '../../components/Layout'
import CursosUtilities from "../../webUtils/CursosUtilities";
import utilsStyles from '../../styles/Utils.module.css';
import CursoGrid from "../../components/cursos/CursosGrid";
import Head from "next/head";

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
            <Head>
                <title>Casor - Cursos de formación</title>
                <meta name={'description'} content={'Casor. Cursos de formación para profesionales del sector deportivo.'}/>
                <link rel="icon" href="/assets/logo.svg"/>
            </Head>
            <div className={utilsStyles.sectionContainer}>
                <h1 className={utilsStyles.sectionTitle}>Nuestros cursos</h1>
                <div className={utilsStyles.centeredContainer}>
                    <CursoGrid cursos={props.cursos} router={props.router} admin={false}/>
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

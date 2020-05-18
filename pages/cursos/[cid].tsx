import {getCourseById} from "../../utils/Course";
import CursoItem from "../../components/cursos/CursoItem"
import Course from "../../utils/Course";
import React, {Dispatch, FunctionComponent, useEffect, useState} from "react";
import {Router} from "next/router";
import Layout from "../../components/Layout";
import {User} from "../../utils/Authentication";
import VideoComponent from "../../components/VideoComponent";
import utilStyles from '../../styles/Utils.module.css';
import Head from "next/head";
import WebUtils from "../../webUtils/WebUtils";
import fetch from "isomorphic-unfetch";
import homeStyles from "../../styles/Home.module.css";
import Footer from "../../components/Footer";

type Props = {
    curso:Course,
    router:Router,
    user:User
    setUser:Dispatch<any>,
    utils:WebUtils
}
const Curso : FunctionComponent<Props> = (props) => {

    useEffect(() => {console.log(props.curso)},[]);
    const [cursoPlaying,setCursoPlaying] = useState(null);
    return (
        <React.Fragment>
            <Head>
                <title>Casor - {props.curso.title}</title>
                <meta name={'description'} content={props.curso.description} key={'description'}/>
                <link rel={'icon'} href={'/assets/logo.svg'}/>
            </Head>
            <Layout router={props.router} user={props.user} setUser={props.setUser} utils={props.utils}>
                <div className={utilStyles.centeredContainer} style={{marginTop:'30px'}}>
                    <CursoItem curso={props.curso} router={props.router} setCursoPlaying={setCursoPlaying} admin={false} reviews={true} fees={true}/>
                </div>
                <section className={homeStyles.homeSection} id={'info-section'}>
                    <div className={homeStyles.casorInfo}>
                        <div className={homeStyles.casorInfoItem} data-scroll data-scroll-speed={1} data-scroll-delay={0.04}>
                            <img src={'/assets/icons/calendar.svg'} alt={'icono de calendario'}/>
                            <div>
                                <span>Pago a plazos</span>
                                <span>En Academia Casor pagar por plazos es posible. Alguno de nuestros cursos cuentan con esta opción, accediendo al contenido de manera escalonada.</span>
                            </div>
                        </div>
                        <div className={homeStyles.casorInfoItem}  data-scroll data-scroll-speed={1} data-scroll-delay={0.04}>
                            <img src={'/assets/icons/graduated.svg'} alt={'icono de graduación'}/>
                            <div>
                                <span>Evaluación y certificación</span>
                                <span>Al finalizar cada curso, los profesores pondrán a prueba lo aprendido durante el curso por parte de los alumnos  y certificarán los conocimientos adquiridos de los mismos.</span>
                            </div>
                        </div>
                        <div className={homeStyles.casorInfoItem}  data-scroll data-scroll-speed={1} data-scroll-delay={0.04}>
                            <img src={'/assets/icons/education.svg'} alt={'icono de profesores'}/>
                            <div>
                                <span>Profesores</span>
                                <span>Nuestros profesores se encargarán  de gestionar los bloques de contenido proporcionando el mejor aprendizaje.</span>
                            </div>
                        </div>
                        <div className={homeStyles.casorInfoItem}  data-scroll data-scroll-speed={1} data-scroll-delay={0.04}>
                            <img src={'/assets/icons/to-do.svg'} alt={'icono de tareas'}/>
                            <div>
                                <span>Tareas</span>
                                <span>El seguimiento con tareas facilitaran al alumno a asentar los conceptos de la materia impartida.</span>
                            </div>
                        </div>

                    </div>
                    <div className={homeStyles.movilContent} data-scroll data-scroll-speed={2} data-scroll-delay={0.06}>
                        <img src={'/assets/landing/movil_web.png'} alt={'imagen de casor en el móvil'}/>
                        <h4>Accede desde cualquier dispositivo</h4>
                    </div>
                </section>
                <Footer />
                {cursoPlaying && <VideoComponent src={cursoPlaying.video} onClose={() => setCursoPlaying(null)} title={cursoPlaying.title}/>}
            </Layout>
        </React.Fragment>
    )
};

export const getServerSideProps =  async ctx => {
    const res = await fetch('http://localhost:3000/api/course/findById/'+ctx.params.cid);
    const data = await res.json();
    const curso = data.Course;
    return {props:{curso:curso}}
};
export default Curso;

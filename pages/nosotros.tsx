import Layout from "../components/Layout";
import styles from '../styles/Nosotros.module.css';
import Head from "next/head";
import utilsStyles from "../styles/Utils.module.css";
import React, {useEffect, useState} from "react";
import Footer from "../components/Footer";
const Nosotros =(props) => {
    const [mobile,setMobile] = useState(null);
    useEffect(() => {
        setMobile(document.querySelector('main>div').getBoundingClientRect().height < window.innerHeight);
    },[])
    return (
        <Layout router={props.router} user={props.user} setUser={props.setUserr} utils={props.utils}>
            <Head>
                <title>Casor - Sobre Casor</title>
                <meta name={'description'} content={'Casor. Cursos de formación para profesionales del sector deportivo.'}/>
                <link rel="icon" href="/assets/logo.svg"/>
            </Head>
            <div className={`${utilsStyles.sectionContainer} ${styles.container}`}>
                <div className={`${utilsStyles.centeredContainer} ${styles.nosotrosContainer}`}>
                    <div className={styles.imagen}>
                        <img src={'/assets/landing/balon_portada.jpg'} alt={'imagen futbolista'} className={styles.imagen}/>
                    </div>
                    <div className={styles.content}>
                        <h1 className={utilsStyles.sectionTitle}>Sobre <span>CASOR</span></h1>
                        <p><b style={{color:'var(--main-color)'}}>Casor Academia de Formación</b>, somos un centro de enseñanzas deportivas que persigue e implementa un método de <b>enseñanza diferenciado.</b></p>
                        <p>Los principios que promovemos y la experiencia que nos determina, hacen que se formen los <b>futuros entrenadores</b> siguiendo los parámetros que evolucionan día a día dentro del fútbol, buscando no sólo especialistas, sino también <b>futuros profesionales.</b></p>
                        <p>En <b>CASOR Academia de Formación</b>, buscamos una enseñanza personalizada, haciendo que nuestros alumnos puedan aprovechar al máximo sus capacidades y aptitudes humanas. </p>
                        <p>Nuestro <b>profesorado está altamente cualificado,</b> tanto académica como pedagógicamente. Dicho profesorado cuenta con unos conocimientos <b>teórico-científicos,</b> que conseguirá aportar al alumnado, así como su gran experiencia deportiva.  </p>
                        <p>Desde <b>Casor Academia de Formación</b> esperamos ser un centro, donde toda la comunidad profesional se vea beneficiada de nuestro <b>trabajo y profesionalidad.</b></p>
                        <p>Contacta con nosotros y te ayudaremos a conseguir tus sueños.</p>
                    </div>
                </div>
            </div>
            <Footer absolute={mobile}/>
        </Layout>
    )
};

export default Nosotros;

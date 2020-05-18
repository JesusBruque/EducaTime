import React from 'react';
import Layout from "../components/Layout";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEnvelope, faMobile} from "@fortawesome/free-solid-svg-icons";
import styles from '../styles/Contacto.module.css';
import Footer from "../components/Footer";

const Contacto = (props) => {
    return (
        <Layout router={props.router} user={props.user} setUser={props.setUser} utils={props.utils}>
            <section className={styles.container}>
                <h3 className={styles.contactTitle}>¡Encantados de conocerte!</h3>
                <p>Bienvenido a nuestra academia, si tienes alguna duda puedes ponerte en contacto con nosotros.</p>
                <div className={styles.contactInfo}>
                    <div>
                        <FontAwesomeIcon icon={faEnvelope} style={{color:'var(--main-color)',height:'1.2em'}}/>
                        <a href={"mailto:administracion@academiaformaciondeportiva.com"}>
                            <span>administracion@academiaformaciondeportiva.com</span>
                        </a>
                    </div>
                    <div>
                        <FontAwesomeIcon icon={faMobile} style={{color:'var(--main-color)',height:'1.2em'}}/>
                        <div className={styles.numbers}>
                            <span>+34 689 123 132</span>
                            <span>+34 689 123 132</span>
                        </div>
                    </div>
                </div>
            </section>
            <Footer absolute={true}/>
        </Layout>
    )
};

export default Contacto;

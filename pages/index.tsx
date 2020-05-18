import React, {useEffect} from 'react';
import Head from 'next/head'
import Layout from "../components/Layout";
import homeStyles from '../styles/Home.module.css';
import WebUtils from "../webUtils/WebUtils";
import Button from "../components/Button";
import fetch from "isomorphic-unfetch";
import CursoMobile from "../components/cursos/CursoMobile";
import Field from "../components/Field";
import Footer from "../components/Footer";

const Home = (props) => {

    useEffect(() => {
        let lu = new WebUtils('main');
        lu.initScroll().then(() => {
            lu.enterHomeAnimations();
            lu.initHomeScrollAnimations();
        });
    },[]);

    return (
      <div>
          <Head>
              <title>Casor. Academia de formación</title>
              <meta name={'description'} content={'Casor. Academia de formación deportiva especializada en cursos para entrenadores de fútbol.'}/>
              <link rel="icon" href="/assets/logo.svg"/>
          </Head>
          <Layout user={props.user} router={props.router} setUser={props.setUser} utils={props.utils}>
              <section className={homeStyles.homeSection} id={'welcome-section'}>
                  <div id={'fixed-field'} className={homeStyles.fixedTarget} style={{top:'-70px',height:'160vh'}}></div>
                  <div className={homeStyles.field} data-scroll data-scroll-sticky data-scroll-target={'#fixed-field'}>
                      <div className={homeStyles.fieldContainer}>
                          <Field/>
                      </div>
                  </div>
                  <div className={homeStyles.mainClaimer} id={'welcome-claimer'}>
                      <h1 className={`${homeStyles.mainTitle} title`}>El fútbol profesional<br/> al alcance de todos</h1>
                      <p data-scroll data-scroll-speed={2} style={{opacity:'0'}}>Disfruta de la formación online flexible y de calidad, una oportunidad para progresar con los mejores</p>
                      <div data-scroll data-scroll-speed={3} className={homeStyles.startBtn} id={'welcome-start--btn'}>
                          <Button text={'Comienza ya'} color={'blue'} action={()=> props.router.push('/cursos')} styles={{opacity:'0'}}/>
                      </div>
                  </div>
              </section>
              <section className={`${homeStyles.homeSection}`} id={'cursos-section'}>
                  <div className={homeStyles.claimerContainer}>
                      <div className={homeStyles.cursoClaimer} data-scroll data-scroll-position='bottom' data-scroll-offset={'50'}>
                          <h2>Accede ya a nuestros cursos.</h2>
                          <p>Únete a nuestra comunidad con la compra de uno de nuestros cursos, y disfruta ya de las ventajas.</p>
                      </div>
                      <div>
                          <div className={homeStyles.cursosGrid} id={'grid-cursos'}>
                              <CursoMobile curso={props.cursos}/>
                              <CursoMobile curso={props.cursos}/>
                              <CursoMobile curso={props.cursos}/>
                          </div>
                      </div>
                  </div>
              </section>
              <section className={`${homeStyles.homeSection} ${homeStyles.valors}`} id={'valors-section'} data-scroll data-scroll-offset={'bottom'}>
                  <div id={'fixed-target'} className={homeStyles.fixedTarget}></div>
                  <div className={homeStyles.backgroundSection} data-scroll data-scroll-sticky data-scroll-target={'#fixed-target'}>
                      <img src={'/assets/landing/porteria_bg.jpg'} alt={'fondo de una porteria'}/>
                  </div>
                  <h3 data-scroll data-scroll-speed={2} data-scroll-delay={0.06}>¿Por qué elegir <span style={{color:'var(--main-color)'}}>Academia Casor</span>?</h3>
                  <div className={homeStyles.valorsItems}>
                      <div className={homeStyles.valorsItemsItem} data-scroll data-scroll-speed={1} data-scroll-delay={0.04}>
                          <img src={'/assets/landing/porteria.svg'} alt={'icono de una porteria'}/>
                          <div>
                              <span className={homeStyles.valorsTitle}>Cooperación:</span>
                              <span>Sentimiento de pertenencia y confianza, potenciando el talento colectivo y compartiendo conocimientos.</span>
                          </div>
                      </div>
                      <div className={homeStyles.valorsItemsItem} data-scroll data-scroll-speed={1} data-scroll-delay={0.04}>
                          <img src={'/assets/landing/conos.svg'} alt={'icono de un cono'}/>
                          <div>
                              <span className={homeStyles.valorsTitle} >Pasión:</span>
                              <span>Dedicando nuestro tiempo a satisfacer las necesidades de nuestros alumnos/as, asegurando el desarrollo a través de oportunidades basadas en la aportación profesional y el cumplimiento de expectativas</span>
                          </div>
                      </div>
                      <div className={homeStyles.valorsItemsItem} data-scroll data-scroll-speed={1} data-scroll-delay={0.04}>
                          <img src={'/assets/landing/corner.svg'} alt={'icono de un corner'}/>
                          <div>
                              <span className={homeStyles.valorsTitle}>Profesionalidad:</span>
                              <span>Trabajos realizados por entrenadores cualificados y con experiencia, en el fútbol profesional</span>
                          </div>
                      </div>
                      <div className={homeStyles.valorsItemsItem} data-scroll data-scroll-speed={1} data-scroll-delay={0.05}>
                          <img src={'/assets/landing/marcador.svg'} alt={'icono de una porteria'}/>
                          <div>
                              <span className={homeStyles.valorsTitle}>Innovación:</span>
                              <span>Promoviendo las formaciones continuas en el plano académico para alcanzar la máxima calidad en la formación continua del alumnado</span>
                          </div>
                      </div>
                      <div className={homeStyles.valorsItemsItem} data-scroll data-scroll-speed={1} data-scroll-delay={0.05}>
                          <img src={'/assets/landing/banquillo.svg'} alt={'icono de un banquillo'}/>
                          <div>
                              <span className={homeStyles.valorsTitle}>Calidad:</span>
                              <span>Buscando la excelencia a través de la implantación de nuevas herramientas educativas y procesos de evaluación, utilizando las nuevas tecnologías y tendencias en el deporte</span>
                          </div>
                      </div>
                  </div>
              </section>
              <section className={homeStyles.homeSection} id={'info-section'} style={{height:'120vh'}}>
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

              <Footer/>Ç
          </Layout>

          <script noModule src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.6.0/polyfill.min.js"
                  crossOrigin="anonymous" />
          <script noModule
                  src="https://polyfill.io/v3/polyfill.min.js?features=Object.assign%2CElement.prototype.append%2CNodeList.prototype.forEach%2CCustomEvent%2Csmoothscroll"
                  crossOrigin="anonymous" />
      </div>
  )
};
export async function getServerSideProps(){
    const res = await fetch('http://localhost:3000/api/course/findById/5ec15b2dafc0b12beb10c55c');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos } }
}
export default Home;

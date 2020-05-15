import React, {useEffect} from 'react';
import Head from 'next/head'
import Layout from "../components/Layout";
import homeStyles from '../styles/Home.module.css';
import gsap from 'gsap';
import Entrada from "../components/Entrada";
import WebUtils from "../webUtils/WebUtils";
import LayoutAdmin from "../components/LayoutAdmin";
import Button from "../components/Button";
import fetch from "isomorphic-unfetch";
import CursoMobile from "../components/cursos/CursoMobile";

const Home = (props) => {


    useEffect(() => {
        let lu = new WebUtils('main');
        lu.removeLoader();
        gsap.to('#cortina-entrada img',{opacity:0,duration:.4});
        gsap.to('#cortina-entrada',{duration:1.5,transformOrigin:'bottom',scaleY:0,ease:'power2.inOut',onComplete: () => {
                lu.initScroll().then(() => {
                    lu.showHeader();
                    lu.enterHomeAnimations();
                    lu.initHomeScrollAnimations();

                    /*--- ALTO GRID VALORES ---*/
                    // let ac = document.querySelector('#main_field').getBoundingClientRect().height;
                    // let t =  ac*0.4;
                    // console.log(ac);
                    // document.getElementById('valorsGrid').style.gridTemplateRows = `${ac/2.3}px minmax(215px,min-content)`;
                    // document.getElementById('valorsGrid').style.top = `${t}px`;
                });
            }});
        console.log(props.cursos);
    },[]);

    return (
      <div style={{perspective:'2000px',perspectiveOrigin:'center'}}>
          <Head>
              <title>Casor. Academia de formación</title>
              <meta name={'description'} content={'Casor. Academia de formación deportiva especializada en cursos para entrenadores de fútbol.'}/>
              <link rel="icon" href="/assets/logo.svg"/>
          </Head>
          <Entrada />
          <Layout user={props.user} router={props.router} setUser={props.setUser} utils={props.utils}>
              <section className={homeStyles.homeSection} id={'welcome-section'}>
                  <div className={homeStyles.portadaImage}>
                      <img src={'/assets/landing/balon_portada.jpg'} alt={'foto de portada'}/>
                  </div>
                  <div className={homeStyles.mainClaimer}>
                      <h1 className={`${homeStyles.mainTitle} title`}>El fútbol profesional al alcance de todos</h1>
                      <p data-scroll data-scroll-speed={2}>Disfruta de la formación online flexible y de calidad, una oportunidad para progresar con los mejores</p>
                      <div data-scroll data-scroll-speed={3} className={homeStyles.startBtn}>
                          <Button text={'Comienza ya'} color={'blue'} action={()=> props.router('/cursos')} />
                      </div>
                  </div>
              </section>
              <section className={homeStyles.homeSection}>
                  <div className={homeStyles.cursoClaimer}>
                      <h2>Accede ya a nuestros cursos.</h2>
                      <p>Únete a nuestra comunidad con la compra de uno de nuestros cursos, y disfruta ya de las ventajas, hazme CASOR.</p>
                  </div>
                  <div>
                      <div className={homeStyles.cursosGrid}>
                          <CursoMobile curso={props.cursos}/>
                          <CursoMobile curso={props.cursos}/>
                          <CursoMobile curso={props.cursos}/>
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
                              <span className={homeStyles.valorsTitle}>Cooperación:</span>
                              <span>Buscando la excelencia a través de la implantación de nuevas herramientas educativas y procesos de evaluación, utilizando las nuevas tecnologías y tendencias en el deporte</span>
                          </div>
                      </div>
                  </div>
              </section>
              <footer data-scroll data-scroll-sticky data-scroll-target={'#valors-section'}>
                  <div className={'legal-info'}>
                      <span>términos y condiciciones</span>
                      <span>aviso legal</span>
                  </div>
                  <div>
                      <span>&copy;Todos los derechos reservados CASOR SL.</span>
                  </div>
                  <div>
                      <a href={'#'} target={'_blank'}>
                          <img src={'/assets/icons/instagram-icon.svg'} alt={'icono de instagram'} />
                      </a>
                      <a href={'#'} target={'_blank'}>
                          <img src={'/assets/icons/twitter-icon.svg'} alt={'icono de twitter'} />
                      </a>
                      <a href={'#'} target={'_blank'}>
                          <img src={'/assets/icons/facebook-icon.svg'} alt={'icono de facebook'} />
                      </a>
                  </div>
              </footer>
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
    const res = await fetch('http://localhost:3000/api/course/findById/5ebe5b126d5f7c27fee434e7');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos } }
}
export default Home

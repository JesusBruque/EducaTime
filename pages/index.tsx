import React, {useEffect} from 'react';
import Head from 'next/head'
import Layout from "../components/Layout";
import homeStyles from '../styles/Home.module.css';
import LandingUtilities from "../webUtils/LandingUtilities";
import gsap from 'gsap';
import Field from "../components/Field";

const Home = () => {

    useEffect(() => {
        gsap.to('#cortina-entrada img',{opacity:0,duration:.4});
        gsap.to('#cortina-entrada',{duration:1.5,transformOrigin:'bottom',scaleY:0,ease:'power2.inOut',onComplete: () => {
                let lu = new LandingUtilities('main');
                lu.initHomeScroll().then(() => {
                    lu.enterAnimations();
                    lu.initScrollAnimations();

                    /*--- ALTO GRID VALORES ---*/
                    let ac = document.querySelector('#main_field').getBoundingClientRect().height;
                    let t =  ac*0.4;
                    console.log(ac);
                    document.getElementById('valorsGrid').style.gridTemplateRows = `${ac/2.3}px minmax(215px,min-content)`;
                    document.getElementById('valorsGrid').style.top = `${t}px`;
                });
            }});
    },[]);

    return (
      <div style={{perspective:'2000px',perspectiveOrigin:'center'}}>
          <Head>
              <title>Casor. Academia de formación</title>
              <meta name={'description'} content={'Casor. Academia de formación deportiva especializada en cursos para entrenadores de fútbol.'}/>
              <link rel="icon" href="/assets/logo.svg"/>

          </Head>
          <Layout>
              <section className={homeStyles.welcomeSection} id={'welcome-section'}>
                  <h1 className={`${homeStyles.mainTitle} title`}>El fútbol profesional<br/> al alcance de todos</h1>
                  <div  data-scroll data-scroll-sticky data-scroll-target={'main'} className={homeStyles.startBtn}>
                      <button className={`csr-btn transparent`}>Comienza Ya</button>
                  </div>
              </section>
              <section id={'secondSection'} className={homeStyles.secondSection}>
                  <div className={homeStyles.levelSection} data-scroll data-scroll-sticky data-scroll-target={'#secondSection'}>
                      <div className={homeStyles.levelItem} id={'level-1'} style={{gridArea:'1/1'}}>
                          <div className={homeStyles.title}>Nivel I</div>
                          <div className={homeStyles.subtitle}>Entrenador de fútbol</div>
                          <p className={homeStyles.description}>
                              Dedicando nuestro tiempo a satisfacer las necesidades de nuestros alumnos/as,
                              asegurando el desarrollo a través de oportunidades basadas en la aportación profesional y el cumplimiento de expectativas
                          </p>
                      </div>
                      <img src={'assets/level-right-arrow.svg'} alt={'flecha indicadora de avance'} className={homeStyles.levelRightArrow}/>
                      <div className={homeStyles.levelItem} id={'level-2'} style={{gridArea:'2/2'}}>
                          <div className={homeStyles.title}>Nivel II</div>
                          <div className={homeStyles.subtitle}>Entrenador de fútbol</div>
                          <p className={homeStyles.description}>
                              Dedicando nuestro tiempo a satisfacer las necesidades de nuestros alumnos/as,
                              asegurando el desarrollo a través de oportunidades basadas en la aportación profesional y el cumplimiento de expectativas
                          </p>
                      </div>
                      <img src={'assets/level-down-arrow.svg'} alt={'flecha indicadora de avance'} className={homeStyles.levelDownArrow}/>
                      <div className={homeStyles.levelItem} id={'level-3'} style={{gridArea:'3/3'}}>
                          <div className={homeStyles.title}>Nivel III</div>
                          <div className={homeStyles.subtitle}>Entrenador de fútbol</div>
                          <p className={homeStyles.description}>
                              Dedicando nuestro tiempo a satisfacer las necesidades de nuestros alumnos/as,
                              asegurando el desarrollo a través de oportunidades basadas en la aportación profesional y el cumplimiento de expectativas
                          </p>
                      </div>
                  </div>
              </section>

              <section id={'thirdSection'} className={homeStyles.valorSection}>
                  <div data-scroll data-scroll-sticky data-scroll-target={'#thirdSection'} className={homeStyles.valorsGrid} id={'valorsGrid'}>
                      <img src={'assets/line-coop.svg'} alt={'linea indicadora de un valor'} style={{gridArea:'1/2'}}/>
                      <div style={{gridArea:'1/1',textAlign:'right'}} className={'val_right'}>
                          <div className={homeStyles.subtitle}>COOPERACIÓN:</div>
                          <div className={homeStyles.description}>
                              Sentimiento de pertenencia y confianza, potenciando el talento colectivo y compartiendo conocimientos
                          </div>
                      </div>

                      <img src={'assets/line-cal.svg'} alt={'linea indicadora de un valor'} style={{gridArea:'1/4'}}/>
                      <div style={{gridArea:'1/5'}} className={'val_left'}>
                          <div className={homeStyles.subtitle}>CALIDAD:</div>
                          <div className={homeStyles.description}>
                              Buscando la excelencia a través de la implantación de nuevas herramientas educativas y procesos de evaluación, utilizando las nuevas tecnologías y tendencias en el deporte
                          </div>
                      </div>

                      <img src={'assets/line-prof.svg'} alt={'linea indicadora de un valor'}  style={{gridArea:'2/4',justifySelf:'end',alignSelf:'center'}}/>
                      <div  style={{gridArea:'2/5',alignSelf:'center'}} className={'val_left'}>
                          <div className={homeStyles.subtitle}>Profesionalidad:</div>
                          <div className={homeStyles.description}>
                              Trabajos realizados por entrenadores cualificados y con experiencia, en el fútbol profesional
                          </div>
                      </div>

                      <img src={'assets/line-pas.svg'} alt={'linea indicadora de un valor'}  style={{gridArea:'2/3',alignSelf:'center',justifySelf:'end'}}/>
                      <div  style={{gridArea:'2/3',justifySelf:'start', alignSelf:'end'}} className={'val_center'}>
                          <div className={homeStyles.subtitle}>PASIÓN:</div>
                          <div className={homeStyles.description}>
                              Dedicando nuestro tiempo a satisfacer las necesidades de nuestros alumnos/as, asegurando el desarrollo a través de oportunidades basadas en la aportación profesional y el cumplimiento de expectativas
                          </div>
                      </div>

                      <img src={'assets/line-inn.svg'} alt={'linea indicadora de un valor'}  style={{gridArea:'2/2'}}/>
                      <div  style={{gridArea:'2/1',alignSelf:'center',textAlign:'right'}} className={'val_right'}>
                          <div className={homeStyles.subtitle}>INNOVACIÓN:</div>
                          <div className={homeStyles.description}>
                              Promoviendo las formaciones continuas en el plano académico para alcanzar la máxima calidad en la formación continua del alumnado
                          </div>
                      </div>
                  </div>
              </section>
          </Layout>

          <Field />

          <script noModule src="https://cdnjs.cloudflare.com/ajax/libs/babel-polyfill/7.6.0/polyfill.min.js"
                  crossOrigin="anonymous" />
          <script noModule
                  src="https://polyfill.io/v3/polyfill.min.js?features=Object.assign%2CElement.prototype.append%2CNodeList.prototype.forEach%2CCustomEvent%2Csmoothscroll"
                  crossOrigin="anonymous" />
      </div>
  )
};

export default Home

import React, {useEffect} from 'react';
import Head from 'next/head'
import Layout from "../components/Layout";
import homeStyles from '../styles/Home.module.css';
import gsap from 'gsap';
import Field from "../components/Field";
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
              <section className={homeStyles.welcomeSection} id={'welcome-section'}>
                  <div>
                  </div>
                  <div>
                      <h1 className={`${homeStyles.mainTitle} title`}>El fútbol profesional<br/> al alcance de todos</h1>
                      <p>Disfruta de la formación online flexible y de calidad, una oportunidad para progresar con los mejores</p>
                      <div  data-scroll data-scroll-sticky data-scroll-target={'main'} className={homeStyles.startBtn}>
                          <Button text={'Comineza ya'} color={'blue'} action={()=> props.router('/cursos')} />
                      </div>
                  </div>
              </section>
              <section>
                  <div>
                      <h2>Accede ya a nuestros cursos.</h2>
                      <p>Únete a nuestra comunidad con la compra de uno de nuestros cursos, y disfruta ya de las ventajas, hazme CASOR.</p>
                  </div>
                  <div>
                      <div>
                          <CursoMobile curso={props.cursos}/>
                          <CursoMobile curso={props.cursos}/>
                          <CursoMobile curso={props.cursos}/>
                      </div>
                  </div>
              </section>
              <section>
                  <div>
                      <div>
                          <img src={'/assets/icons/calendar.svg'} alt={'icono de calendario'}/>
                          <div>
                              <span>Pago a plazos</span>
                              <span>En Academia Casor pagar por plazos es posible. Alguno de nuestros cursos cuentan con esta opción, accediendo al contenido de manera escalonada.</span>
                          </div>
                      </div>
                      <div>
                          <img src={'/assets/icons/graduated.svg'} alt={'icono de graduación'}/>
                          <div>
                              <span>Evaluación y certificación</span>
                              <span>Al finalizar cada curso, los profesores pondrán a prueba lo aprendido durante el curso por parte de los alumnos  y certificarán los conocimientos adquiridos de los mismos.</span>
                          </div>
                      </div>
                      <div>
                          <img src={'/assets/icons/education.svg'} alt={'icono de profesores'}/>
                          <div>
                              <span>Profesores</span>
                              <span>Nuestros profesores se encargarán  de gestionar los bloques de contenido proporcionando el mejor aprendizaje.</span>
                          </div>
                      </div>
                      <div>
                          <img src={'/assets/icons/to-do.svg'} alt={'icono de tareas'}/>
                          <div>
                              <span>Tareas</span>
                              <span>El seguimiento con tareas facilitaran al alumno a asentar los conceptos de la materia impartida.</span>
                          </div>
                      </div>
                  </div>
                  <div>
                      <img src={'/assets/landing/movil_web.png'} alt={'imagen de casor en el móvil'}/>
                      <h4>Accede desde cualquier dispositivo</h4>
                  </div>
              </section>
              <section>
                  <h3>¿Por qué elegir <span>Academia Casor</span>?</h3>
              </section>
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
    const res = await fetch('http://localhost:3000/api/course/findById/5ebd2d4c1474d90c2c7f5932');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos } }
}
export default Home

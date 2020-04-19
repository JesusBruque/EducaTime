import Course from '../components/Course'
import fetch from 'isomorphic-unfetch'
import {useEffect} from "react";
import Layout from '../components/Layout'
import panelStyles from "../styles/Courses.module.css";

const Cursos = ({cursos}) =>{
    return (
        <div>
            <Layout>
                <div className = {panelStyles.panel}>
                    <p className={panelStyles.titulo} >Nuestros Artìculos</p>
                    {cursos.map(curso => {
                        return <Course curso={curso}/>
                    })}
                </div>
            </Layout>
        </div>
    )
};

export async function getServerSideProps(){
    const res = await fetch('http://localhost:5000/api/course/findAll');
    const data = await res.json();
    const cursos = data.Course;
    return { props: { cursos } }
}
// Cursos.getInitialProps = async function(){
//     const res = await fetch('http://localhost:5000/api/course/findAll');
//     console.log(res.type+" sanaco");
//     const data = await res.json();
//
//     console.log(`Show data fetched. Count: ${data.length}`);
//
//     return {
//       props: res
//     };
//
// };
export default Cursos;

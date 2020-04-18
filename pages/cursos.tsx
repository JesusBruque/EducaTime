import Course from '../components/Course'
import Header from '../components/Header';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'
import {useEffect} from "react";

const panel={
    width:"55%"
}
const Cursos = ({cursos}) =>{

    return (
        <div>
            <Header/>
            <p>Nuestros Artìculos</p>
            {cursos.map(curso => {
                return <Course curso={curso}/>
            })}
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

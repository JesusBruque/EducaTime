import Course from '../components/Course'
import Header from '../components/Header';
import Link from 'next/link';
import fetch from 'isomorphic-unfetch'

const panel={
    width:"55%"
}
const Cursos = () =>{
    return (
        <div>
            <Header/>
            <div style={panel}>
                <p>Nuestros Artìculos</p>
                <ul>
                    <Course/>
                    {/* {props.shows.map(show => (
                        <li key={show.id}>
                             <a>{show.name}</a>
                        </li>
                    ))} */}
                </ul>
            </div>
            <p>Hola papo</p>
        </div>
    )
};

export default Cursos;
// Cursos.getInitialProps = async function(){
//     const res = await fetch('http://localhost:5000/api/course/findAll');
//     console.log(res.type+" sanaco");
//     const data = await res.json();
  
//     console.log(`Show data fetched. Count: ${data.length}`);
  
//     return {
//       cursitos: data.map(entry => entry.curso)
//     };

// };
// export default Cursos;
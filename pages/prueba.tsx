import GridItem from '../components/GridItem'
import PhotoItem from '../components/PhotoItem'
import Cuerpo from '../components/Cuerpo'
import BlogDetalle from '../components/BlogDetalle';
import Layout from '../components/Layout';
import blogVista from '../styles/BlogVista.module.css'

const Prueba = () =>{
    return (
        <Layout>
            <div className={blogVista.panel}>
                <BlogDetalle blog = ""/>
            </div>
        </Layout>
    )
};

export default Prueba;

    
{/* <GridItem horizontal={false} proporcion={"57"} cabecerita={<Photo url={blog.thumbnail}/>} cuerpito={<Cuerpo titulo={blog.title} descripcion={blog.description} anchoTitulo={"10"}/>}/> */}
        
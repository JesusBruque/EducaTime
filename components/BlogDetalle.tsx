import blogVista from '../styles/BlogVista.module.css'
import GridItem from './GridItem';
import PhotoItem from './PhotoItem';
import Cuerpo from './Cuerpo';
import TituloEspecialBlog from './TituloEspecialBlog'

const BlogDetalle = ({blog}) =>{
    let panel = {
        width:"80%",
    }
    return (
        <div>
            <GridItem horizontal= {false} aspect= {null} proporcion = {"43"} cabecerita={<PhotoItem url={blog.thumbnail}/>} cuerpito = {
            <Cuerpo titulo={<TituloEspecialBlog blog = {blog}/>}
                    descripcion={
                <div className={blogVista.p}> 
                    {blog.description}
                </div>}
                     anchoTitulo={"80"}
                     final = {null}/>}/>

        </div>
    )
};
export default BlogDetalle;
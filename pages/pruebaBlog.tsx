import BlogDetalle from '../components/blog/BlogDetalle';
import Layout from '../components/Layout';
import blogVista from '../styles/BlogVista.module.css'

const Prueba = ({blog}) =>{
    return (
        <Layout>
            <div className={blogVista.panel}>
                <BlogDetalle blog = {blog}/>
            </div>
        </Layout>
    )
};

export default Prueba;   

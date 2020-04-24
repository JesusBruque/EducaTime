import blogStyle from '../styles/Blog.module.css'
import moment from "moment";
import Photo from './PhotoItem'
import Cuerpo from './Cuerpo'
import GridItem from './GridItem'

const BlogItem=({blog, admin})=>{
    const handleEdit = () => {
        console.log('editar ', blog);
    };
    const handleDelete = () => {
        console.log('eliminar ', blog);
    }
    return (
        <div className={`${blogStyle.caja} blog-item ${admin ? blogStyle.adminItem : ''}`}>
        
            <div className={blogStyle.foto}>
                <img src={blog.thumbnail} width="100%" height="100%"/>
            </div>
            <div className={blogStyle.contenido}>
                <div className={blogStyle.descripcion}>
                    <div className={blogStyle.titulo}>
                        {blog.title}
                    </div>
                    <div className={blogStyle.comentario}>
                        {blog.description}
                    </div>
                </div>
                <div className={blogStyle.info}>
                    <div className={blogStyle.autor}>
                        {blog.author}
                    </div>
                    <div className={blogStyle.fecha}>
                        {moment(blog.creation_date).format('DD MMMM YYYY')}
                    </div>
                </div>
            </div>
            {
                admin &&
                    <div className={blogStyle.actionPanel}>
                        <img src={'/assets/icons/edit.svg'} alt={'icono de editar'} onClick={handleEdit}/>
                        <img src={'/assets/icons/delete.svg'} alt={'icono de eliminar'} onClick={handleDelete}/>
                    </div>
            }
        </div>
        )
};
// export async function getStaticProps(id){
//     const res = await fetch('http://localhost:5000/api/blog/findById/'+id.toString());
//     const data = await res.json();
//     const blogs = data.Blog;
//     return { props: { blogs } }
// }

export default BlogItem;

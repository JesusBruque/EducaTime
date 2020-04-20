import Link from 'next/link';
import blogStyle from '../styles/Blog.module.css'

const Blog=({blog})=>{
    return (
        <div className={blogStyle.wrapper}>
            <div className={blogStyle.caja}>
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
                            {blog.creation_date}
                        </div>
                    </div>
                </div>
            </div>
        </div>)
};

export default Blog;
import blogStyle from '../../styles/Blog.module.css'
import moment from "moment";
import React from 'react';
import Link from 'next/link';
import Blog,{deleteBlog} from '../../utils/Blog';
import WebUtils from "../../webUtils/WebUtils";
import {Router} from "next/router";
type Props = {
    blog:Blog,
    admin:boolean,
    utils?:WebUtils,
    router:Router
}
const BlogItem = (props) =>{
    const {blog,admin,utils} = props;
    const handleDelete = () => {
        if(utils){
            utils.initLoader();
            utils.startLoader();
            deleteBlog(blog._id).then(() => {
                utils.removeLoader();
                props.router.reload();
            }).catch(() => {
                utils.removeLoader();
            });
        }
    };
    const goToDetail = () => {
        if(!admin){
            props.router.push('/blog/'+blog._id);
        }
    };
    return (
            <div className={`${blogStyle.caja} blog-item ${admin ? blogStyle.adminItem : ''}`} onClick={goToDetail}>
                <div className={blogStyle.foto}>
                    <img src={blog.thumbnail} alt={'imagen del blog'}/>
                </div>
                <div className={blogStyle.contenido}>
                    <div className={blogStyle.descripcion}>
                        <div className={blogStyle.titulo}>
                            {blog.title}
                        </div>
                        <div className={blogStyle.subtitulo}>
                            {blog.subtitle}
                        </div>
                        <div className={blogStyle.comentario} dangerouslySetInnerHTML={{__html:blog.description}}></div>
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
                        <Link href={'/admin/blog/'+ blog._id}>
                            <img src={'/assets/icons/edit.svg'} alt={'icono de editar'}/>
                        </Link>
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

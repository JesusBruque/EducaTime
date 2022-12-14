import blogStyle from '../../styles/Blog.module.css'
import moment from "moment";
import React, {Dispatch, FunctionComponent, useState} from 'react';
import Link from 'next/link';
import Blog,{deleteBlog} from '../../utils/Blog';
import WebUtils from "../../webUtils/WebUtils";
import {Router} from "next/router";
import Modal from "../Modal";
import ModalDelete from "../ModalDelete";

type Props = {
    blog:Blog,
    admin:boolean,
    utils?:WebUtils,
    router:Router,
    setVideoPlaying:Dispatch<any>
}
const BlogItem : FunctionComponent<Props> = (props) =>{
    const {blog,admin,utils} = props;
    const [deleting,setDeleting] = useState(false);
    const handleDelete = () => {
        setDeleting(true);
    };
    const goToDetail = () => {
        if(!admin){
            let url = blog.title.normalize("NFD").replace(/[\u0300-\u036f]/g, "").split(' ').join('-');
            props.router.push({pathname:'/blog/'+url, query:{id:blog._id}});
        }
    };
    const confirmDelete = () => {
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
    }
    return (
            <div className={`${blogStyle.caja} blog-item ${admin ? blogStyle.adminItem : ''}`} onClick={goToDetail}>
                <div className={blogStyle.foto}>
                    <img src={blog.thumbnail} alt={'imagen del blog'}/>
                    {blog.video && <img src={'/assets/icons/play-button.svg'} alt={'icono de play'} style={{opacity:'.9',width:'30px',height:'30px',backgroundColor:'white',cursor:'pointer'}} onClick={(e) =>{e.stopPropagation();props.setVideoPlaying(blog);}}/>}
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
                {deleting && <ModalDelete open={deleting} onDelete={confirmDelete} text={`??Est?? seguro de eliminar '${blog.title}'?`} setOpen={setDeleting}/>}
            </div>
        )
};

export default BlogItem;

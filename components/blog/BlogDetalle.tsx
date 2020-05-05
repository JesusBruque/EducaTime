import blogVista from '../../styles/BlogVista.module.css'
import GridItem from '../GridItem';
import Cuerpo from '../Cuerpo';
import TituloEspecialBlog from '../TituloEspecialBlog'
import Blog from "../../utils/Blog";
import blogStyles from "../../styles/blogs/BlogDetail.module.css";
import MyDropzone from "../MyDropzone";
import styles from "../../styles/blogs/AddBlog.module.css";
import utilStyles from "../../styles/Utils.module.css";
import moment from "moment";
import TextEditor from "../TextEditor";
import React, {FunctionComponent} from "react";
import WebUtils from "../../webUtils/WebUtils";

type Props = {
    blog:Blog,
    admin:boolean,
    handleFilesCurso?:(files) => void,
    handleChangeContent?:(content) => void,
    handleLoadFile?:(file) => Promise<any>,
    handleChangeInfoBlog?:(property,value)=>void,
    utils?:WebUtils,
    blogFile?:File
}

const BlogDetalle : FunctionComponent<Props> = (props) =>{
    const {blog, admin} = props;

    return (
        <div className={blogStyles.blogDetailContainer}>
            {
                admin ? <MyDropzone  text={'Arrastra o pincha para añadir una imagen de portada de blog'}
                                     image={'/assets/icons/picture.svg'}
                                     maxFiles={1}
                                     filesAccepted={['image/*']}
                                     onAcceptFile={(files) => props.handleFilesCurso(files[0])}
                >
                    {props.blogFile && <img src={URL.createObjectURL(props.blogFile)} alt={'imagen de portada del blog'}/>}
                </MyDropzone>
                    :
                    <img className={blogStyles.imagenPortada} src={blog.thumbnail} alt={'portada del blog'}/>
            }


            <div>
                <div className={blogStyles.titleHeader}>
                    <div>
                        {
                            admin ?
                                <React.Fragment>
                                    <input style={{width:'250px'}} type={'text'} value={props.blog.title} className={`${utilStyles.inputEditing} ${blogStyles.blogTitle}`} onChange={(e) => props.handleChangeInfoBlog('title',e.target.value)} placeholder={'Título de la entrada'}/>
                                    <input style={{width:'200px'}} type={'text'} value={props.blog.subtitle} className={`${utilStyles.inputEditing} ${blogStyles.blogSubtitle}`} onChange={(e) => props.handleChangeInfoBlog('subtitle',e.target.value)} placeholder={'Subtítulo de la entrada'}/>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <span className={blogStyles.blogTitle}>{blog.title}</span>
                                    <span className={blogStyles.blogSubtitle}>{blog.subtitle}</span>
                                </React.Fragment>
                        }
                    </div>
                    <div>
                        {
                            admin ?
                                <input style={{width:'200px'}} type={'text'} value={props.blog.author} className={`${utilStyles.inputEditing} ${blogStyles.blogAutor}`} onChange={(e) => props.handleChangeInfoBlog('author',e.target.value)} placeholder={'Autor de la entrada'}/>
                                :
                                <span className={blogStyles.blogAutor}>{props.blog.author}</span>
                        }
                        <span className={blogStyles.blogDate}>{moment(props.blog.creation_date).format('DD/MM/YYYY')}</span>
                    </div>
                </div>
                {
                    admin ?
                        <TextEditor utils={props.utils} onChange={(content) => props.handleChangeContent(content)} files={true} height={700} initialValue={''} basic={false} onLoadImage={props.handleLoadFile}/>
                        :
                        <div dangerouslySetInnerHTML={{__html:blog.description}} style={{fontSize:'1.3em'}}></div>
                }
            </div>
            {props.children}
        </div>
    )
};
export default BlogDetalle;

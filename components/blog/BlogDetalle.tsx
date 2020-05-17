import Blog from "../../utils/Blog";
import blogStyles from "../../styles/blogs/BlogDetail.module.css";
import MyDropzone from "../MyDropzone";
import utilStyles from "../../styles/Utils.module.css";
import moment from "moment";
import TextEditor from "../TextEditor";
import React, {FunctionComponent, useState} from "react";
import WebUtils from "../../webUtils/WebUtils";
import VideoComponent from "../VideoComponent";
import utilsStyles from "../../styles/Utils.module.css";

type Props = {
    blog:Blog,
    admin:boolean,
    handleFilesCurso?:(files) => void,
    handleChangeContent?:(content) => void,
    handleLoadFile?:(file) => Promise<any>,
    handleChangeInfoBlog?:(property,value)=>void,
    utils?:WebUtils,
    blogFile?:File,
    blogVideo:File
}

const BlogDetalle : FunctionComponent<Props> = (props) =>{

    const [videoPlaying,setVideoPlaying] = useState(null);

    const showVideo = (file,e) => {
        e.stopPropagation();
        setVideoPlaying(file);
    };
    return (
        <div className={blogStyles.blogDetailContainer}>
            {
                props.admin ? <MyDropzone  text={'Arrastra o pincha para añadir una imagen de portada de blog'}
                                     image={'/assets/icons/picture.svg'}
                                     maxFiles={2}
                                     filesAccepted={['image/*','video/*']}
                                     onAcceptFile={(files) => props.handleFilesCurso(files)}
                >
                    {props.blogFile ? <img src={URL.createObjectURL(props.blogFile)} alt={'imagen de portada del blog'}/> : (props.blog.thumbnail && <img src={props.blog.thumbnail} alt={'imagen de portada del blog'}/> )}
                        {(props.blogVideo || props.blog.video) && <img src={'/assets/icons/play-button.svg'} alt={'icono de play'} style={{opacity:'.9',width:'30px',height:'30px',backgroundColor:'white'}} onClick={(e) => props.blogVideo ? showVideo(props.blogVideo,e) : showVideo(props.blog.video,e)} className={utilsStyles.icon}/>}
                </MyDropzone>
                    :
                    <img className={blogStyles.imagenPortada} src={props.blog.thumbnail} alt={'portada del blog'}/>
            }


            <div>
                <div className={blogStyles.titleHeader}>
                    <div>
                        {
                            props.admin ?
                                <React.Fragment>
                                    <input style={{width:'250px'}} type={'text'} value={props.blog.title} className={`${utilStyles.inputEditing} ${blogStyles.blogTitle}`} onChange={(e) => props.handleChangeInfoBlog('title',e.target.value)} placeholder={'Título de la entrada'}/>
                                    <input style={{width:'200px'}} type={'text'} value={props.blog.subtitle} className={`${utilStyles.inputEditing} ${blogStyles.blogSubtitle}`} onChange={(e) => props.handleChangeInfoBlog('subtitle',e.target.value)} placeholder={'Subtítulo de la entrada'}/>
                                </React.Fragment>
                                :
                                <React.Fragment>
                                    <span className={blogStyles.blogTitle}>{props.blog.title}</span>
                                    <span className={blogStyles.blogSubtitle}>{props.blog.subtitle}</span>
                                </React.Fragment>
                        }
                    </div>
                    <div>
                        {
                            props.admin ?
                                <input style={{width:'200px'}} type={'text'} value={props.blog.author} className={`${utilStyles.inputEditing} ${blogStyles.blogAutor}`} onChange={(e) => props.handleChangeInfoBlog('author',e.target.value)} placeholder={'Autor de la entrada'}/>
                                :
                                <span className={blogStyles.blogAutor}>{props.blog.author}</span>
                        }
                        <span className={blogStyles.blogDate}>{moment(props.blog.creation_date).format('DD/MM/YYYY')}</span>
                    </div>
                </div>
                {
                    props.admin ?
                        <TextEditor utils={props.utils} onChange={(content) => props.handleChangeContent(content)} files={true} height={700} initialValue={props.blog.description} basic={false} onLoadImage={props.handleLoadFile}/>
                        :
                        <div dangerouslySetInnerHTML={{__html:props.blog.description}} style={{fontSize:'1.3em'}}></div>
                }
            </div>
            {props.children}
            {videoPlaying && <VideoComponent src={typeof videoPlaying === 'string' ? videoPlaying : URL.createObjectURL(videoPlaying)} title={videoPlaying.name || 'Preview del blog'} autoPlay={true} onClose={() => {setVideoPlaying(null);typeof videoPlaying !== 'string' && URL.revokeObjectURL(videoPlaying)}} />}
        </div>
    )
};
export default BlogDetalle;

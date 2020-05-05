import React, {Dispatch, FunctionComponent} from 'react';
import MyDropzone from "../MyDropzone";
import WebUtils from "../../webUtils/WebUtils";
import Blog from "../../utils/Blog";
import styles from '../../styles/blogs/AddBlog.module.css';
import utilStyles from '../../styles/Utils.module.css';
import TextEditor from "../TextEditor";
import moment from "moment";
import {uploadBlogFile} from "../../utils/Blog";

type Props = {
    utils:WebUtils,
    files:File[],
    setFiles:Dispatch<any>,
    blogFile:File,
    setBlogFile:Dispatch<any>
    blog:Blog,
    setBlog:Dispatch<Blog>
}
const AddBlogForm : FunctionComponent<Props> = (props) => {

    const handlChangeContent = (content) => {
        props.setBlog({...props.blog,description:content});
    };

    const handleFilesCurso = (file) => {
        props.setBlog({...props.blog,thumbnail:file.name});
        props.setBlogFile(file);
    };
    const handleChangeInfoBlog = (property,value) => {
        props.setBlog({...props.blog,[property]:value});
    };

    const handleLoadFile = (file:File) => {
        return uploadBlogFile(file);
    };



    return (
        <div className={styles.formContainer}>
            <MyDropzone  text={'Arrastra o pincha para añadir una imagen de portada de blog'}
                         image={'/assets/icons/picture.svg'}
                         maxFiles={1}
                         filesAccepted={['image/*']}
                         onAcceptFile={(files) => handleFilesCurso(files[0])}
            >
                {props.blogFile && <img src={URL.createObjectURL(props.blogFile)} alt={'imagen de portada del blog'}/>}
            </MyDropzone>
            <div>
                <div className={styles.titleHeader}>
                    <div>
                        <input style={{fontSize:'1.1em',fontWeight:'bold',width:'250px',textTransform:'uppercase'}} type={'text'} value={props.blog.title} className={utilStyles.inputEditing} onChange={(e) => handleChangeInfoBlog('title',e.target.value)} placeholder={'Título de la entrada'}/>
                        <input style={{fontSize:'.9em',fontWeight:'bold',width:'200px',textTransform:'uppercase', color:'grey'}} type={'text'} value={props.blog.subtitle} className={utilStyles.inputEditing} onChange={(e) => handleChangeInfoBlog('subtitle',e.target.value)} placeholder={'Subtítulo de la entrada'}/>
                    </div>
                    <div>
                        <input style={{fontSize:'.9em',fontWeight:'bold',width:'200px',textTransform:'uppercase'}} type={'text'} value={props.blog.author} className={utilStyles.inputEditing} onChange={(e) => handleChangeInfoBlog('author',e.target.value)} placeholder={'Autor de la entrada'}/>
                        <span style={{fontSize:'1em',fontWeight:'bold',textTransform:'uppercase', color:'var(--main-color)'}}>{moment(props.blog.creation_date).format('DD/MM/YYYY')}</span>
                    </div>
                </div>
                <TextEditor utils={props.utils} onChange={(content) => handlChangeContent(content)} files={true} height={700} initialValue={''} basic={false} onLoadImage={handleLoadFile}/>
            </div>
        </div>
    )
};

export default AddBlogForm;

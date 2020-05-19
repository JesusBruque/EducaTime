import React, {Dispatch, FunctionComponent, useEffect} from 'react';
import WebUtils from "../../webUtils/WebUtils";
import Blog from "../../utils/Blog";
import {uploadBlogFile} from "../../utils/Blog";
import BlogDetalle from "./BlogDetalle";

type Props = {
    utils:WebUtils,
    files:File[],
    setFiles:Dispatch<any>,
    blogFile:File,
    setBlogFile:Dispatch<any>
    blog:Blog,
    setBlog:Dispatch<Blog>,
    blogVideo:File,
    setBlogVideo:Dispatch<any>
}
const AddBlogForm : FunctionComponent<Props> = (props) => {

    const handleChangeContent = (content) => {
        props.setBlog({...props.blog,description:content});
    };

    const handleFilesCurso = (files) => {
        let video, thumbnail;
        files.forEach(file => {
            if(file.type.includes('video')){
                props.setBlogVideo(file);
                video = file.name;
            }
            if(file.type.includes('image')){
                props.setBlogFile(file);
                thumbnail = file.name;
            }
            console.log(video);
            props.setBlog({...props.blog,thumbnail:thumbnail ? thumbnail: props.blog.thumbnail,video:video ? video : props.blog.video});
        })
    };
    const handleChangeInfoBlog = (property,value) => {
        props.setBlog({...props.blog,[property]:value});
    };

    const handleLoadFile = (file:File) => {
        if(file.type.includes('image')){
            return uploadBlogFile(file,false,'blogImages');
        }
    };

    useEffect(() => {
        console.log(props.blog);
    },[props.blog]);
    return (
        <BlogDetalle blog={props.blog} utils={props.utils} admin={true} blogFile={props.blogFile} blogVideo={props.blogVideo} handleChangeContent={handleChangeContent} handleFilesCurso={handleFilesCurso} handleChangeInfoBlog={handleChangeInfoBlog} handleLoadFile={handleLoadFile}/>
    )
};

export default AddBlogForm;

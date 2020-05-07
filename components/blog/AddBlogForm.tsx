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
    setBlog:Dispatch<Blog>
}
const AddBlogForm : FunctionComponent<Props> = (props) => {

    const handleChangeContent = (content) => {
        props.setBlog({...props.blog,description:content});
    };

    const handleFilesCurso = (file) => {
        props.setBlogFile(file);
        props.setBlog({...props.blog,thumbnail:file.name});
    };
    const handleChangeInfoBlog = (property,value) => {
        props.setBlog({...props.blog,[property]:value});
    };

    const handleLoadFile = (file:File) => {
        return uploadBlogFile(file);
    };

    return (
        <BlogDetalle blog={props.blog} utils={props.utils} admin={true} blogFile={props.blogFile} handleChangeContent={handleChangeContent} handleFilesCurso={handleFilesCurso} handleChangeInfoBlog={handleChangeInfoBlog} handleLoadFile={handleLoadFile}/>
    )
};

export default AddBlogForm;
